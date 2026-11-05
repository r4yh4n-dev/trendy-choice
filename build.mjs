#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════════════
   Trendy Choice — static build script
   ───────────────────────────────────────────────────────────────────────────
   Reads  products.json  and generates, next to index.html:

     p/<slug>/index.html   one SEO page per product (unique title, description,
                           canonical, og:*, twitter:card, Product JSON-LD)
     404.html              friendly not-found page that returns to the shop
     sitemap.xml           home + every product page
     robots.txt            crawl rules + sitemap pointer
     slugs.json            slug → productId map (debug / cross-check)

   Usage:   node build.mjs
   ═══════════════════════════════════════════════════════════════════════════ */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));

/* ── site config (keep in sync with CONFIG.SITE_URL in index.html) ─────── */
const SITE_URL   = 'https://r4yh4n-dev.github.io/trendy-choice/';
const SITE_NAME  = 'Trendy Choice';
const OG_FALLBACK = SITE_URL + 'og-image.png';
const LOCALE     = 'bn_BD';
const CURRENCY   = 'BDT';

/* ── helpers ───────────────────────────────────────────────────────────── */
const esc = s => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const escAttr = esc;

/* JSON-LD must not be able to close its own <script> tag */
const jsonLd = obj => JSON.stringify(obj, null, 2)
  .replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

/* MUST stay byte-identical to slugify() in index.html */
function slugify(str) {
  return String(str || '')
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '') || 'product';
}

const clamp = (s, n) => {
  const t = String(s || '').replace(/\s+/g, ' ').trim();
  return t.length <= n ? t : t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…';
};

const money = n => '৳' + Number(n || 0).toLocaleString('en-US');

/* ── read source ───────────────────────────────────────────────────────── */
const indexPath = join(ROOT, 'index.html');
if (!existsSync(indexPath)) {
  console.error('✖ index.html not found next to build.mjs');
  process.exit(1);
}
const indexHtml = readFileSync(indexPath, 'utf8');

const productsPath = join(ROOT, 'products.json');
if (!existsSync(productsPath)) {
  console.error('✖ products.json not found next to build.mjs');
  process.exit(1);
}
const data = JSON.parse(readFileSync(productsPath, 'utf8'));
const products = (Array.isArray(data.products) ? data.products : []).filter(p => p && p.id);

console.log(`→ ${products.length} products read from products.json`);

/* ── slug map with duplicate handling ──────────────────────────────────── */
const used = new Map();
const slugMap = {};          // slug → productId
const idToSlug = {};         // productId → slug

for (const p of products) {
  const base = slugify(p.name);
  let slug = base;
  if (used.has(slug)) {
    /* duplicate → append a short, stable slice of the id */
    slug = `${base}-${String(p.id).replace(/-/g, '').slice(0, 6)}`;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${String(p.id).replace(/-/g, '').slice(0, 6)}-${n++}`;
  }
  used.set(slug, p.id);
  slugMap[slug] = p.id;
  idToSlug[p.id] = slug;
}

/* ── asset path rewriting for pages one level deeper (p/<slug>/) ───────── */
const DEEP_ASSETS = [
  'manifest.webmanifest',
  'favicon-48.png',
  'favicon-32.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'og-image.png'
];

function toDeep(html) {
  let out = html;
  for (const f of DEEP_ASSETS) {
    out = out.split(`"${f}"`).join(`"../../${f}"`);
  }
  return out;
}

/* ── SEO head block ────────────────────────────────────────────────────── */
function seoBlock({ title, description, canonical, image, type, product }) {
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${escAttr(description)}">`,
    `<link rel="canonical" href="${escAttr(canonical)}">`,
    `<meta property="og:locale" content="${LOCALE}">`,
    `<meta property="og:type" content="${type}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${escAttr(title)}">`,
    `<meta property="og:description" content="${escAttr(description)}">`,
    `<meta property="og:url" content="${escAttr(canonical)}">`,
    `<meta property="og:image" content="${escAttr(image)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escAttr(title)}">`,
    `<meta name="twitter:description" content="${escAttr(description)}">`,
    `<meta name="twitter:image" content="${escAttr(image)}">`
  ];

  if (product) {
    const price = Number(product.price) || 0;
    const inStock = product.inStock !== false;
    const imgs = (Array.isArray(product.images) ? product.images.filter(Boolean) : []);
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: clamp(product.description || product.name, 300),
      sku: String(product.id),
      image: imgs.length ? imgs : [OG_FALLBACK],
      brand: { '@type': 'Brand', name: SITE_NAME },
      offers: {
        '@type': 'Offer',
        url: canonical,
        priceCurrency: CURRENCY,
        price: String(price),
        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
        seller: { '@type': 'Organization', name: SITE_NAME }
      }
    };
    lines.push(`<script type="application/ld+json">${jsonLd(ld)}</script>`);
  } else {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'bn-BD',
      potentialAction: {
        '@type': 'SearchAction',
        target: SITE_URL + '?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
    lines.push(`<script type="application/ld+json">${jsonLd(ld)}</script>`);
  }

  return lines.join('\n');
}

