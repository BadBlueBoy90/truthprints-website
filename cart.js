/* TruthPrints — cart drawer. localStorage, no backend.
   Checkout = pre-order email until the payment provider is wired up. */
(function(){
  'use strict';

  /* ── catalogue (prices editable here) ── */
  var EDITIONS = [
    { id: 'digital',   en: 'Digital',   de: 'Digital'   },
    { id: 'paperback', en: 'Paperback', de: 'Broschiert' },
    { id: 'collector', en: 'Collector', de: 'Sammler'   }
  ];
  var SIZES = [
    { id: 'a3',     en: 'A3 print',      de: 'A3-Druck' },
    { id: 'a2',     en: 'A2 print',      de: 'A2-Druck' },
    { id: 'canvas', en: 'Canvas 60×40',  de: 'Leinwand 60×40' }
  ];
  var CATALOG = {
    wa1: { en: 'Jerusalem',            de: 'Jerusalem',               img: 'assets/wallart/jerusalem.jpg', prices: { a3: 29, a2: 49, canvas: 89 } },
    wa2: { en: 'Dawn over Galilee',    de: 'Morgen über Galiläa',     img: 'assets/wallart/galilee.jpg',   prices: { a3: 29, a2: 49, canvas: 89 } },
    wa3: { en: 'The Empty Tomb',       de: 'Das leere Grab',          img: 'assets/wallart/tomb.jpg',      prices: { a3: 29, a2: 49, canvas: 89 } },
    wa4: { en: 'The Desert Road',      de: 'Der Weg durch die Wüste', img: 'assets/wallart/desert.jpg',    prices: { a3: 29, a2: 49, canvas: 89 } },
    wa5: { en: 'He Is Risen',          de: 'Er ist auferstanden',     img: 'assets/wallart/risen.jpg',     prices: { a3: 29, a2: 49, canvas: 89 } },
    wa6: { en: 'Noah and the Ark',     de: 'Noah und die Arche',      img: 'assets/wallart/noah.jpg',      prices: { a3: 29, a2: 49, canvas: 89 } },
    matthew:    { en: 'The Gospel of Matthew', de: 'Das Evangelium nach Matthäus', img: 'assets/books/matthew-cover.jpg',    prices: { digital: 19, paperback: 42, collector: 89 } },
    mark:       { en: 'The Gospel of Mark',    de: 'Das Evangelium nach Markus',   img: 'assets/books/mark-cover.jpg',       prices: { digital: 19, paperback: 42, collector: 89 } },
    luke:       { en: 'The Gospel of Luke',    de: 'Das Evangelium nach Lukas',    img: 'assets/books/luke-cover.jpg',       prices: { digital: 19, paperback: 42, collector: 89 } },
    john:       { en: 'The Gospel of John',    de: 'Das Evangelium nach Johannes', img: 'assets/books/john-cover.jpg',       prices: { digital: 19, paperback: 42, collector: 89 } },
    collection: { en: 'The Four Gospels',      de: 'Die Vier Evangelien',          img: 'assets/books/collection-cover.jpg', prices: { digital: 59, paperback: 129, collector: 249 } },
    /* wallpaper packs — pure digital download, no shipping */
    wp1: { en: 'Gospel Light · 12 Wallpapers',   de: 'Gospel Light · 12 Wallpaper',   img: 'assets/wallart/galilee.jpg', prices: { digital: 9 } },
    wp2: { en: 'The Passion · 10 Wallpapers',    de: 'Die Passion · 10 Wallpaper',    img: 'assets/wallart/tomb.jpg',    prices: { digital: 9 } },
    wp3: { en: 'Light & Shadow · 15 Wallpapers', de: 'Licht & Schatten · 15 Wallpaper', img: 'assets/wallart/desert.jpg',  prices: { digital: 12 } }
  };

  /* shipping + promo — edit here */
  var SHIP_FLAT = 4.90, SHIP_FREE_FROM = 60;
  var PROMOS = { FOUNDING10: 0.10 };
  var promo = '';
  try { promo = localStorage.getItem('tp_promo') || ''; } catch(_){}

  function isDe(){ return document.body.classList.contains('de'); }
  function t(en, de){ return isDe() ? de : en; }

  /* ── state ── */
  var cart = [];
  try { cart = JSON.parse(localStorage.getItem('tp_cart') || '[]') || []; } catch(_){}

  function save(){ try { localStorage.setItem('tp_cart', JSON.stringify(cart)); } catch(_){} }
  function count(){ return cart.reduce(function(n, i){ return n + i.qty; }, 0); }
  function total(){
    return cart.reduce(function(s, i){
      var b = CATALOG[i.book]; return s + (b ? b.prices[i.ed] * i.qty : 0);
    }, 0);
  }
  function hasPhysical(){
    return cart.some(function(i){ return i.ed !== 'digital'; });
  }
  function physTotal(){
    return cart.reduce(function(s, i){
      if (i.ed === 'digital') return s;
      var b = CATALOG[i.book]; return s + (b ? b.prices[i.ed] * i.qty : 0);
    }, 0);
  }
  function discount(){
    var p = PROMOS[promo.toUpperCase()] || 0;
    return Math.round(total() * p * 100) / 100;
  }
  function shipping(){
    if (!hasPhysical()) return 0;
    return physTotal() >= SHIP_FREE_FROM ? 0 : SHIP_FLAT;
  }
  function grand(){
    return Math.round((total() - discount() + shipping()) * 100) / 100;
  }
  function eur(n){ return '€' + (n % 1 ? n.toFixed(2) : n); }

  function add(book, ed){
    var hit = cart.find(function(i){ return i.book === book && i.ed === ed; });
    if (hit) hit.qty += 1; else cart.push({ book: book, ed: ed, qty: 1 });
    save(); render(); open();
    pulse();
  }

  /* ── markup ── */
  var root = document.createElement('div');
  root.innerHTML =
    '<button id="cartFab" aria-label="Cart">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1.2 11.2a1.6 1.6 0 0 1-1.6 1.3H7.8a1.6 1.6 0 0 1-1.6-1.3L5 8z"/><path d="M8.5 10V6.5a3.5 3.5 0 0 1 7 0V10"/></svg>' +
      '<span id="cartCount">0</span>' +
    '</button>' +
    '<div id="cartScrim"></div>' +
    '<aside id="cartDrawer" role="dialog" aria-label="Cart">' +
      '<div class="cd-head">' +
        '<span class="cd-title"><span data-en>Your Order</span><span data-de>Deine Bestellung</span></span>' +
        '<button id="cartClose" aria-label="Close">×</button>' +
      '</div>' +
      '<div class="cd-items" id="cartItems"></div>' +
      '<div class="cd-foot">' +
        '<div class="cd-promo">' +
          '<input id="cartPromo" type="text" placeholder="FOUNDING10" autocomplete="off" spellcheck="false" aria-label="Promo code">' +
          '<button id="cartPromoBtn"><span data-en>Apply</span><span data-de>Einlösen</span></button>' +
        '</div>' +
        '<div class="cd-msg" id="cartPromoMsg"></div>' +
        '<div class="cd-row sm"><span data-en>Subtotal</span><span data-de>Zwischensumme</span><span id="cartSub">€0</span></div>' +
        '<div class="cd-row sm" id="rowDisc" style="display:none"><span data-en>Discount</span><span data-de>Rabatt</span><span id="cartDisc" style="color:var(--gb)">−€0</span></div>' +
        '<div class="cd-row sm" id="rowShip" style="display:none"><span data-en>Shipping</span><span data-de>Versand</span><span id="cartShip">€0</span></div>' +
        '<div class="cd-row"><span data-en>Total</span><span data-de>Gesamt</span><b id="cartTotal">€0</b></div>' +
        '<div class="cd-hint" id="cartShipHint"></div>' +
        '<button class="cd-checkout" id="cartCheckout"><span data-en>Pre-order by email</span><span data-de>Per E-Mail vorbestellen</span></button>' +
        '<div class="cd-note"><span data-en>We reply within 24h with your payment link (PayPal · card · Klarna) and invoice. Direct checkout is coming.</span><span data-de>Antwort innerhalb 24h mit Zahlungslink (PayPal · Karte · Klarna) und Rechnung. Direkter Checkout folgt.</span></div>' +
      '</div>' +
    '</aside>';
  document.body.appendChild(root);

  var drawer = document.getElementById('cartDrawer'),
      scrim  = document.getElementById('cartScrim'),
      fab    = document.getElementById('cartFab'),
      badge  = document.getElementById('cartCount');

  function open(){ document.body.classList.add('cart-open'); }
  function close(){ document.body.classList.remove('cart-open'); }
  fab.addEventListener('click', function(){ document.body.classList.contains('cart-open') ? close() : open(); });
  scrim.addEventListener('click', close);
  document.getElementById('cartClose').addEventListener('click', close);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });

  function pulse(){
    fab.classList.remove('bump');
    void fab.offsetWidth;
    fab.classList.add('bump');
  }

  /* ── render ── */
  function edLabel(ed){
    var e = EDITIONS.find(function(x){ return x.id === ed; }) ||
            SIZES.find(function(x){ return x.id === ed; });
    return e ? t(e.en, e.de) : ed;
  }
  function render(){
    badge.textContent = count();
    badge.style.display = count() ? 'flex' : 'none';
    var box = document.getElementById('cartItems');
    if (!cart.length){
      box.innerHTML = '<div class="cd-empty">' + t('Your order is empty.<br>The library awaits.', 'Deine Bestellung ist leer.<br>Die Bibliothek wartet.') + '</div>';
    } else {
      box.innerHTML = cart.map(function(i, idx){
        var b = CATALOG[i.book]; if (!b) return '';
        return '<div class="cd-item">' +
          '<img src="' + b.img + '" alt="">' +
          '<div class="cd-mid">' +
            '<div class="cd-name">' + t(b.en, b.de) + '</div>' +
            '<div class="cd-ed">' + edLabel(i.ed) + ' · €' + b.prices[i.ed] + '</div>' +
            '<div class="cd-qty">' +
              '<button data-a="-" data-i="' + idx + '">−</button>' +
              '<span>' + i.qty + '</span>' +
              '<button data-a="+" data-i="' + idx + '">+</button>' +
            '</div>' +
          '</div>' +
          '<button class="cd-rm" data-a="x" data-i="' + idx + '" aria-label="Remove">×</button>' +
        '</div>';
      }).join('');
    }
    document.getElementById('cartSub').textContent = eur(total());
    var d = discount(), sh = shipping();
    var rd = document.getElementById('rowDisc'), rs = document.getElementById('rowShip');
    rd.style.display = d > 0 ? 'flex' : 'none';
    if (d > 0) document.getElementById('cartDisc').textContent = '−' + eur(d);
    rs.style.display = hasPhysical() && cart.length ? 'flex' : 'none';
    if (hasPhysical()) document.getElementById('cartShip').textContent =
      sh === 0 ? t('FREE', 'GRATIS') : eur(sh);
    document.getElementById('cartTotal').textContent = eur(grand());
    var hint = document.getElementById('cartShipHint');
    if (!cart.length) { hint.textContent = ''; }
    else if (hasPhysical() && sh > 0) {
      var miss = Math.max(0, SHIP_FREE_FROM - physTotal());
      hint.innerHTML = t('Add ' + eur(miss) + ' in printed editions for <b>free shipping</b>.',
                         'Noch ' + eur(miss) + ' an gedruckten Ausgaben bis zum <b>Gratisversand</b>.');
    } else if (hasPhysical()) {
      hint.innerHTML = t('You qualify for <b>free shipping</b>. ✦','Du hast <b>Gratisversand</b>. ✦');
    } else {
      hint.innerHTML = t('Digital only — no shipping. Delivered by email.','Nur digital — kein Versand. Lieferung per E-Mail.');
    }
  }
  document.getElementById('cartItems').addEventListener('click', function(e){
    var b = e.target.closest('button'); if (!b) return;
    var idx = +b.dataset.i, a = b.dataset.a, item = cart[idx];
    if (!item) return;
    if (a === '+') item.qty += 1;
    if (a === '-') { item.qty -= 1; if (item.qty < 1) cart.splice(idx, 1); }
    if (a === 'x') cart.splice(idx, 1);
    save(); render();
  });

  /* ── promo ── */
  function applyPromo(){
    var inp = document.getElementById('cartPromo');
    var msg = document.getElementById('cartPromoMsg');
    var v = (inp.value || '').trim().toUpperCase();
    if (!v){ promo=''; msg.textContent=''; }
    else if (PROMOS[v]){
      promo = v;
      msg.style.color = 'var(--gb)';
      msg.textContent = t('Code applied: −' + Math.round(PROMOS[v]*100) + '%','Code eingelöst: −' + Math.round(PROMOS[v]*100) + '%');
    } else {
      promo = '';
      msg.style.color = '#C96A4A';
      msg.textContent = t('Unknown code.','Unbekannter Code.');
    }
    try { localStorage.setItem('tp_promo', promo); } catch(_){}
    render();
  }
  document.getElementById('cartPromoBtn').addEventListener('click', applyPromo);
  document.getElementById('cartPromo').addEventListener('keydown', function(e){ if(e.key==='Enter') applyPromo(); });
  if (promo){ document.getElementById('cartPromo').value = promo; }

  /* ── checkout: pre-order mail ── */
  document.getElementById('cartCheckout').addEventListener('click', function(){
    if (!cart.length) return;
    var lines = cart.map(function(i){
      var b = CATALOG[i.book];
      return '- ' + t(b.en, b.de) + ' / ' + edLabel(i.ed) + ' × ' + i.qty + ' = €' + (b.prices[i.ed] * i.qty);
    });
    var sumL = [
      t('Subtotal: ','Zwischensumme: ') + eur(total()),
      discount() > 0 ? t('Discount (' + promo + '): −','Rabatt (' + promo + '): −') + eur(discount()) : null,
      hasPhysical() ? t('Shipping: ','Versand: ') + (shipping() === 0 ? t('free','gratis') : eur(shipping())) : null,
      t('TOTAL: ','GESAMT: ') + eur(grand())
    ].filter(Boolean).join('\n');
    var body = t(
      'Hello TruthPrints,\n\nI would like to pre-order:\n\n' + lines.join('\n') + '\n\n' + sumL +
      '\n\nMy shipping address:\n\nThank you!',
      'Hallo TruthPrints,\n\nich möchte vorbestellen:\n\n' + lines.join('\n') + '\n\n' + sumL +
      '\n\nMeine Lieferadresse:\n\nVielen Dank!'
    );
    location.href = 'mailto:hello.truthprints@gmail.com?subject=' +
      encodeURIComponent(t('Pre-Order — TruthPrints', 'Vorbestellung — TruthPrints')) +
      '&body=' + encodeURIComponent(body);
  });

  /* ── wire product cards: edition select + add ── */
  document.querySelectorAll('.prod').forEach(function(card){
    if (card.querySelector('.prod-buy')) return;   // already wired
    var book = null;
    var img = card.querySelector('.prod-cov img');
    if (!img) return;
    if (img) {
      var m = (img.getAttribute('src') || '').match(/books\/(\w+)-cover/);
      if (m) book = m[1];
    }
    if (!book || !CATALOG[book]) return;
    var b = CATALOG[book];
    var row = document.createElement('div');
    row.className = 'prod-buy';
    row.innerHTML =
      '<select class="prod-ed" aria-label="Edition">' +
        EDITIONS.map(function(e){
          return '<option value="' + e.id + '">' + t(e.en, e.de) + ' — €' + b.prices[e.id] + '</option>';
        }).join('') +
      '</select>' +
      '<button class="prod-add"><span data-en>Add to cart</span><span data-de>In den Warenkorb</span></button>';
    card.appendChild(row);
    row.querySelector('.prod-add').addEventListener('click', function(){
      add(book, row.querySelector('.prod-ed').value);
    });
  });

  /* wallart cards */
  document.querySelectorAll('.wa-card[data-wa]').forEach(function(card){
    var key = card.dataset.wa;
    if (!CATALOG[key]) return;
    card.querySelector('.wa-add')?.addEventListener('click', function(){
      add(key, card.querySelector('.wa-size').value);
    });
  });

  /* ── public API: lets shop.html register dynamic plate products + add to cart ── */
  window.tpCart = {
    add: add,
    register: function(key, obj){ if (!CATALOG[key]) CATALOG[key] = obj; },
    has: function(key){ return !!CATALOG[key]; }
  };

  /* re-label selects when the language switches */
  var mo = new MutationObserver(function(){
    document.querySelectorAll('.prod').forEach(function(card){
      var sel = card.querySelector('.prod-ed'); if (!sel) return;
      var img = card.querySelector('.prod-cov img');
      var m = (img.getAttribute('src') || '').match(/books\/(\w+)-cover/);
      if (!m || !CATALOG[m[1]]) return;
      var b = CATALOG[m[1]], val = sel.value;
      sel.innerHTML = EDITIONS.map(function(e){
        return '<option value="' + e.id + '">' + t(e.en, e.de) + ' — €' + b.prices[e.id] + '</option>';
      }).join('');
      sel.value = val;
    });
    render();
  });
  mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  render();
})();
