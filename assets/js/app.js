/* NIRA — shared application script (layout, cart, pages) */
(function () {
  "use strict";

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var money = function (n) { return "₹" + Number(n).toLocaleString("en-IN"); };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };

  var CART_KEY = "nira_cart", WISH_KEY = "nira_wish", PROMO_KEY = "nira_promo";

  var ICON = {
    search: '<svg><use href="#i-search"/></svg>',
    heart: '<svg><use href="#i-heart"/></svg>',
    bag: '<svg><use href="#i-bag"/></svg>',
    user: '<svg><use href="#i-user"/></svg>',
    menu: '<svg><use href="#i-menu"/></svg>',
    close: '<svg><use href="#i-close"/></svg>',
    eye: '<svg><use href="#i-eye"/></svg>',
    arrow: '<svg width="14" height="14" style="stroke:currentColor;fill:none;stroke-width:1.5"><use href="#i-arrow"/></svg>',
    check: '<svg><use href="#i-check"/></svg>',
    star: '<svg><use href="#i-star"/></svg>'
  };

  /* ---------------------------------------------------------------- store */
  function readCart() {
    try { var a = JSON.parse(lsGet(CART_KEY)); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }
  function writeCart(a) { lsSet(CART_KEY, JSON.stringify(a)); }
  function readWish() {
    try { var a = JSON.parse(lsGet(WISH_KEY)); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function byId(id) { return NIRA.products.filter(function (p) { return p.id === id; })[0]; }
  function cartCount() { return readCart().reduce(function (n, l) { return n + l.qty; }, 0); }
  function lineTotal(l) { var p = byId(l.id); return p ? p.price * l.qty : 0; }
  function subtotal() { return readCart().reduce(function (n, l) { return n + lineTotal(l); }, 0); }
  function promo() { return lsGet(PROMO_KEY) || ""; }
  function discount() { return promo() ? Math.round(subtotal() * 0.1) : 0; }
  function shipping() {
    var s = subtotal() - discount();
    if (s <= 0) return 0;
    return s >= NIRA.freeShip ? 0 : NIRA.shipFee;
  }
  function grandTotal() { return Math.max(0, subtotal() - discount() + shipping()); }

  function addToCart(id, qty, size, shade) {
    var p = byId(id); if (!p) return;
    var cart = readCart();
    size = size || (p.sizes && p.sizes[0]) || "";
    shade = shade || (p.shades && p.shades[0] ? p.shades[0].name : "");
    var found = null;
    cart.forEach(function (l) { if (l.id === id && l.size === size && l.shade === shade) found = l; });
    if (found) found.qty += (qty || 1);
    else cart.push({ id: id, qty: qty || 1, size: size, shade: shade });
    writeCart(cart);
    syncAll();
    toast(p.name + " added to bag");
    openPanel("cartDrawer");
  }
  function setQty(idx, delta) {
    var cart = readCart();
    if (!cart[idx]) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    writeCart(cart); syncAll();
  }
  function removeLine(idx) {
    var cart = readCart(); cart.splice(idx, 1); writeCart(cart); syncAll();
  }

  /* ---------------------------------------------------------------- ui bits */
  var toastEl, toastT;
  function toast(msg) {
    if (!toastEl) return;
    $("#toastText").textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("on"); }, 2300);
  }
  function openPanel(id) {
    var el = document.getElementById(id); if (!el) return;
    el.classList.add("on");
    $("#veil").classList.add("on");
    document.body.classList.add("lock");
    if (id === "searchPanel") setTimeout(function () { var i = $("#searchInput"); if (i) i.focus(); }, 300);
  }
  function closePanels() {
    $$(".drawer.on,.modal.on,.searchp.on,.mnav.on").forEach(function (el) { el.classList.remove("on"); });
    $("#veil").classList.remove("on");
    document.body.classList.remove("lock");
  }

  /* ---------------------------------------------------------------- layout */
  function headerHTML() {
    var page = document.body.getAttribute("data-page") || "";
    function nav(href, text, key) {
      return '<a href="' + href + '"' + (page === key ? ' class="on"' : "") + ">" + text + "</a>";
    }
    return '' +
      '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/></symbol>' +
      '<symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.6 12 20 12 20z"/></symbol>' +
      '<symbol id="i-bag" viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>' +
      '<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></symbol>' +
      '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>' +
      '<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>' +
      '<symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/></symbol>' +
      '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>' +
      '<symbol id="i-check" viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></symbol>' +
      '<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3L3 9.5l6.4-.6z"/></symbol>' +
      '<symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z"/></symbol>' +
      '<symbol id="i-pause" viewBox="0 0 24 24"><path d="M9 5v14M15 5v14"/></symbol>' +
      '<symbol id="i-mute" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l4 6M21 9l-4 6"/></symbol>' +
      '<symbol id="i-sound" viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9a4 4 0 0 1 0 6"/></symbol>' +
      '</defs></svg>' +

      '<div class="util"><div class="shell">' +
      '<div class="util-rot" id="utilRot"><span class="on">Free shipping over ₹1,499</span>' +
      '<span>Extra 10% off first order — code NIRA10</span><span>COD available pan-India · 14-day returns</span></div>' +
      '<div class="util-r"><a href="contact.html">Track order</a><a href="about.html">Our story</a><a href="contact.html">₹ INR</a></div>' +
      '</div></div>' +

      '<header class="hdr" id="hdr"><div class="shell hdr-in">' +
      '<button class="iconbtn burger" data-open="mnav" aria-label="Menu">' + ICON.menu + '</button>' +
      '<nav class="nav">' + nav("shop.html", "Shop all", "shop") + nav("shop.html?cat=skincare", "Skincare", "") +
      nav("shop.html?cat=makeup", "Makeup", "") + nav("shop.html?cat=bags", "Bags", "") +
      nav("shop.html?cat=suits", "Suits", "") + nav("about.html", "About", "about") + '</nav>' +
      '<a class="logo" href="index.html">Nira</a>' +
      '<div class="hdr-r">' +
      '<button class="iconbtn" data-open="searchPanel" aria-label="Search">' + ICON.search + '</button>' +
      '<a class="iconbtn" href="contact.html" aria-label="Account">' + ICON.user + '</a>' +
      '<button class="iconbtn" aria-label="Wishlist" id="wishBtn">' + ICON.heart +
      '<span class="badge-n" id="wishCount" style="display:none">0</span></button>' +
      '<button class="iconbtn" data-open="cartDrawer" aria-label="Bag">' + ICON.bag +
      '<span class="badge-n" id="cartCount" style="display:none">0</span></button>' +
      '</div></div></header>';
  }

  function footerHTML() {
    return '<footer class="ftr"><div class="shell">' +
      '<div class="ftr-grid">' +
      '<div><a class="logo" href="index.html">Nira</a>' +
      '<p>Beauty and atelier — skincare, body, makeup, bags, suits and heels. Fewer, better things, made to be used daily.</p></div>' +
      '<div><h5>Shop</h5><ul>' +
      '<li><a href="shop.html?cat=skincare">Skincare</a></li><li><a href="shop.html?cat=makeup">Makeup</a></li>' +
      '<li><a href="shop.html?cat=body">Body</a></li><li><a href="shop.html?cat=bags">Bags</a></li>' +
      '<li><a href="shop.html?cat=suits">Suits</a></li><li><a href="shop.html?cat=heels">Heels</a></li></ul></div>' +
      '<div><h5>Help</h5><ul>' +
      '<li><a href="contact.html">Track order</a></li><li><a href="contact.html">Shipping</a></li>' +
      '<li><a href="contact.html">Returns</a></li><li><a href="contact.html">Shade match</a></li>' +
      '<li><a href="contact.html">Contact us</a></li></ul></div>' +
      '<div><h5>Company</h5><ul>' +
      '<li><a href="about.html">Our story</a></li><li><a href="about.html">Ingredients</a></li>' +
      '<li><a href="index.html#journal">Journal</a></li><li><a href="contact.html">Careers</a></li></ul></div>' +
      '<div><h5>Follow</h5><ul>' +
      '<li><a href="#">Instagram</a></li><li><a href="#">YouTube</a></li>' +
      '<li><a href="#">WhatsApp</a></li><li><a href="#">Pinterest</a></li></ul></div>' +
      '</div>' +
      '<div class="ftr-base"><span>© 2026 Nira — demo storefront. Photography: Pexels free licence.</span>' +
      '<div class="pay"><span>UPI</span><span>Visa</span><span>Mastercard</span><span>RuPay</span><span>Netbanking</span><span>COD</span></div>' +
      '</div></div></footer>';
  }

  function overlaysHTML() {
    return '<div class="veil" id="veil"></div>' +

      '<aside class="drawer" id="cartDrawer" aria-label="Shopping bag">' +
      '<div class="drawer-h"><h3>Your bag (<span id="bagCount">0</span>)</h3>' +
      '<button class="iconbtn" data-close aria-label="Close">' + ICON.close + '</button></div>' +
      '<div class="drawer-b"><div class="ship"><p id="shipText">Add ₹1,499 more for free shipping</p>' +
      '<div class="track"><i id="shipBar"></i></div></div><div id="drawerLines"></div></div>' +
      '<div class="drawer-f"><div class="sline"><span>Subtotal</span><b id="drawerTotal">₹0</b></div>' +
      '<p style="font-size:.7rem;color:var(--muted);margin-bottom:14px">Taxes included. Shipping calculated at checkout.</p>' +
      '<a class="btn btn--block" href="checkout.html" style="margin-bottom:8px">Checkout</a>' +
      '<a class="btn btn--ghost btn--block" href="cart.html">View bag</a></div></aside>' +

      '<div class="searchp" id="searchPanel"><div class="shell">' +
      '<div class="srow">' + ICON.search +
      '<input id="searchInput" type="text" placeholder="Search serums, bags, heels…" aria-label="Search">' +
      '<button class="iconbtn" data-close aria-label="Close">' + ICON.close + '</button></div>' +
      '<div class="shints"><button data-term="serum">Vitamin C serum</button><button data-term="tote">Structured tote</button>' +
      '<button data-term="lipstick">Matte lipstick</button><button data-term="heels">Block heels</button>' +
      '<button data-term="saree">Silk saree</button></div>' +
      '<div class="sres" id="searchResults"></div></div></div>' +

      '<nav class="mnav" id="mnav"><div class="mnav-h"><span class="logo" style="font-size:1.1rem">Nira</span>' +
      '<button class="iconbtn" data-close aria-label="Close">' + ICON.close + '</button></div>' +
      '<ul><li><a href="shop.html">Shop all <span>' + NIRA.products.length + '</span></a></li>' +
      NIRA.categories.map(function (c) {
        var n = NIRA.products.filter(function (p) { return p.cat === c.id; }).length;
        return '<li><a href="shop.html?cat=' + c.id + '">' + c.name + ' <span>' + n + '</span></a></li>';
      }).join("") +
      '<li><a href="about.html">About <span>—</span></a></li>' +
      '<li><a href="contact.html">Contact <span>—</span></a></li></ul>' +
      '<div class="mnav-f"><a class="btn" href="cart.html">View bag</a>' +
      '<a class="btn btn--ghost" href="contact.html">Book a shade match</a></div></nav>' +

      '<div class="toast" id="toast">' + ICON.check + '<span id="toastText">Added</span></div>';
  }

  /* ---------------------------------------------------------------- render */
  function stars(n) {
    var out = "", full = Math.round(n);
    for (var i = 0; i < 5; i++) out += '<svg style="opacity:' + (i < full ? 1 : .28) + '"><use href="#i-star"/></svg>';
    return out;
  }

  function cardHTML(p) {
    var wished = readWish().indexOf(p.id) > -1;
    return '<article class="pcard" data-id="' + p.id + '">' +
      '<div class="ph"><a href="product.html?id=' + p.id + '">' +
      '<img class="main" src="' + p.img + '" alt="' + p.name + '">' +
      '<img class="alt" src="' + p.img2 + '" alt=""></a>' +
      (p.tag ? '<span class="tag">' + p.tag + '</span>' : "") +
      '<button class="wishbtn' + (wished ? " on" : "") + '" data-wish="' + p.id + '" aria-label="Wishlist">' + ICON.heart + '</button>' +
      '<div class="quick"><button class="btn" data-add="' + p.id + '">Add to bag</button>' +
      '<a class="qview" href="product.html?id=' + p.id + '" aria-label="View product">' + ICON.eye + '</a></div></div>' +
      '<div class="pinfo"><div><a href="product.html?id=' + p.id + '"><div class="pname">' + p.name + '</div></a>' +
      '<div class="pcat">' + p.catName + '</div>' +
      '<div class="stars">' + stars(p.rating) + '</div></div>' +
      '<div class="pprice">' + (p.mrp > p.price ? "<s>" + money(p.mrp) + "</s>" : "") + money(p.price) + '</div>' +
      '</div></article>';
  }

  function renderDrawer() {
    var lines = readCart(), wrap = $("#drawerLines");
    if (!wrap) return;
    if (!lines.length) {
      wrap.innerHTML = '<div class="dempty">' + ICON.bag +
        '<p style="font-size:.86rem">Your bag is empty.</p>' +
        '<p style="font-size:.76rem;margin-top:6px">Bestsellers start at ₹599.</p></div>';
    } else {
      wrap.innerHTML = lines.map(function (l, i) {
        var p = byId(l.id); if (!p) return "";
        return '<div class="dline"><a class="ph" href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt=""></a>' +
          '<div><h5>' + p.name + '</h5><div class="m">' + [l.size, l.shade].filter(Boolean).join(" · ") + '</div>' +
          '<div class="q"><button data-dec="' + i + '">–</button><span>' + l.qty + '</span><button data-inc="' + i + '">+</button></div></div>' +
          '<div><div class="a">' + money(lineTotal(l)) + '</div><div class="rm" data-rm="' + i + '">Remove</div></div></div>';
      }).join("");
    }
    var s = subtotal();
    $("#drawerTotal").textContent = money(s);
    $("#bagCount").textContent = cartCount();
    var left = NIRA.freeShip - s;
    if ($("#shipText")) {
      $("#shipText").textContent = left > 0 ? "Add " + money(left) + " more for free shipping" : "Free shipping unlocked";
      $("#shipBar").style.width = Math.min(100, (s / NIRA.freeShip) * 100) + "%";
    }
  }

  function renderBadges() {
    var c = cartCount(), w = readWish().length;
    var cc = $("#cartCount"), wc = $("#wishCount");
    if (cc) { cc.textContent = c; cc.style.display = c ? "grid" : "none"; }
    if (wc) { wc.textContent = w; wc.style.display = w ? "grid" : "none"; }
  }

  function syncAll() { renderBadges(); renderDrawer(); if (window.__pageRender) window.__pageRender(); }

  /* ---------------------------------------------------------------- search */
  function initSearch() {
    var input = $("#searchInput"), out = $("#searchResults");
    if (!input || !out) return;
    function run(q) {
      q = (q || "").toLowerCase().trim();
      var hits = NIRA.products.filter(function (p) {
        return !q || (p.name + " " + p.cat + " " + p.short).toLowerCase().indexOf(q) > -1;
      });
      out.innerHTML = hits.length ? hits.slice(0, 8).map(function (p) {
        return '<div class="sitem" data-go="product.html?id=' + p.id + '">' +
          '<span>' + p.name + ' <small>' + p.catName + '</small></span><span>' + money(p.price) + '</span></div>';
      }).join("") : '<div class="sitem" style="color:var(--muted)">No matches. Try “serum” or “tote”.</div>';
    }
    input.addEventListener("input", function () { run(input.value); });
    $$(".shints button").forEach(function (b) {
      b.addEventListener("click", function () { input.value = b.getAttribute("data-term"); run(input.value); });
    });
    out.addEventListener("click", function (e) {
      var row = e.target.closest("[data-go]");
      if (row) location.href = row.getAttribute("data-go");
    });
  }

  /* ---------------------------------------------------------------- reveal */
  function initReveal() {
    var els = $$("[data-reveal]");
    function check() {
      var h = window.innerHeight || 800;
      els = els.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < h * 0.95 && r.bottom > -60) { el.classList.add("in"); return false; }
        return true;
      });
    }
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check(); setTimeout(check, 400); setTimeout(check, 1200);
  }

  /* ---------------------------------------------------------------- pages */
  function pageHome() {
    var grid = $("#newGrid");
    if (grid) grid.innerHTML = NIRA.products.slice(0, 8).map(cardHTML).join("");
    var jg = $("#journalGrid");
    if (jg) jg.innerHTML = NIRA.journal.map(function (j) {
      return '<article class="jcard" data-reveal><div class="ph"><img src="' + j.img + '" alt=""></div>' +
        '<span class="label">' + j.cat + '</span><h4>' + j.title + '</h4><p>' + j.text + '</p></article>';
    }).join("");
    var rg = $("#reviewGrid");
    if (rg) rg.innerHTML = NIRA.reviews.map(function (r) {
      return '<div class="pcard" style="border:1px solid var(--line);padding:22px;background:var(--paper)">' +
        '<div class="stars">' + stars(r.rating) + '</div>' +
        '<p style="font-size:.88rem;color:var(--ink-2);margin-top:12px">“' + r.text + '”</p>' +
        '<div class="label" style="margin-top:16px">' + r.name + ' · ' + r.city + '</div></div>';
    }).join("");
  }

  function pageShop() {
    var grid = $("#shopGrid"), countEl = $("#shopCount"), chips = $("#shopChips"), sortSel = $("#sortSel");
    if (!grid) return;
    var state = { cat: param("cat") || "all", sort: "featured" };

    function apply() {
      var list = NIRA.products.filter(function (p) { return state.cat === "all" || p.cat === state.cat; });
      if (state.sort === "low") list.sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "high") list.sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
      grid.innerHTML = list.length ? list.map(cardHTML).join("")
        : '<div class="empty" style="grid-column:1/-1">Nothing in this edit yet.</div>';
      if (countEl) countEl.textContent = list.length + " pieces";
      if (chips) $$(".chip", chips).forEach(function (c) {
        c.classList.toggle("on", c.getAttribute("data-cat") === state.cat);
      });
      initReveal();
    }
    if (chips) chips.addEventListener("click", function (e) {
      var c = e.target.closest("[data-cat]"); if (!c) return;
      state.cat = c.getAttribute("data-cat");
      history.replaceState({}, "", state.cat === "all" ? "shop.html" : "shop.html?cat=" + state.cat);
      apply();
    });
    if (sortSel) sortSel.addEventListener("change", function () { state.sort = sortSel.value; apply(); });
    window.__pageRender = apply;
    apply();
  }

  function pageProduct() {
    var root = $("#pdpRoot");
    if (!root) return;
    var p = byId(param("id")) || NIRA.products[0];
    var state = { size: (p.sizes && p.sizes[0]) || "", shade: (p.shades && p.shades[0]) ? p.shades[0].name : "", qty: 1, img: p.img };
    var gallery = [p.img, p.img2, "assets/img/lip-apply.jpg", "assets/img/flatlay.jpg"];

    function paint() {
      root.innerHTML =
        '<div class="crumb"><a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span>' +
        '<a href="shop.html?cat=' + p.cat + '">' + p.catName + '</a><span>/</span><span>' + p.name + '</span></div>' +
        '<div class="pdp"><div class="gal"><div class="gal-th">' +
        gallery.map(function (g, i) {
          return '<button data-img="' + g + '" class="' + (i === 0 ? "on" : "") + '"><img src="' + g + '" alt=""></button>';
        }).join("") +
        '</div><div class="gal-main"><img id="galMain" src="' + state.img + '" alt="' + p.name + '"></div></div>' +
        '<div class="pdp-info"><p class="label label--maroon">' + p.catName + '</p>' +
        '<h1>' + p.name + '</h1>' +
        '<div class="rate"><span class="stars">' + stars(p.rating) + '</span>' +
        '<span>' + p.rating + ' · ' + p.reviews.toLocaleString("en-IN") + ' reviews</span></div>' +
        '<div class="price"><b>' + money(p.price) + '</b>' +
        (p.mrp > p.price ? '<s>' + money(p.mrp) + '</s><em>Save ' + Math.round((1 - p.price / p.mrp) * 100) + '%</em>' : "") + '</div>' +
        '<div class="emi">or 3 interest-free EMIs of ' + money(Math.round(p.price / 3)) + ' · Free shipping over ' + money(NIRA.freeShip) + '</div>' +
        (p.sizes && p.sizes.length ? '<div class="opt"><div class="lab"><span>Size</span><span>' + state.size + ' selected</span></div>' +
          '<div class="sizes">' + p.sizes.map(function (s) {
            return '<button class="size ' + (s === state.size ? "on" : "") + '" data-size="' + s + '">' + s + '</button>';
          }).join("") + '</div></div>' : "") +
        (p.shades && p.shades.length ? '<div class="opt"><div class="lab"><span>Shade</span><span>' + state.shade + '</span></div>' +
          '<div class="shades">' + p.shades.map(function (s) {
            return '<button class="shade ' + (s.name === state.shade ? "on" : "") + '" data-shade="' + s.name +
              '" style="background:' + s.hex + '" title="' + s.name + '"></button>';
          }).join("") + '</div></div>' : "") +
        '<div class="buyrow"><div class="qty"><button data-q="-1">–</button><span id="qtyVal">' + state.qty + '</span><button data-q="1">+</button></div>' +
        '<button class="btn btn--block" id="addBtn">Add to bag — ' + money(p.price * state.qty) + '</button></div>' +
        '<button class="btn btn--ghost btn--block" id="wishBtnPdp">Save to wishlist</button>' +
        '<div class="pin"><input id="pinInput" maxlength="6" inputmode="numeric" placeholder="Enter pincode for delivery date">' +
        '<button id="pinCheck">Check</button></div><div class="pinmsg" id="pinMsg"></div>' +
        '<div class="acc">' +
        '<details open><summary>Description</summary><p>' + p.desc + '</p></details>' +
        '<details><summary>How to use</summary><p>' + p.use + '</p></details>' +
        '<details><summary>Ingredients</summary><p>' + p.ingredients + '</p></details>' +
        '<details><summary>Shipping &amp; returns</summary><p>Dispatched within 24 hours. Free shipping above ' +
        money(NIRA.freeShip) + '. 14-day returns on unopened products.</p></details></div>' +
        '</div></div>';

      wire();
    }

    function wire() {
      $$(".gal-th button").forEach(function (b) {
        b.addEventListener("click", function () {
          $$(".gal-th button").forEach(function (x) { x.classList.remove("on"); });
          b.classList.add("on");
          state.img = b.getAttribute("data-img");
          $("#galMain").src = state.img;
        });
      });
      $$("[data-size]").forEach(function (b) {
        b.addEventListener("click", function () { state.size = b.getAttribute("data-size"); paint(); });
      });
      $$("[data-shade]").forEach(function (b) {
        b.addEventListener("click", function () { state.shade = b.getAttribute("data-shade"); paint(); });
      });
      $$("[data-q]").forEach(function (b) {
        b.addEventListener("click", function () {
          state.qty = Math.max(1, Math.min(9, state.qty + Number(b.getAttribute("data-q"))));
          $("#qtyVal").textContent = state.qty;
          $("#addBtn").textContent = "Add to bag — " + money(p.price * state.qty);
        });
      });
      $("#addBtn").addEventListener("click", function () {
        addToCart(p.id, state.qty, state.size, state.shade);
      });
      $("#wishBtnPdp").addEventListener("click", function () { toggleWish(p.id); });
      $("#pinCheck").addEventListener("click", function () {
        var v = ($("#pinInput").value || "").trim(), msg = $("#pinMsg");
        if (!/^\d{6}$/.test(v)) { msg.className = "pinmsg"; msg.textContent = "Enter a valid 6-digit pincode."; return; }
        var d = new Date(); d.setDate(d.getDate() + 3);
        msg.className = "pinmsg ok";
        msg.textContent = "Delivers by " + d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) +
          " · COD available · Free shipping";
      });
    }

    paint();

    var rel = $("#related");
    if (rel) {
      rel.innerHTML = NIRA.products.filter(function (x) { return x.cat === p.cat && x.id !== p.id; })
        .concat(NIRA.products.filter(function (x) { return x.cat !== p.cat; })).slice(0, 4).map(cardHTML).join("");
    }

    /* sticky buy bar */
    var bar = $("#stickyBuy");
    if (bar) {
      $("#stickyName").textContent = p.name;
      $("#stickyPrice").textContent = money(p.price);
      $("#stickyAdd").addEventListener("click", function () { addToCart(p.id, state.qty, state.size, state.shade); });
      window.addEventListener("scroll", function () {
        bar.classList.toggle("on", window.scrollY > 620);
      }, { passive: true });
    }
  }

  function summaryHTML() {
    var s = subtotal(), d = discount(), sh = shipping();
    return '<div class="sline"><span>Subtotal</span><span>' + money(s) + '</span></div>' +
      (d ? '<div class="sline" style="color:var(--maroon)"><span>Discount (NIRA10)</span><span>−' + money(d) + '</span></div>' : "") +
      '<div class="sline"><span>Shipping</span><span>' + (sh ? money(sh) : "Free") + '</span></div>' +
      '<div class="sline total"><span>Total</span><b>' + money(Math.max(0, s - d + sh)) + '</b></div>';
  }

  function pageCart() {
    var wrap = $("#cartRows"), sum = $("#cartSummary");
    if (!wrap) return;
    function paint() {
      var lines = readCart();
      if (!lines.length) {
        wrap.innerHTML = '<div class="empty">Your bag is empty. <a class="link-u" href="shop.html" style="margin-left:8px">Start shopping</a></div>';
        if (sum) sum.innerHTML = '<h3>Order summary</h3>' + summaryHTML() +
          '<a class="btn btn--block" href="shop.html" style="margin-top:16px">Shop the edit</a>';
        return;
      }
      wrap.innerHTML = lines.map(function (l, i) {
        var p = byId(l.id); if (!p) return "";
        return '<div class="crow"><a class="ph" href="product.html?id=' + p.id + '"><img src="' + p.img + '" alt=""></a>' +
          '<div><a href="product.html?id=' + p.id + '"><h4>' + p.name + '</h4></a>' +
          '<div class="meta">' + [l.size, l.shade].filter(Boolean).join(" · ") + '</div>' +
          '<div class="ctl"><div class="qty"><button data-dec="' + i + '">–</button><span>' + l.qty + '</span>' +
          '<button data-inc="' + i + '">+</button></div>' +
          '<span class="rm" data-rm="' + i + '">Remove</span></div></div>' +
          '<div class="amt">' + money(lineTotal(l)) + '</div></div>';
      }).join("");
      if (sum) {
        sum.innerHTML = '<h3>Order summary</h3>' + summaryHTML() +
          '<div class="promo"><input id="promoInput" placeholder="Promo code" value="' + promo() + '">' +
          '<button id="promoBtn">Apply</button></div>' +
          '<div class="promomsg" id="promoMsg">' + (promo() ? "NIRA10 applied — 10% off" : "") + '</div>' +
          '<a class="btn btn--block" href="checkout.html" style="margin-top:10px">Proceed to checkout</a>' +
          '<a class="btn btn--ghost btn--block" href="shop.html" style="margin-top:8px">Continue shopping</a>';
        $("#promoBtn").addEventListener("click", function () {
          var v = ($("#promoInput").value || "").trim().toUpperCase();
          if (v === "NIRA10") { lsSet(PROMO_KEY, "NIRA10"); toast("NIRA10 applied — 10% off"); paint(); }
          else if (!v) { lsDel(PROMO_KEY); paint(); }
          else { $("#promoMsg").textContent = "That code is not valid."; }
        });
      }
    }
    window.__pageRender = paint;
    paint();
  }

  function pageCheckout() {
    var form = $("#coForm");
    if (!form) return;
    var sum = $("#coSummary");
    function paintSummary() {
      if (!sum) return;
      var lines = readCart();
      sum.innerHTML = '<h3>Order summary</h3>' +
        lines.map(function (l) {
          var p = byId(l.id); if (!p) return "";
          return '<div class="sline"><span>' + p.name + ' × ' + l.qty + '</span><span>' + money(lineTotal(l)) + '</span></div>';
        }).join("") + summaryHTML();
    }
    paintSummary();

    $$(".pay-opt label").forEach(function (l) {
      l.addEventListener("click", function () {
        $$(".pay-opt label").forEach(function (x) { x.classList.remove("on"); });
        l.classList.add("on");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$("[data-required]", form).forEach(function (input) {
        var err = input.parentNode.querySelector(".err");
        var val = (input.value || "").trim();
        var bad = !val || (input.type === "email" && !/^\S+@\S+\.\S+$/.test(val)) ||
          (input.getAttribute("name") === "pincode" && !/^\d{6}$/.test(val)) ||
          (input.getAttribute("name") === "phone" && !/^\d{10}$/.test(val.replace(/\D/g, "")));
        if (err) err.textContent = bad ? "Please check this field." : "";
        if (bad) ok = false;
      });
      if (!ok) { toast("Please complete the highlighted fields"); return; }
      if (!readCart().length) { toast("Your bag is empty"); return; }

      var id = "NR" + Math.floor(100000 + Math.random() * 899999);
      var total = grandTotal();
      writeCart([]);
      lsDel(PROMO_KEY);
      $("#coFormWrap").style.display = "none";
      var done = $("#coDone");
      done.style.display = "block";
      $("#orderId").textContent = id;
      $("#orderTotal").textContent = money(total);
      syncAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function pageContact() {
    var f = $("#contactForm");
    if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = ($("#cName").value || "").trim(), email = ($("#cEmail").value || "").trim();
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) { toast("Please add your name and a valid email"); return; }
      $("#contactOk").style.display = "block";
      f.reset();
      toast("Message sent — we reply within a day");
    });
  }

  function toggleWish(id) {
    var w = readWish(), i = w.indexOf(id);
    if (i > -1) { w.splice(i, 1); toast("Removed from wishlist"); }
    else { w.push(id); toast("Saved to wishlist"); }
    lsSet(WISH_KEY, JSON.stringify(w));
    $$('[data-wish="' + id + '"]').forEach(function (b) { b.classList.toggle("on", w.indexOf(id) > -1); });
    renderBadges();
  }

  /* ---------------------------------------------------------------- boot */
  document.addEventListener("DOMContentLoaded", function () {
    var h = $("#site-header"), f = $("#site-footer");
    if (h) h.innerHTML = headerHTML();
    if (f) f.innerHTML = footerHTML();
    document.body.insertAdjacentHTML("beforeend", overlaysHTML());

    toastEl = $("#toast");
    initSearch();
    initReveal();
    renderBadges();
    renderDrawer();

    var page = document.body.getAttribute("data-page");
    if (page === "home") pageHome();
    if (page === "shop") pageShop();
    if (page === "product") pageProduct();
    if (page === "cart") pageCart();
    if (page === "checkout") pageCheckout();
    if (page === "contact") pageContact();

    /* global interactions */
    document.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]");
      if (o) openPanel(o.getAttribute("data-open"));
      if (e.target.closest("[data-close]")) closePanels();
      var add = e.target.closest("[data-add]");
      if (add) { addToCart(add.getAttribute("data-add"), 1); return; }
      var w = e.target.closest("[data-wish]");
      if (w) { toggleWish(w.getAttribute("data-wish")); return; }
      var inc = e.target.closest("[data-inc]");
      if (inc) { setQty(Number(inc.getAttribute("data-inc")), 1); return; }
      var dec = e.target.closest("[data-dec]");
      if (dec) { setQty(Number(dec.getAttribute("data-dec")), -1); return; }
      var rm = e.target.closest("[data-rm]");
      if (rm) { removeLine(Number(rm.getAttribute("data-rm"))); return; }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePanels(); });
    if ($("#veil")) $("#veil").addEventListener("click", closePanels);

    /* header shadow */
    var hdr = $("#hdr");
    if (hdr) window.addEventListener("scroll", function () { hdr.classList.toggle("stuck", window.scrollY > 8); }, { passive: true });

    /* utility rotator */
    var rots = $$("#utilRot span"), ri = 0;
    if (rots.length) setInterval(function () {
      rots[ri].classList.remove("on"); ri = (ri + 1) % rots.length; rots[ri].classList.add("on");
    }, 4200);

    /* film controls */
    var film = $("#film");
    if (film) {
      var ft = $("#filmToggle"), ftT = $("#filmToggleText"), mt = $("#muteToggle"), mtT = $("#muteText");
      function sync() {
        if (!ft) return;
        var playing = !film.paused;
        ftT.textContent = playing ? "Pause film" : "Play film";
        ft.querySelector("use").setAttribute("href", playing ? "#i-pause" : "#i-play");
        mtT.textContent = film.muted ? "Sound off" : "Sound on";
        mt.querySelector("use").setAttribute("href", film.muted ? "#i-mute" : "#i-sound");
      }
      ft.addEventListener("click", function () { film.paused ? film.play() : film.pause(); sync(); });
      mt.addEventListener("click", function () { film.muted = !film.muted; if (!film.muted && film.paused) film.play(); sync(); });
      film.addEventListener("play", sync); film.addEventListener("pause", sync);
      var pr = film.play(); if (pr && pr.catch) pr.catch(function () {}); sync();
    }

    /* newsletter + generic forms */
    $$("form[data-news]").forEach(function (fm) {
      fm.addEventListener("submit", function (e) {
        e.preventDefault();
        var inp = fm.querySelector("input");
        if (inp && !/^\S+@\S+\.\S+$/.test((inp.value || "").trim())) { toast("Enter a valid email"); return; }
        toast("You're in — check your inbox for the code");
        fm.reset();
      });
    });

    /* marquee duplication */
    var mt2 = $("#marqueeTrack");
    if (mt2) mt2.innerHTML += mt2.innerHTML;
  });
})();
