/* Abbey Lane – animaties (scroll, hero, parallax, header, hover, libel, score) */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var header = document.querySelector('header');

  // ---- 5. Header: compacter bij naar beneden scrollen ------------------------
  // (ook bij 'minder beweging', dan alleen zonder overgang)
  var lastY = window.scrollY;
  function setHeaderVar() { root.style.setProperty('--header-h', header.offsetHeight + 'px'); }
  function onScrollHeader() {
    var y = window.scrollY;
    var compact = header.classList.contains('is-compact');
    if (y < 120) compact = false;            // bovenaan: altijd volledig
    else if (y > lastY + 2) compact = true;  // naar beneden: compact
    else if (y < lastY - 4) compact = false; // naar boven: weer volledig
    if (compact !== header.classList.contains('is-compact')) {
      header.classList.toggle('is-compact', compact);
      setTimeout(setHeaderVar, 360);
    }
    lastY = y;
  }
  document.querySelectorAll('section.sticky').forEach(function (s) { s.classList.add('sticky-under-header'); });
  setHeaderVar();
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  window.addEventListener('resize', setHeaderVar);

  // ---- 6. Hover-klassen (ook zonder animatie-voorkeur prima) ----------------
  document.querySelectorAll('main a.font-semibold:not(.rounded-full), footer li a, footer .mt-space-2xl a').forEach(function (a) { a.classList.add('link-line'); });
  document.querySelectorAll('#reviews figure, #diensten-advies .group.rounded, #over-ons .grid > div, #merken .grid > div, #maatwerk-banken .grid > div, .pf-item > button').forEach(function (el) { el.classList.add('lift'); });

  if (reduce || !('IntersectionObserver' in window)) return;
  root.classList.add('anim');

  // Elementen worden zichtbaar zodra hun bovenkant in beeld komt. Een eigen
  // controle bij scrollen zorgt dat er nooit iets onzichtbaar blijft staan.
  var pending = [];
  function show(el) {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
    if (el._onShow) { el._onShow(); return; }
    // Na de animatie de klassen opruimen, zodat hover-effecten weer gewoon werken
    setTimeout(function () {
      if (el.classList.contains('dragonfly')) return;
      el.classList.remove('reveal', 'reveal-img', 'is-in'); el.style.removeProperty('--d');
    }, 1600 + (parseInt(el.style.getPropertyValue('--d')) || 0));
  }
  var io = {
    observe: function (el) { pending.push(el); },
    unobserve: function () {}
  };
  function check() {
    var vh = window.innerHeight;
    pending = pending.filter(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return true;           // (nog) verborgen, bv. gefilterd
      if (r.top < vh * 0.92) { show(el); return false; }          // in beeld of al voorbij gescrold
      return true;
    });
  }
  var lastCheck = 0, trailing;
  function onScrollCheck() {
    var now = Date.now();
    clearTimeout(trailing);
    if (now - lastCheck > 60) { lastCheck = now; check(); }
    trailing = setTimeout(check, 120);
  }
  window.addEventListener('scroll', onScrollCheck, { passive: true });
  window.addEventListener('resize', onScrollCheck);
  document.addEventListener('click', function () { setTimeout(check, 50); }); // bv. na filteren

  // ---- 2. Hero: tekst na elkaar en een langzaam uitzoomende foto ------------
  var heroImg = document.querySelector('main img[fetchpriority="high"]');
  var heroSection = heroImg ? heroImg.closest('section') : null;
  if (heroSection) {
    heroImg.classList.add('ken-burns');
    var heroText = heroSection.querySelector('.relative.z-10');
    if (heroText) Array.prototype.forEach.call(heroText.children, function (c, i) {
      c.classList.add('hero-in'); c.style.setProperty('--d', (200 + i * 140) + 'ms');
    });
  }

  // ---- 3. Grote foto's: gordijn-onthulling -----------------------------------
  var imgBoxes = [];
  document.querySelectorAll('main section .overflow-hidden').forEach(function (box) {
    if (heroSection && heroSection.contains(box)) return;
    if (box.closest('.hotspot, header, footer') || box.offsetHeight < 220) return;
    if (!box.querySelector('img, [role="img"], [style*="background-image"]')) return;
    if (imgBoxes.some(function (b) { return b.contains(box) || box.contains(b); })) return;
    imgBoxes.push(box);
  });
  imgBoxes.forEach(function (box) { box.classList.add('reveal-img'); io.observe(box); });

  // ---- 1. Overige inhoud: zacht invliegen, rijen kort na elkaar -------------
  var sel = 'h1, h2, h3, h4, p, blockquote, ul, form, figure, article, .grid > *, .rounded, .rounded-lg, a.group, span.font-label-caps';
  var chosen = [];
  document.querySelectorAll('main section').forEach(function (sec) {
    if (sec === heroSection || sec.classList.contains('sticky')) return;
    sec.querySelectorAll(sel).forEach(function (el) {
      if (el.closest('.hotspot') || el.closest('.reveal-img') && el !== el.closest('.reveal-img')) return;
      if (chosen.some(function (c) { return c.contains(el); })) return;
      if (getComputedStyle(el).transform !== 'none' || el.offsetParent === null && !el.closest('.pf-item')) return;
      chosen.push(el);
    });
  });
  chosen.forEach(function (el) {
    if (el.classList.contains('reveal-img')) return;
    var parent = el.parentElement;
    if (parent && (parent.classList.contains('grid') || /\bflex\b/.test(parent.className))) {
      var idx = Array.prototype.indexOf.call(parent.children, el);
      el.style.setProperty('--d', Math.min(idx, 6) * 110 + 'ms');
    }
    el.classList.add('reveal');
    io.observe(el);
  });

  check();
  window.addEventListener('load', check);
  document.addEventListener('visibilitychange', check);

  // ---- 4. Parallax op een paar rustige foto's (zonder hotspots) -------------
  var px = [];
  if (heroImg) px.push({ el: heroImg, speed: 0.12, scale: 1.08 });
  document.querySelectorAll('#maatwerk-banken img, #reviews .lg\\:col-span-5 img').forEach(function (img) {
    img.style.scale = '1.12'; px.push({ el: img, speed: 0.08, scale: 1.12 });
  });
  px.forEach(function (p) { p.el.classList.add('parallax'); });
  var ticking = false;
  function parallax() {
    var vh = window.innerHeight;
    px.forEach(function (p) {
      var r = p.el.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var room = (p.scale - 1) / 2 * r.height - 2;
      var offset = Math.max(-room, Math.min(room, (r.top + r.height / 2 - vh / 2) * -p.speed));
      p.el.style.translate = '0 ' + offset.toFixed(1) + 'px';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  parallax();

  // ---- 7. Libel in de footer ---------------------------------------------------
  var fly = document.querySelector('footer img[src*="dragonfly"]');
  if (fly) { fly.classList.add('dragonfly'); io.observe(fly); }

  // ---- 8. Google-score telt op, sterren vullen zich --------------------------
  var score = document.querySelector('#reviews a[aria-label*="4,5"]');
  if (score) {
    var num = score.querySelector('.font-serif');
    var stars = score.querySelectorAll('div .material-symbols-outlined');
    var target = parseFloat(num.textContent.replace(',', '.'));
    stars.forEach(function (s, i) { s.classList.add('star-pop'); s.style.setProperty('--d', (300 + i * 140) + 'ms'); });
    score._onShow = function () {
      stars.forEach(function (s) { s.classList.add('is-in'); });
      var start = Date.now();
      (function step() {
        var k = Math.min((Date.now() - start) / 1400, 1);
        var eased = 1 - Math.pow(1 - k, 3);
        num.textContent = (target * eased).toFixed(1).replace('.', ',');
        if (k < 1) setTimeout(step, 16);
      })();
    };
    io.observe(score);
    num.textContent = '0,0';
    check();
  }
})();