/* ── build one product page ────────────────────────────────────────────── */
function buildProductPage(p, slug) {
  const url = SITE_URL + 'p/' + slug + '/';
  const imgs = (Array.isArray(p.images) ? p.images.filter(Boolean) : []);
  const image = imgs[0] || OG_FALLBACK;
  const price = Number(p.price) || 0;
  const old = Number(p.oldPrice) || 0;
  const off = old > price && price > 0 ? Math.round((1 - price / old) * 100) : 0;

  const title = `${p.name} — ${money(price)} | ${SITE_NAME}`;
  const description = clamp(
    (p.description ? p.description + ' ' : '') +
    `${p.name} — ${money(price)}${off > 0 ? ` (${off}% ছাড়)` : ''}। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি।`,
    158
  );

  let html = toDeep(indexHtml);

  /* swap the SEO block */
  const start = html.indexOf('<!--TC:SEO-->');
  const end = html.indexOf('<!--TC:/SEO-->');
  if (start === -1 || end === -1) {
    throw new Error('index.html is missing the <!--TC:SEO--> … <!--TC:/SEO--> markers');
  }
  const block = seoBlock({ title, description, canonical: url, image, type: 'product', product: p });
  html = html.slice(0, start + '<!--TC:SEO-->'.length) + '\n' + block + '\n' + html.slice(end);

  /* deep-link marker: the app reads this first and opens the product */
  html = html.replace(
    '<meta name="robots"',
    `<meta name="tc-product" content="${escAttr(slug)}">\n<meta name="robots"`
  );

  /* language + title attributes */
  html = html.replace('<html lang="bn" data-theme="light">', '<html lang="bn" data-theme="light" data-page="product">');

  return html;
}

/* ── clean previous output ─────────────────────────────────────────────── */
const pDir = join(ROOT, 'p');
if (existsSync(pDir)) rmSync(pDir, { recursive: true, force: true });
mkdirSync(pDir, { recursive: true });

/* ── write product pages ───────────────────────────────────────────────── */
let written = 0;
for (const p of products) {
  const slug = idToSlug[p.id];
  const dir = join(pDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), buildProductPage(p, slug), 'utf8');
  written++;
}
console.log(`✓ ${written} product pages written to p/<slug>/index.html`);

