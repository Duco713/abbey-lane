/* Abbey Lane – portfolio: filter & lightbox */
(function () {
  'use strict';

  // ---- Filter --------------------------------------------------------------
  var buttons = document.querySelectorAll('.pf-filter');
  var items = Array.prototype.slice.call(document.querySelectorAll('.pf-item'));

  function applyFilter(filter) {
    buttons.forEach(function (b) {
      var on = b.dataset.filter === filter;
      b.setAttribute('aria-pressed', String(on));
      b.classList.toggle('bg-espresso-deep', on);
      b.classList.toggle('text-canvas-cream', on);
      b.classList.toggle('bg-surface-plaster', !on);
      b.classList.toggle('text-on-surface', !on);
    });
    items.forEach(function (item) {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.dataset.filter); });
  });
  applyFilter('all');

  // ---- Lightbox --------------------------------------------------------------
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');
  var lbCap = document.getElementById('lb-caption');
  var lbCat = document.getElementById('lb-cat');
  var lbCount = document.getElementById('lb-count');
  var current = 0;
  var list = [];
  var lastFocus = null;

  function visibleItems() {
    return items.filter(function (i) { return !i.classList.contains('hidden'); });
  }

  function show(index) {
    current = (index + list.length) % list.length;
    var item = list[current];
    var img = item.querySelector('img');
    var label = item.querySelector('.font-label-caps');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = img.alt;
    lbCat.textContent = label ? label.textContent : '';
    lbCount.textContent = (current + 1) + ' / ' + list.length;
  }

  function open(photoId) {
    list = visibleItems();
    var idx = list.findIndex(function (i) { return i.querySelector('[data-photo="' + photoId + '"]'); });
    if (idx < 0) { list = items; idx = items.findIndex(function (i) { return i.querySelector('[data-photo="' + photoId + '"]'); }); }
    lastFocus = document.activeElement;
    show(Math.max(idx, 0));
    lb.classList.remove('hidden');
    lb.classList.add('flex');
    document.body.style.overflow = 'hidden';
    lb.querySelector('[data-lb-close]').focus();
  }

  function close() {
    lb.classList.add('hidden');
    lb.classList.remove('flex');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-photo]').forEach(function (el) {
    el.addEventListener('click', function () { open(el.dataset.photo); });
  });
  lb.querySelector('[data-lb-close]').addEventListener('click', close);
  lb.querySelector('[data-lb-prev]').addEventListener('click', function () { show(current - 1); });
  lb.querySelector('[data-lb-next]').addEventListener('click', function () { show(current + 1); });
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.parentElement === lb && e.target.tagName === 'P') close();
  });
  document.addEventListener('keydown', function (e) {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Vegen op mobiel
  var startX = null;
  lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
