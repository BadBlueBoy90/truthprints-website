/* TruthPrints — museum walk: the plates gallery pins while plates glide
   horizontally past, driven by scroll. Desktop only; carousel stays on mobile. */
(function(){
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var sec    = document.getElementById('plates');
  var track  = document.getElementById('gtrack');
  var wrap   = sec ? sec.querySelector('.wrap') : null;
  if (!sec || !track || !wrap) return;

  var active = false, maxX = 0, secTop = 0, span = 1;

  function desktop(){ return window.innerWidth > 940; }

  function measure(){
    if (!desktop()){ teardown(); return; }
    /* natural track width minus visible viewport of the gallery */
    var vp = document.getElementById('gvp');
    var total = track.scrollWidth;
    var vis = vp ? vp.clientWidth : window.innerWidth;
    maxX = Math.max(0, total - vis);
    if (maxX < 60){ teardown(); return; }       /* nothing to walk through */
    span = maxX * 1.15;                          /* scroll distance for the walk */
    sec.classList.add('museum');
    sec.style.height = (window.innerHeight + span) + 'px';
    active = true;
    var r = sec.getBoundingClientRect();
    secTop = r.top + window.scrollY;
    onScroll();
  }

  function teardown(){
    if (!active && !sec.classList.contains('museum')) return;
    sec.classList.remove('museum');
    sec.style.height = '';
    track.style.transform = '';
    active = false;
  }

  function onScroll(){
    if (!active) return;
    var p = (window.scrollY - secTop) / span;
    p = Math.max(0, Math.min(1, p));
    /* gentle ease at the edges so the walk starts and ends softly */
    var e = p < .04 ? p * p / .04 : p > .96 ? 1 - (1 - p) * (1 - p) / .04 : p;
    track.style.transform = 'translateX(' + (-e * maxX).toFixed(1) + 'px)';
    /* progress line + counter reuse */
    var tf = document.getElementById('gtf');
    if (tf) tf.style.width = (p * 100).toFixed(1) + '%';
  }

  var tick = false;
  addEventListener('scroll', function(){
    if (tick) return; tick = true;
    requestAnimationFrame(function(){ tick = false; onScroll(); });
  }, { passive: true });

  addEventListener('resize', function(){ clearTimeout(window.__mzr); window.__mzr = setTimeout(measure, 220); });

  /* re-measure when the plate set changes (book tabs / language switch) */
  new MutationObserver(function(){ clearTimeout(window.__mzm); window.__mzm = setTimeout(measure, 350); })
    .observe(track, { childList: true });

  /* first measure after images shaped the track */
  if (document.readyState === 'complete') setTimeout(measure, 400);
  else addEventListener('load', function(){ setTimeout(measure, 400); });
})();