/* ── 404.html ──────────────────────────────────────────────────────────── */
const notFound = `<!DOCTYPE html>
<html lang="bn" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>পেজটি পাওয়া যায়নি — ${SITE_NAME}</title>
<meta name="description" content="এই পেজটি খুঁজে পাওয়া যায়নি। Trendy Choice-এর হোম পেজে ফিরে যান।">
<link rel="icon" type="image/png" sizes="48x48" href="favicon-48.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&family=Inter:wght@600;800&display=swap" rel="stylesheet">
<style>
  :root{
    --primary:#0F7B4F; --primary-soft:#E7F4EC; --accent:#E09B2D;
    --bg:#FBFAF7; --surface:#fff; --border:#E5E1D7; --text:#131A16; --muted:#5F6B64;
    --font:'Hind Siliguri','Noto Sans Bengali',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  }
  @media (prefers-color-scheme:dark){
    :root{--primary:#3FCB8E;--primary-soft:#12291F;--bg:#0B100E;--surface:#131A17;--border:#26312B;--text:#EDF2EF;--muted:#9AA8A1}
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    font-family:var(--font);background:var(--bg);color:var(--text);
    min-height:100dvh;display:grid;place-items:center;padding:24px;line-height:1.65;
    -webkit-font-smoothing:antialiased;
  }
  .card{
    width:100%;max-width:520px;text-align:center;
    background:var(--surface);border:1px solid var(--border);border-radius:28px;
    padding:48px 28px;box-shadow:0 24px 60px -30px rgba(19,26,22,.3);
  }
  .mark{
    width:64px;height:64px;margin:0 auto 20px;border-radius:20px;
    background:var(--primary-soft);display:grid;place-items:center;
  }
  .mark svg{width:32px;height:32px;stroke:var(--primary);fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
  .code{font-family:'Inter',sans-serif;font-size:56px;font-weight:800;letter-spacing:-2px;color:var(--primary);line-height:1}
  h1{font-size:21px;font-weight:700;margin:14px 0 8px}
  p{font-size:14px;color:var(--muted);max-width:38ch;margin:0 auto 26px}
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:14px 26px;border-radius:999px;background:var(--primary);color:#fff;
    font-size:14.5px;font-weight:600;text-decoration:none;min-height:48px;
    transition:transform .16s ease,filter .18s;
  }
  .btn:hover{filter:brightness(1.06)}
  .btn:active{transform:scale(.97)}
  .btn svg{width:17px;height:17px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
  .links{margin-top:22px;display:flex;gap:18px;justify-content:center;flex-wrap:wrap;font-size:13px}
  .links a{color:var(--muted);text-decoration:none;border-bottom:1px solid transparent;transition:color .18s,border-color .18s}
  .links a:hover{color:var(--primary);border-bottom-color:var(--primary)}
</style>
</head>
<body>
  <main class="card">
    <div class="mark" aria-hidden="true">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>
    </div>
    <div class="code">404</div>
    <h1>পেজটি খুঁজে পাওয়া যায়নি</h1>
    <p>আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে। নিচের বাটনে চাপ দিয়ে দোকানে ফিরে যান।</p>
    <a class="btn" href="${SITE_URL}">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      Trendy Choice-এ ফিরে যান
    </a>
    <div class="links">
      <a href="${SITE_URL}#products">সব পণ্য</a>
      <a href="${SITE_URL}#contact">যোগাযোগ</a>
    </div>
  </main>
  <script>
    /* if the visitor landed on a stale product URL, try to recover it */
    (function () {
      try {
        var m = location.pathname.match(/\\/p\\/([^/]+)\\/?$/);
        if (m) sessionStorage.setItem('tc_missing_slug', decodeURIComponent(m[1]));
      } catch (e) {}
    })();
  </script>
</body>
</html>
`;
writeFileSync(join(ROOT, '404.html'), notFound, 'utf8');
console.log('✓ 404.html written');

/* ── sitemap.xml ───────────────────────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: SITE_URL, pri: '1.0', freq: 'daily' },
  ...products.map(p => ({
    loc: SITE_URL + 'p/' + idToSlug[p.id] + '/',
    pri: '0.8',
    freq: 'weekly'
  }))
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${esc(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.pri}</priority>
  </url>`).join('\n')}
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log(`✓ sitemap.xml written (${urls.length} URLs)`);

/* ── robots.txt ────────────────────────────────────────────────────────── */
const robots = `# Trendy Choice — robots.txt
User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;
writeFileSync(join(ROOT, 'robots.txt'), robots, 'utf8');
console.log('✓ robots.txt written');

/* ── slugs.json (debug / cross-check) ──────────────────────────────────── */
writeFileSync(
  join(ROOT, 'slugs.json'),
  JSON.stringify({ generated: new Date().toISOString(), site: SITE_URL, count: products.length, slugs: slugMap }, null, 2),
  'utf8'
);
console.log('✓ slugs.json written');

console.log('\n✅ Build complete.');
console.log(`   ${written} product pages · sitemap ${urls.length} URLs · 404 · robots · slugs`);
