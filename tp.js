/* TruthPrints 2.0 — schlankes Site-Verhalten (Sprache, Nav, Reveals) */
(function () {
  "use strict";

  /* ---------- Sprache (DE/EN, persistiert, Browser-Detect) ---------- */
  var stored = null;
  try { stored = localStorage.getItem("tp-lang"); } catch (e) {}
  var lang = stored || ((navigator.language || "en").toLowerCase().indexOf("de") === 0 ? "de" : "en");

  function applyLang(l) {
    lang = l;
    document.documentElement.setAttribute("data-lang", l);
    document.documentElement.lang = l;
    try { localStorage.setItem("tp-lang", l); } catch (e) {}
    document.querySelectorAll(".tp-lang .lc").forEach(function (el) {
      el.classList.toggle("on", el.getAttribute("data-lc") === l);
    });
    /* Gratis-Links sprachabhängig: DE → gratis/, EN → free/ */
    document.querySelectorAll("[data-free-link]").forEach(function (a) {
      a.href = a.href.replace(/(free|gratis)\/?$/, l === "de" ? "gratis/" : "free/");
    });
  }
  applyLang(lang);

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(lang); /* nochmal, jetzt mit gerendertem Nav */

    var langBtn = document.getElementById("tpLang");
    if (langBtn) langBtn.addEventListener("click", function () {
      applyLang(lang === "de" ? "en" : "de");
    });

    /* ---------- Nav: Hintergrund beim Scrollen ---------- */
    var nav = document.getElementById("tpNav");
    function onScroll() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 24); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---------- Mobile Menü ---------- */
    var burger = document.getElementById("tpBurger");
    var mnav = document.getElementById("tpMnav");
    if (burger && mnav) {
      burger.addEventListener("click", function () {
        var open = mnav.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
      mnav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mnav.classList.remove("open");
          burger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && mnav.classList.contains("open")) burger.click();
      });
    }

    /* ---------- Aktuelle Seite in der Nav markieren ---------- */
    var path = location.pathname.replace(/index\.html$/, "");
    document.querySelectorAll(".tp-links a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href && path.indexOf(href.replace(/^(\.\.\/)+/, "").replace(/index\.html$/, "")) !== -1 && href !== "index.html") {
        a.setAttribute("aria-current", "page");
      }
    });

    /* ---------- Scroll-Reveals (IntersectionObserver) ---------- */
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    }

    /* ---------- Atmosphäre: Kerzen-Cursor + Gold-Glow + Fackel ----------
       Portiert von der alten Seite. Nur Desktop (hover+fine), nur auf Seiten
       mit den #cur/#torch-Elementen. Der Glow ruht auf dem Haupt des Herrn. */
    var cur = document.getElementById("cur");
    var curglow = document.getElementById("curglow");
    var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (cur && fine && !reduced) {
      document.body.classList.add("tp-atmo");
      var gx = innerWidth / 2, gy = innerHeight * 0.3, tgx = gx, tgy = gy, graf = 0, homing = true;
      var rate = function () { return homing ? 0.05 : 0.16; };
      function gloop() {
        gx += (tgx - gx) * rate(); gy += (tgy - gy) * rate();
        if (curglow) curglow.style.transform = "translate(" + gx + "px," + gy + "px)";
        if (Math.abs(tgx - gx) > 0.4 || Math.abs(tgy - gy) > 0.4) graf = requestAnimationFrame(gloop); else graf = 0;
      }
      function kick() { if (!graf) graf = requestAnimationFrame(gloop); }
      /* Ruhepunkt: Kopf des Herrn im Hero (Bild 2560x1428, cover, center 35%) */
      function headPoint() {
        var hero = document.getElementById("hero"); if (!hero) return null;
        var r = hero.getBoundingClientRect();
        if (r.bottom < 40) return null;
        var iw = 2560, ih = 1428;
        var sc = Math.max(r.width / iw, r.height / ih);
        var dw = iw * sc, dh = ih * sc;
        var ox = r.left + (r.width - dw) / 2;
        var oy = r.top + (r.height - dh) * 0.35;
        return { x: ox + 0.515 * dw, y: oy + 0.305 * dh };
      }
      document.addEventListener("mousemove", function (e) {
        cur.style.left = e.clientX + "px"; cur.style.top = e.clientY + "px"; cur.classList.add("vis");
        homing = false; tgx = e.clientX; tgy = e.clientY;
        if (curglow) curglow.classList.add("vis");
        kick();
      });
      document.addEventListener("mouseleave", function () {
        cur.classList.remove("vis");
        var hp = headPoint();
        if (curglow && hp) { homing = true; tgx = hp.x; tgy = hp.y; curglow.classList.add("vis"); kick(); }
      });
      document.addEventListener("mousedown", function () { cur.classList.add("p"); });
      document.addEventListener("mouseup", function () { cur.classList.remove("p"); });
      var bindCur = function () {
        document.querySelectorAll("a,button,.way,.prod,.bundle").forEach(function (el) {
          if (el._cb) return; el._cb = 1;
          el.addEventListener("mouseenter", function () { cur.classList.add("h"); });
          el.addEventListener("mouseleave", function () { cur.classList.remove("h"); });
        });
      };
      bindCur();
      new MutationObserver(bindCur).observe(document.body, { childList: true, subtree: true });
      function restGlow() {
        var hp = headPoint();
        if (curglow && hp) { gx = tgx = hp.x; gy = tgy = hp.y; curglow.style.transform = "translate(" + gx + "px," + gy + "px)"; curglow.classList.add("vis"); }
      }
      requestAnimationFrame(restGlow);
      window.addEventListener("load", function () { requestAnimationFrame(restGlow); });
      window.addEventListener("resize", function () { if (homing) restGlow(); });
    }

    /* ---------- Fackel-Spotlight im Hero ---------- */
    (function () {
      var hero = document.getElementById("hero"), c = document.getElementById("torch");
      if (!hero || !c || reduced) { if (c) c.remove(); return; }
      var tx = 0.515, ty = 0.305, ax = 0.515, ay = 0.305, flick = 0;
      var ctx = c.getContext("2d");
      function resize() { c.width = hero.offsetWidth; c.height = hero.offsetHeight; }
      resize(); window.addEventListener("resize", resize);
      hero.addEventListener("mousemove", function (e) {
        var r = hero.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width; ty = (e.clientY - r.top) / r.height;
      });
      hero.addEventListener("mouseleave", function () { tx = 0.515; ty = 0.305; });
      function draw() {
        ax += (tx - ax) * 0.055; ay += (ty - ay) * 0.055; flick += 0.08;
        var w = c.width, h = c.height, x = ax * w, y = ay * h;
        var R = Math.min(w, h) * (0.28 + Math.sin(flick) * 0.006 + Math.sin(flick * 2.3) * 0.004);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "rgba(10,7,5,0.56)"; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "destination-out";
        var spot = ctx.createRadialGradient(x, y, 0, x, y, R);
        spot.addColorStop(0, "rgba(0,0,0,0.86)"); spot.addColorStop(0.42, "rgba(0,0,0,0.48)");
        spot.addColorStop(0.78, "rgba(0,0,0,0.08)"); spot.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = spot; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
        var warm = ctx.createRadialGradient(x, y, 0, x, y, R * 0.5);
        warm.addColorStop(0, "rgba(198,148,52," + (0.2 + Math.sin(flick) * 0.03) + ")");
        warm.addColorStop(1, "rgba(198,148,52,0)");
        ctx.fillStyle = warm; ctx.fillRect(0, 0, w, h);
        requestAnimationFrame(draw);
      }
      draw();
    })();

    /* ---------- Gratis-CTA: E-Mail an Landing weiterreichen ---------- */
    var ctaForm = document.getElementById("ctaFree");
    if (ctaForm) ctaForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (ctaForm.querySelector("input[type=email]") || {}).value || "";
      var base = lang === "de" ? "gratis/" : "free/";
      location.href = base + (email ? "?email=" + encodeURIComponent(email) : "");
    });
  });
})();
