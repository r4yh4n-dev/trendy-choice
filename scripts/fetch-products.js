// Fetches products from Business Koro and writes a SAFE products.json
// (no cost price, no packaging cost, no minimum price). Runs on GitHub Actions.
// Needs Node 18+ (built-in fetch). No npm packages.

const fs = require("fs");

const BASE = "https://api.businesskoro.com/api/v1/storefront";
const KEY = process.env.BK_API_KEY;
const DOMAIN = process.env.BK_DOMAIN; // optional, only if you set a domain for the key

// ---- Edit these ----
// Product ids that must never appear on your website
const HIDDEN = [
  "16a99192-e130-492b-afb3-3b68efb16a81", // Stun gun
];
// Your own price per product id. Keep EMPTY unless the same prices are also set
// in your Cloudflare Worker, because orders use the Worker's price.
const PRICE_OVERRIDE = {
  // "product-id": 599,
};
// Must match your Worker setting (CUSTOMER_PAYS_DELIVERY). true = customer pays delivery.
const CUSTOMER_PAYS_DELIVERY = true;
// --------------------

async function main() {
  if (!KEY) throw new Error("BK_API_KEY secret is missing");

  const headers = { "x-api-key": KEY, "Content-Type": "application/json" };
  if (DOMAIN) headers["x-domain"] = DOMAIN;

  const res = await fetch(`${BASE}/products`, { headers });
  if (!res.ok) throw new Error("Business Koro answered HTTP " + res.status);
  const data = await res.json();

  const products = (data.data || [])
    .filter((p) => p && p.id)
    .filter((p) => !HIDDEN.includes(p.id))
    .filter((p) => !/\bstun\b/i.test(p.name || "")) // extra safety net
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      images: p.images || [],
      price: PRICE_OVERRIDE[p.id] ?? p.suggestedPrice,
      inStock: p.inStock,
      variants: (p.variants || []).map((v) => ({
        id: v.id,
        color: v.color,
        size: v.size,
        stockQuantity: v.stockQuantity,
        inStock: v.inStock,
      })),
    }));

  // Never replace a good file with an empty one
  if (products.length === 0) throw new Error("No products returned, keeping the old products.json");

  const out = {
    products,
    deliveryCharges: data.deliveryCharges || { insideDhaka: 0, outsideDhaka: 0 },
    customerPaysDelivery: CUSTOMER_PAYS_DELIVERY,
  };

  fs.writeFileSync("products.json", JSON.stringify(out, null, 2) + "\n");
  console.log("Saved " + products.length + " products");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
