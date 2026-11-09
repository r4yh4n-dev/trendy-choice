/* ============================================================
   TRENDY CHOICE — Shared storefront engine
   i18n (BN/EN) · cart · wishlist · header/footer · toasts
   NOTE: cart/wishlist in localStorage are a convenience cache only.
   In production all prices, stock and totals are re-validated
   server-side (Cloudflare Worker) before an order is created.
   ============================================================ */
(function () {
  'use strict';

  var TC = window.TC = window.TC || {};

  /* ---------------- i18n ---------------- */
  var I18N = {
    bn: {
      'nav.home': 'হোম', 'nav.shop': 'শপ', 'nav.categories': 'ক্যাটাগরি',
      'nav.new': 'নতুন এসেছে', 'nav.offers': 'অফার', 'nav.about': 'আমাদের সম্পর্কে',
      'nav.contact': 'যোগাযোগ', 'nav.account': 'অ্যাকাউন্ট', 'nav.wishlist': 'উইশলিস্ট',
      'nav.cart': 'কার্ট', 'nav.search': 'প্রোডাক্ট খুঁজুন...', 'nav.menu': 'মেনু',
      'hero.tag': 'নতুন কলেকশন ২০২৬', 'hero.title': 'আপনার স্টাইল, <em>আমাদের অগ্রাধিকার</em>',
      'hero.sub': 'বাংলাদেশের সেরা অনলাইন শপিং প্ল্যাটফর্ম। ফ্যাশন, গ্যাজেট, লাইফস্টাইল ও হোম এসেনশিয়ালস — এক জায়গায়।',
      'hero.cta1': 'এখনই কিনুন', 'hero.cta2': 'সব প্রোডাক্ট দেখুন',
      'trust.1': 'দ্রুত ডেলিভারি', 'trust.1s': '২-৪ দিনে সারা দেশে',
      'trust.2': 'ক্যাশ অন ডেলিভারি', 'trust.2s': 'পণ্য হাতে পেয়ে পেমেন্ট',
      'trust.3': 'সহজ রিটার্ন', 'trust.3s': '৭ দিনের রিটার্ন পলিসি',
      'trust.4': 'নিরাপদ পেমেন্ট', 'trust.4s': 'bKash · Nagad · Rocket',
      'sec.cats': 'ক্যাটাগরি অনুযায়ী কিনুন', 'sec.cats.sub': 'আপনার পছন্দের ক্যাটাগরি বেছে নিন',
      'sec.new': 'নতুন এসেছে', 'sec.new.sub': 'সদ্য যোগ হওয়া প্রোডাক্ট',
      'sec.trending': 'ট্রেন্ডিং প্রোডাক্ট', 'sec.trending.sub': 'এখন সবচেয়ে জনপ্রিয়',
      'sec.best': 'বেস্ট সেলার', 'sec.best.sub': 'সবচেয়ে বেশি বিক্রি হওয়া',
      'sec.flash': 'ফ্ল্যাশ সেল', 'sec.flash.sub': 'সীমিত সময়ের জন্য বিশেষ ছাড়',
      'sec.reviews': 'কাস্টমার রিভিউ', 'sec.reviews.sub': 'আমাদের ক্রেতারা যা বলছেন',
      'sec.social': 'আমাদের সাথে যুক্ত থাকুন', 'sec.social.sub': 'সোশ্যাল মিডিয়ায় নতুন অফার ও আপডেট পেতে ফলো করুন',
      'sec.news': 'নিউজলেটার সাবস্ক্রাইব করুন', 'sec.news.sub': 'নতুন প্রোডাক্ট ও এক্সক্লুসিভ অফারের খবর সবার আগে পান',
      'btn.viewAll': 'সব দেখুন', 'btn.addCart': 'কার্টে যোগ করুন', 'btn.buyNow': 'এখনই কিনুন',
      'btn.subscribe': 'সাবস্ক্রাইব', 'btn.checkout': 'চেকআউট করুন', 'btn.continue': 'শপিং চালিয়ে যান',
      'btn.apply': 'প্রয়োগ করুন', 'btn.remove': 'মুছুন', 'btn.update': 'আপডেট',
      'shop.title': 'সব প্রোডাক্ট', 'shop.filters': 'ফিল্টার', 'shop.category': 'ক্যাটাগরি',
      'shop.price': 'দামের সীমা', 'shop.availability': 'স্টক', 'shop.inStock': 'স্টকে আছে',
      'shop.outStock': 'স্টক নেই', 'shop.sort': 'সাজান', 'shop.sortNew': 'নতুন আগে',
      'shop.sortLow': 'দাম: কম থেকে বেশি', 'shop.sortHigh': 'দাম: বেশি থেকে কম',
      'shop.sortPop': 'জনপ্রিয়তা', 'shop.results': 'প্রোডাক্ট পাওয়া গেছে', 'shop.clear': 'ফিল্টার মুছুন',
      'shop.none': 'কোনো প্রোডাক্ট পাওয়া যায়নি',
      'pd.desc': 'বিবরণ', 'pd.specs': 'স্পেসিফিকেশন', 'pd.reviews': 'রিভিউ',
      'pd.delivery': 'ডেলিভারি ও রিটার্ন', 'pd.related': 'সম্পর্কিত প্রোডাক্ট',
      'pd.qty': 'পরিমাণ', 'pd.color': 'রঙ', 'pd.size': 'সাইজ', 'pd.switch': 'সুইচ', 'pd.shade': 'শেড',
      'pd.inStock': 'স্টকে আছে', 'pd.lowStock': 'সীমিত স্টক', 'pd.outStock': 'স্টক নেই',
      'pd.delivIn': 'ঢাকার ভিতরে ডেলিভারি', 'pd.delivOut': 'ঢাকার বাইরে ডেলিভারি',
      'pd.delivTime': 'ডেলিভারি সময়', 'pd.delivTimeV': '২-৪ কর্মদিবস',
      'pd.return': 'রিটার্ন পলিসি', 'pd.returnV': '৭ দিনের মধ্যে সহজ রিটার্ন',
      'pd.genuine': '১০০% অরিজিনাল প্রোডাক্ট', 'pd.genuineV': 'সরাসরি সাপ্লায়ার থেকে',
      'cart.title': 'শপিং কার্ট', 'cart.empty': 'আপনার কার্ট খালি', 'cart.emptySub': 'শপিং শুরু করতে প্রোডাক্ট ব্রাউজ করুন',
      'cart.summary': 'অর্ডার সামারি', 'cart.subtotal': 'সাবটোটাল', 'cart.discount': 'ছাড়',
      'cart.delivery': 'ডেলিভারি চার্জ', 'cart.total': 'সর্বমোট', 'cart.coupon': 'কুপন কোড',
      'cart.couponPh': 'কুপন কোড লিখুন', 'cart.free': 'ফ্রি',
      'co.title': 'চেকআউট', 'co.info': 'ডেলিভারি তথ্য', 'co.name': 'পূর্ণ নাম', 'co.phone': 'মোবাইল নম্বর',
      'co.email': 'ইমেইল (ঐচ্ছিক)', 'co.division': 'বিভাগ', 'co.district': 'জেলা', 'co.upazila': 'উপজেলা / থানা',
      'co.address': 'সম্পূর্ণ ডেলিভারি ঠিকানা', 'co.notes': 'অর্ডার নোট (ঐচ্ছিক)',
      'co.payment': 'পেমেন্ট পদ্ধতি', 'co.place': 'অর্ডার নিশ্চিত করুন', 'co.select': 'নির্বাচন করুন',
      'co.cod': 'ক্যাশ অন ডেলিভারি', 'co.codSub': 'পণ্য হাতে পেয়ে পেমেন্ট করুন',
      'co.bkash': 'বিকাশ', 'co.bkashSub': 'বিকাশে পেমেন্ট করুন', 'co.nagad': 'নগদ', 'co.nagadSub': 'নগদে পেমেন্ট করুন',
      'co.rocket': 'রকেট', 'co.rocketSub': 'রকেটে পেমেন্ট করুন', 'co.online': 'অনলাইন পেমেন্ট',
      'co.onlineSub': 'কার্ড / নেট ব্যাংকিং (SSLCommerz)',
      'co.required': 'এই ঘরটি পূরণ করুন', 'co.phoneErr': 'সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)',
      'co.agree': 'আমি অর্ডার ও রিটার্ন পলিসিতে সম্মত',
      'ok.title': 'অর্ডার সফল হয়েছে!', 'ok.sub': 'আপনার অর্ডার আমরা পেয়েছি। শীঘ্রই আমরা যোগাযোগ করব।',
      'ok.id': 'অর্ডার আইডি', 'ok.track': 'অর্ডার ট্র্যাক করুন', 'ok.continue': 'আরও শপিং করুন',
      'acct.title': 'আমার অ্যাকাউন্ট', 'acct.login': 'লগইন', 'acct.register': 'রেজিস্টার',
      'acct.orders': 'আমার অর্ডার', 'acct.wishlist': 'উইশলিস্ট', 'acct.profile': 'প্রোফাইল',
      'acct.address': 'ঠিকানা বই', 'acct.logout': 'লগআউট', 'acct.password': 'পাসওয়ার্ড পরিবর্তন',
      'acct.noOrders': 'এখনো কোনো অর্ডার নেই', 'acct.noWish': 'উইশলিস্ট খালি',
      'foot.about': 'আমাদের সম্পর্কে', 'foot.help': 'সহায়তা', 'foot.policy': 'পলিসি',
      'foot.contact': 'যোগাযোগ', 'foot.rights': 'সর্বস্বত্ব সংরক্ষিত।',
      'foot.desc': 'বাংলাদেশের বিশ্বস্ত অনলাইন শপিং প্ল্যাটফর্ম। ফ্যাশন, গ্যাজেট, লাইফস্টাইল ও হোম এসেনশিয়ালস — সেরা দামে।',
      'toast.added': 'কার্টে যোগ করা হয়েছে', 'toast.wishAdd': 'উইশলিস্টে যোগ করা হয়েছে',
      'toast.wishRem': 'উইশলিস্ট থেকে সরানো হয়েছে', 'toast.removed': 'কার্ট থেকে সরানো হয়েছে',
      'toast.couponOk': 'কুপন সফলভাবে প্রয়োগ হয়েছে', 'toast.couponErr': 'কুপন কোডটি সঠিক নয়',
      'toast.subscribed': 'সাবস্ক্রাইব সফল হয়েছে!', 'toast.outStock': 'প্রোডাক্টটি স্টকে নেই',
      'toast.loginOk': 'সফলভাবে লগইন হয়েছে', 'toast.regOk': 'রেজিস্ট্রেশন সফল হয়েছে',
      'toast.orderOk': 'অর্ডার সফলভাবে তৈরি হয়েছে'
    },
    en: {
      'nav.home': 'Home', 'nav.shop': 'Shop', 'nav.categories': 'Categories',
      'nav.new': 'New Arrivals', 'nav.offers': 'Offers', 'nav.about': 'About',
      'nav.contact': 'Contact', 'nav.account': 'Account', 'nav.wishlist': 'Wishlist',
      'nav.cart': 'Cart', 'nav.search': 'Search products...', 'nav.menu': 'Menu',
      'hero.tag': 'New Collection 2026', 'hero.title': 'Your Style, <em>Our Priority</em>',
      'hero.sub': "Bangladesh's premium online shopping platform. Fashion, Gadgets, Lifestyle and Home Essentials — all in one place.",
      'hero.cta1': 'Shop Now', 'hero.cta2': 'Browse All Products',
      'trust.1': 'Fast Delivery', 'trust.1s': '2-4 days nationwide',
      'trust.2': 'Cash on Delivery', 'trust.2s': 'Pay when you receive',
      'trust.3': 'Easy Returns', 'trust.3s': '7-day return policy',
      'trust.4': 'Secure Payment', 'trust.4s': 'bKash · Nagad · Rocket',
      'sec.cats': 'Shop by Category', 'sec.cats.sub': 'Pick your favourite category',
      'sec.new': 'New Arrivals', 'sec.new.sub': 'Freshly added products',
      'sec.trending': 'Trending Products', 'sec.trending.sub': 'Most popular right now',
      'sec.best': 'Best Sellers', 'sec.best.sub': 'Our top selling products',
      'sec.flash': 'Flash Sale', 'sec.flash.sub': 'Special discounts for a limited time',
      'sec.reviews': 'Customer Reviews', 'sec.reviews.sub': 'What our buyers say',
      'sec.social': 'Stay Connected', 'sec.social.sub': 'Follow us on social media for new offers and updates',
      'sec.news': 'Subscribe to Newsletter', 'sec.news.sub': 'Be the first to know about new products and exclusive offers',
      'btn.viewAll': 'View All', 'btn.addCart': 'Add to Cart', 'btn.buyNow': 'Buy Now',
      'btn.subscribe': 'Subscribe', 'btn.checkout': 'Proceed to Checkout', 'btn.continue': 'Continue Shopping',
      'btn.apply': 'Apply', 'btn.remove': 'Remove', 'btn.update': 'Update',
      'shop.title': 'All Products', 'shop.filters': 'Filters', 'shop.category': 'Category',
      'shop.price': 'Price Range', 'shop.availability': 'Availability', 'shop.inStock': 'In Stock',
      'shop.outStock': 'Out of Stock', 'shop.sort': 'Sort by', 'shop.sortNew': 'Newest first',
      'shop.sortLow': 'Price: Low to High', 'shop.sortHigh': 'Price: High to Low',
      'shop.sortPop': 'Popularity', 'shop.results': 'products found', 'shop.clear': 'Clear filters',
      'shop.none': 'No products found',
      'pd.desc': 'Description', 'pd.specs': 'Specifications', 'pd.reviews': 'Reviews',
      'pd.delivery': 'Delivery & Returns', 'pd.related': 'Related Products',
      'pd.qty': 'Quantity', 'pd.color': 'Color', 'pd.size': 'Size', 'pd.switch': 'Switch', 'pd.shade': 'Shade',
      'pd.inStock': 'In Stock', 'pd.lowStock': 'Limited Stock', 'pd.outStock': 'Out of Stock',
      'pd.delivIn': 'Delivery inside Dhaka', 'pd.delivOut': 'Delivery outside Dhaka',
      'pd.delivTime': 'Delivery time', 'pd.delivTimeV': '2-4 working days',
      'pd.return': 'Return policy', 'pd.returnV': 'Easy return within 7 days',
      'pd.genuine': '100% Original Product', 'pd.genuineV': 'Sourced directly from suppliers',
      'cart.title': 'Shopping Cart', 'cart.empty': 'Your cart is empty', 'cart.emptySub': 'Browse products to start shopping',
      'cart.summary': 'Order Summary', 'cart.subtotal': 'Subtotal', 'cart.discount': 'Discount',
      'cart.delivery': 'Delivery Charge', 'cart.total': 'Total', 'cart.coupon': 'Coupon Code',
      'cart.couponPh': 'Enter coupon code', 'cart.free': 'Free',
      'co.title': 'Checkout', 'co.info': 'Delivery Information', 'co.name': 'Full Name', 'co.phone': 'Mobile Number',
      'co.email': 'Email (optional)', 'co.division': 'Division', 'co.district': 'District', 'co.upazila': 'Upazila / Thana',
      'co.address': 'Full Delivery Address', 'co.notes': 'Order Notes (optional)',
      'co.payment': 'Payment Method', 'co.place': 'Confirm Order', 'co.select': 'Select',
      'co.cod': 'Cash on Delivery', 'co.codSub': 'Pay when you receive the product',
      'co.bkash': 'bKash', 'co.bkashSub': 'Pay with bKash', 'co.nagad': 'Nagad', 'co.nagadSub': 'Pay with Nagad',
      'co.rocket': 'Rocket', 'co.rocketSub': 'Pay with Rocket', 'co.online': 'Online Payment',
      'co.onlineSub': 'Card / Net banking (SSLCommerz)',
      'co.required': 'This field is required', 'co.phoneErr': 'Enter a valid mobile number (11 digits)',
      'co.agree': 'I agree to the order and return policy',
      'ok.title': 'Order Placed Successfully!', 'ok.sub': 'We have received your order. We will contact you shortly.',
      'ok.id': 'Order ID', 'ok.track': 'Track Order', 'ok.continue': 'Continue Shopping',
      'acct.title': 'My Account', 'acct.login': 'Login', 'acct.register': 'Register',
      'acct.orders': 'My Orders', 'acct.wishlist': 'Wishlist', 'acct.profile': 'Profile',
      'acct.address': 'Address Book', 'acct.logout': 'Logout', 'acct.password': 'Change Password',
      'acct.noOrders': 'No orders yet', 'acct.noWish': 'Wishlist is empty',
      'foot.about': 'About Us', 'foot.help': 'Help', 'foot.policy': 'Policy',
      'foot.contact': 'Contact', 'foot.rights': 'All rights reserved.',
      'foot.desc': "Bangladesh's trusted online shopping platform. Fashion, Gadgets, Lifestyle and Home Essentials — at the best prices.",
      'toast.added': 'Added to cart', 'toast.wishAdd': 'Added to wishlist',
      'toast.wishRem': 'Removed from wishlist', 'toast.removed': 'Removed from cart',
      'toast.couponOk': 'Coupon applied successfully', 'toast.couponErr': 'Invalid coupon code',
      'toast.subscribed': 'Subscribed successfully!', 'toast.outStock': 'Product is out of stock',
      'toast.loginOk': 'Logged in successfully', 'toast.regOk': 'Registration successful',
      'toast.orderOk': 'Order created successfully'
    }
  };

  TC.lang = localStorage.getItem('tc-lang') || 'bn';
  TC.t = function (k) {
    var d = I18N[TC.lang] || I18N.bn;
    return d[k] != null ? d[k] : (I18N.en[k] != null ? I18N.en[k] : k);
  };
  TC.setLang = function (l) {
    TC.lang = l; localStorage.setItem('tc-lang', l);
    document.documentElement.lang = l;
    document.body.classList.toggle('lang-bn', l === 'bn');
    TC.applyI18n();
    document.dispatchEvent(new CustomEvent('tc:lang', { detail: l }));
  };
  TC.applyI18n = function () {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      var v = TC.t(k);
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = v; else el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.setAttribute('placeholder', TC.t(el.getAttribute('data-i18n-ph')));
    });
  };

  /* ---------------- helpers ---------------- */
  TC.money = function (n) {
    return '৳' + Number(n || 0).toLocaleString('en-BD', { maximumFractionDigits: 0 });
  };
  TC.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  TC.qs = function (k) { return new URLSearchParams(location.search).get(k); };
  TC.byId = function (id) { return document.getElementById(id); };
  TC.stars = function (r) {
    var full = Math.round(r), s = '';
    for (var i = 0; i < 5; i++) s += i < full ? '★' : '☆';
    return s;
  };
  TC.discount = function (p) {
    if (!p.oldPrice || p.oldPrice <= p.price) return 0;
    return Math.round((1 - p.price / p.oldPrice) * 100);
  };
  TC.product = function (id) {
    return (window.TC_DATA.products || []).filter(function (p) { return p.id === id; })[0];
  };
  TC.catName = function (id) {
    var c = (window.TC_DATA.categories || []).filter(function (x) { return x.id === id; })[0];
    return c ? c.name[TC.lang] : id;
  };
  TC.supplierName = function (id) {
    var s = (window.TC_DATA.suppliers || {})[id];
    return s ? s.name : id;
  };

  /* ---------------- toast ---------------- */
  TC.toast = function (msg, type) {
    var wrap = TC.byId('tc-toasts');
    if (!wrap) { wrap = document.createElement('div'); wrap.id = 'tc-toasts'; wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
    var el = document.createElement('div');
    el.className = 'toast ' + (type || 'ok');
    var icon = type === 'err'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16h.01"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg>';
    el.innerHTML = icon + '<span>' + TC.esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transform = 'translateY(10px)'; el.style.transition = 'all .3s'; }, 2200);
    setTimeout(function () { el.remove(); }, 2600);
  };

  /* ---------------- cart ---------------- */
  var CART_KEY = 'tc-cart';
  TC.cart = {
    get: function () { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } },
    save: function (c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); TC.cart.sync(); },
    add: function (id, qty, variant) {
      var p = TC.product(id); if (!p) return;
      if (p.stock <= 0) { TC.toast(TC.t('toast.outStock'), 'err'); return; }
      var c = TC.cart.get();
      var key = id + '|' + (variant || '');
      var found = c.filter(function (x) { return x.key === key; })[0];
      if (found) found.qty += (qty || 1);
      else c.push({ key: key, id: id, qty: qty || 1, variant: variant || '' });
      TC.cart.save(c);
      TC.toast(TC.t('toast.added'), 'ok');
    },
    remove: function (key) {
      TC.cart.save(TC.cart.get().filter(function (x) { return x.key !== key; }));
      TC.toast(TC.t('toast.removed'), 'ok');
    },
    setQty: function (key, q) {
      var c = TC.cart.get();
      c.forEach(function (x) { if (x.key === key) x.qty = Math.max(1, q); });
      TC.cart.save(c);
    },
    count: function () { return TC.cart.get().reduce(function (a, x) { return a + x.qty; }, 0); },
    subtotal: function () {
      return TC.cart.get().reduce(function (a, x) {
        var p = TC.product(x.id); return a + (p ? p.price * x.qty : 0);
      }, 0);
    },
    clear: function () { localStorage.removeItem(CART_KEY); TC.cart.sync(); },
    sync: function () {
      var n = TC.cart.count();
      document.querySelectorAll('[data-cart-count]').forEach(function (el) {
        el.textContent = n; el.classList.toggle('hide', n === 0);
      });
    }
  };

  /* ---------------- wishlist ---------------- */
  var WISH_KEY = 'tc-wish';
  TC.wish = {
    get: function () { try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; } catch (e) { return []; } },
    has: function (id) { return TC.wish.get().indexOf(id) > -1; },
    toggle: function (id) {
      var w = TC.wish.get(), i = w.indexOf(id);
      if (i > -1) { w.splice(i, 1); TC.toast(TC.t('toast.wishRem'), 'ok'); }
      else { w.push(id); TC.toast(TC.t('toast.wishAdd'), 'ok'); }
      localStorage.setItem(WISH_KEY, JSON.stringify(w));
      TC.wish.sync();
      return i === -1;
    },
    count: function () { return TC.wish.get().length; },
    sync: function () {
      var n = TC.wish.count();
      document.querySelectorAll('[data-wish-count]').forEach(function (el) {
        el.textContent = n; el.classList.toggle('hide', n === 0);
      });
      document.querySelectorAll('[data-wish-id]').forEach(function (el) {
        el.classList.toggle('on', TC.wish.has(el.getAttribute('data-wish-id')));
      });
    }
  };

  /* ---------------- coupon ---------------- */
  TC.coupon = {
    get: function () { try { return JSON.parse(localStorage.getItem('tc-coupon')); } catch (e) { return null; } },
    set: function (c) { localStorage.setItem('tc-coupon', JSON.stringify(c)); },
    clear: function () { localStorage.removeItem('tc-coupon'); },
    find: function (code) {
      code = (code || '').trim().toUpperCase();
      return (window.TC_DATA.coupons || []).filter(function (c) { return c.code === code; })[0];
    },
    discount: function (subtotal) {
      var c = TC.coupon.get(); if (!c) return 0;
      if (subtotal < (c.min || 0)) return 0;
      if (c.type === 'percent') return Math.round(subtotal * c.value / 100);
      if (c.type === 'fixed') return Math.min(c.value, subtotal);
      return 0;
    },
    isFreeShip: function (subtotal) {
      var c = TC.coupon.get();
      return !!(c && c.type === 'freeship' && subtotal >= (c.min || 0));
    }
  };

  /* ---------------- delivery ---------------- */
  TC.deliveryCharge = function (subtotal, division) {
    var d = window.TC_DATA.delivery;
    if (TC.coupon.isFreeShip(subtotal)) return 0;
    if (subtotal >= d.freeAbove) return 0;
    if (!division) return d.insideDhaka;
    return division === 'dhaka' ? d.insideDhaka : d.outsideDhaka;
  };

  /* ---------------- product card ---------------- */
  TC.productCard = function (p) {
    var off = TC.discount(p);
    var flags = '';
    if (p.stock <= 0) flags += '<span class="flag flag-out">' + TC.t('pd.outStock') + '</span>';
    else {
      if (p.badges.indexOf('new') > -1) flags += '<span class="flag flag-new">NEW</span>';
      if (p.badges.indexOf('hot') > -1) flags += '<span class="flag flag-hot">HOT</span>';
      if (off > 0) flags += '<span class="flag flag-sale">-' + off + '%</span>';
      if (p.stock > 0 && p.stock <= 20) flags += '<span class="flag flag-low">' + TC.t('pd.lowStock') + '</span>';
    }
    var on = TC.wish.has(p.id) ? ' on' : '';
    var priceHtml = '<span class="price-now">' + TC.money(p.price) + '</span>' +
      (p.oldPrice > p.price ? '<span class="price-old">' + TC.money(p.oldPrice) + '</span>' : '') +
      (off > 0 ? '<span class="price-off">-' + off + '%</span>' : '');
    return '' +
      '<article class="prod-card reveal">' +
        '<div class="prod-media">' +
          '<a href="product.html?id=' + p.id + '" aria-label="' + TC.esc(p.name[TC.lang]) + '">' +
            '<img src="' + p.img + '" alt="' + TC.esc(p.name[TC.lang]) + '" loading="lazy" width="600" height="600">' +
          '</a>' +
          '<div class="prod-flags">' + flags + '</div>' +
          '<button class="wish-btn' + on + '" data-wish-id="' + p.id + '" aria-label="' + TC.t('nav.wishlist') + '">' +
            '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="prod-body">' +
          '<div class="prod-src">' + TC.esc(TC.supplierName(p.supplier)) + '</div>' +
          '<h3 class="prod-name"><a href="product.html?id=' + p.id + '">' + TC.esc(p.name[TC.lang]) + '</a></h3>' +
          '<div class="prod-rate"><span class="stars">' + TC.stars(p.rating) + '</span> ' + p.rating + ' (' + p.reviews + ')</div>' +
          '<div class="prod-price">' + priceHtml + '</div>' +
          '<button class="prod-add" data-add="' + p.id + '"' + (p.stock <= 0 ? ' disabled' : '') + '>' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/></svg>' +
            TC.t('btn.addCart') +
          '</button>' +
        '</div>' +
      '</article>';
  };

  TC.renderGrid = function (el, list) {
    if (!el) return;
    if (!list.length) { el.innerHTML = '<p style="color:var(--text-2);grid-column:1/-1;padding:30px 0">' + TC.t('shop.none') + '</p>'; return; }
    el.innerHTML = list.map(TC.productCard).join('');
    TC.initReveal();
  };

  /* ---------------- header / footer ---------------- */
  var NAV = [
    { href: 'index.html', key: 'nav.home', id: 'home' },
    { href: 'shop.html', key: 'nav.shop', id: 'shop' },
    { href: 'shop.html?cat=fashion', key: 'nav.categories', id: 'categories' },
    { href: 'shop.html?sort=new', key: 'nav.new', id: 'new' },
    { href: 'shop.html?offers=1', key: 'nav.offers', id: 'offers' },
    { href: 'about.html', key: 'nav.about', id: 'about' },
    { href: 'contact.html', key: 'nav.contact', id: 'contact' }
  ];

  TC.renderHeader = function (active) {
    var host = TC.byId('tc-header'); if (!host) return;
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.id === active ? ' class="active"' : '') + ' data-i18n="' + n.key + '">' + TC.t(n.key) + '</a>';
    }).join('');
    host.innerHTML = '' +
      '<header class="header"><div class="wrap"><nav class="nav">' +
        '<a class="logo" href="index.html">' +
          '<span class="logo-mark">TC</span>' +
          '<span class="logo-txt"><b>Trendy Choice</b><span>Your Style, Our Priority</span></span>' +
        '</a>' +
        '<div class="nav-links">' + links + '</div>' +
        '<form class="nav-search" role="search" onsubmit="return TC.doSearch(event)">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
          '<input type="search" id="tc-search" data-i18n-ph="nav.search" placeholder="' + TC.t('nav.search') + '" aria-label="' + TC.t('nav.search') + '">' +
        '</form>' +
        '<div class="nav-actions">' +
          '<button class="lang-toggle" onclick="TC.toggleLang()" aria-label="Language">' + (TC.lang === 'bn' ? 'EN' : 'বাং') + '</button>' +
          '<a class="icon-btn" href="account.html" aria-label="' + TC.t('nav.account') + '">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></svg>' +
          '</a>' +
          '<a class="icon-btn" href="account.html#wishlist" aria-label="' + TC.t('nav.wishlist') + '">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 000-7.8z"/></svg>' +
            '<span class="badge hide" data-wish-count>0</span>' +
          '</a>' +
          '<a class="icon-btn" href="cart.html" aria-label="' + TC.t('nav.cart') + '">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"/></svg>' +
            '<span class="badge hide" data-cart-count>0</span>' +
          '</a>' +
          '<button class="icon-btn burger" onclick="TC.openDrawer()" aria-label="' + TC.t('nav.menu') + '">' +
            '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
          '</button>' +
        '</div>' +
      '</nav></div></header>' +
      '<div class="drawer" id="tc-drawer">' +
        '<div class="drawer-bg" onclick="TC.closeDrawer()"></div>' +
        '<div class="drawer-panel">' +
          '<div class="drawer-head"><b>' + TC.t('nav.menu') + '</b>' +
            '<button class="icon-btn" onclick="TC.closeDrawer()" aria-label="Close">' +
              '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
            '</button></div>' +
          links +
          '<a href="account.html" data-i18n="nav.account">' + TC.t('nav.account') + '</a>' +
          '<a href="account.html#wishlist" data-i18n="nav.wishlist">' + TC.t('nav.wishlist') + '</a>' +
          '<a href="cart.html" data-i18n="nav.cart">' + TC.t('nav.cart') + '</a>' +
        '</div>' +
      '</div>';
  };

  TC.renderFooter = function () {
    var host = TC.byId('tc-footer'); if (!host) return;
    var cats = (window.TC_DATA.categories || []).map(function (c) {
      return '<a href="shop.html?cat=' + c.id + '">' + TC.esc(c.name[TC.lang]) + '</a>';
    }).join('');
    host.innerHTML = '' +
      '<footer class="footer"><div class="wrap">' +
        '<div class="foot-grid">' +
          '<div class="foot-brand">' +
            '<a class="logo" href="index.html"><span class="logo-mark">TC</span>' +
              '<span class="logo-txt"><b>Trendy Choice</b><span>Your Style, Our Priority</span></span></a>' +
            '<p data-i18n="foot.desc">' + TC.t('foot.desc') + '</p>' +
            '<div class="social-links">' +
              '<a href="' + window.TC_DATA.brand.facebook + '" target="_blank" rel="noopener">Facebook</a>' +
              '<a href="' + window.TC_DATA.brand.whatsappLink + '" target="_blank" rel="noopener">WhatsApp</a>' +
            '</div>' +
          '</div>' +
          '<div class="foot-col"><h4 data-i18n="nav.categories">' + TC.t('nav.categories') + '</h4>' + cats + '</div>' +
          '<div class="foot-col"><h4 data-i18n="foot.help">' + TC.t('foot.help') + '</h4>' +
            '<a href="about.html" data-i18n="foot.about">' + TC.t('foot.about') + '</a>' +
            '<a href="contact.html" data-i18n="foot.contact">' + TC.t('foot.contact') + '</a>' +
            '<a href="account.html" data-i18n="acct.orders">' + TC.t('acct.orders') + '</a>' +
            '<a href="cart.html" data-i18n="nav.cart">' + TC.t('nav.cart') + '</a>' +
          '</div>' +
          '<div class="foot-col"><h4 data-i18n="foot.policy">' + TC.t('foot.policy') + '</h4>' +
            '<a href="about.html#return">Return Policy</a>' +
            '<a href="about.html#delivery">Delivery Info</a>' +
            '<a href="about.html#privacy">Privacy Policy</a>' +
            '<a href="about.html#terms">Terms &amp; Conditions</a>' +
          '</div>' +
        '</div>' +
        '<div class="foot-bottom">' +
          '<span>© 2026 Trendy Choice. <span data-i18n="foot.rights">' + TC.t('foot.rights') + '</span></span>' +
          '<div class="pay-chips">' +
            '<span class="pay-chip">Cash on Delivery</span><span class="pay-chip">bKash</span>' +
            '<span class="pay-chip">Nagad</span><span class="pay-chip">Rocket</span>' +
            '<span class="pay-chip">SSLCommerz</span>' +
          '</div>' +
        '</div>' +
      '</div></footer>' +
      '<a class="wa-float" href="' + window.TC_DATA.brand.whatsappLink + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
        '<svg width="27" height="27" viewBox="0 0 24 24" fill="#fff"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2z"/></svg>' +
      '</a>';
  };

  TC.toggleLang = function () { TC.setLang(TC.lang === 'bn' ? 'en' : 'bn'); };
  TC.openDrawer = function () { var d = TC.byId('tc-drawer'); if (d) d.classList.add('open'); };
  TC.closeDrawer = function () { var d = TC.byId('tc-drawer'); if (d) d.classList.remove('open'); };
  TC.doSearch = function (e) {
    e.preventDefault();
    var v = (TC.byId('tc-search') || {}).value || '';
    location.href = 'shop.html?q=' + encodeURIComponent(v.trim());
    return false;
  };

  /* ---------------- reveal on scroll ---------------- */
  TC.initReveal = function () {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    els.forEach(function (e) { io.observe(e); });
  };

  /* ---------------- global delegated events ---------------- */
  document.addEventListener('click', function (e) {
    var add = e.target.closest('[data-add]');
    if (add) { TC.cart.add(add.getAttribute('data-add'), 1, ''); return; }
    var w = e.target.closest('[data-wish-id]');
    if (w) { TC.wish.toggle(w.getAttribute('data-wish-id')); return; }
  });

  /* ---------------- boot ---------------- */
  TC.boot = function (active) {
    document.documentElement.lang = TC.lang;
    document.body.classList.toggle('lang-bn', TC.lang === 'bn');
    TC.renderHeader(active);
    TC.renderFooter();
    TC.applyI18n();
    TC.cart.sync();
    TC.wish.sync();
    TC.initReveal();
  };

  window.TC = TC;
})();
