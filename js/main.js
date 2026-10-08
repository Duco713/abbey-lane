/* Abbey Lane – interactie */
(function () {
  'use strict';

  // ---- Formulier-instelling ------------------------------------------------
  // Laat leeg om aanvragen via het mailprogramma van de bezoeker te versturen.
  // Vul een Formspree/Web3Forms endpoint in (bv. 'https://formspree.io/f/xxxxxx')
  // om aanvragen direct vanaf de site te laten binnenkomen.
  var FORM_ENDPOINT = '';
  var STUDIO_EMAIL = 'interieuradvies@abbeylane.nl';

  // ---- Kleurthema: licht / roze --------------------------------------------
  var root = document.documentElement;
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var THEME_BG = { licht: '#FDFBF8', roze: '#F8ECE7' };
  var animTimer;

  function setTheme(theme, animate) {
    if (animate) {
      root.classList.add('theme-anim');
      clearTimeout(animTimer);
      animTimer = setTimeout(function () { root.classList.remove('theme-anim'); }, 600);
    }
    root.dataset.theme = theme;
    themeMeta.setAttribute('content', THEME_BG[theme]);
    document.querySelectorAll('[data-theme-option]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeOption === theme));
    });
    try { localStorage.setItem('al-theme', theme); } catch (e) {}
  }
  document.querySelectorAll('[data-theme-option]').forEach(function (btn) {
    btn.addEventListener('click', function () { setTheme(btn.dataset.themeOption, true); });
  });
  setTheme(root.dataset.theme || 'licht', false);

  // ---- Mobiel menu ---------------------------------------------------------
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.getElementById('menu-open');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector('[data-menu-close]').focus({ preventScroll: true });
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  menu.querySelectorAll('[data-menu-close]').forEach(function (el) {
    el.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); openBtn.focus(); }
  });

  // ---- Actieve navigatie bij scrollen --------------------------------------
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.map.call(navLinks, function (a) {
    var href = a.getAttribute('href');
    return href.charAt(0) === '#' ? document.querySelector(href) : null;
  }).filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          var active = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('text-primary', active);
          a.classList.toggle('underline', active);
          a.classList.toggle('text-on-surface-variant', !active);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  }

  // ---- Hotspots: tikken op touch-apparaten ---------------------------------
  var hotspots = document.querySelectorAll('.hotspot');
  hotspots.forEach(function (spot) {
    spot.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = spot.classList.contains('is-open');
      hotspots.forEach(function (s) { s.classList.remove('is-open'); });
      if (!wasOpen) spot.classList.add('is-open');
    });
  });
  document.addEventListener('click', function () {
    hotspots.forEach(function (s) { s.classList.remove('is-open'); });
  });

  // ---- Portfolio filter ----------------------------------------------------
  var chips = document.querySelectorAll('.filter-chip');
  var projects = document.querySelectorAll('.project');
  var chipOn = ['bg-primary', 'text-canvas-cream'];
  var chipOff = ['bg-surface-container', 'text-on-surface-variant', 'hover:text-primary', 'hover:bg-surface-taupe'];

  function applyFilter(filter) {
    chips.forEach(function (chip) {
      var on = chip.dataset.filter === filter;
      chip.setAttribute('aria-pressed', String(on));
      chipOn.forEach(function (c) { chip.classList.toggle(c, on); });
      chipOff.forEach(function (c) { chip.classList.toggle(c, !on); });
    });
    var visible = 0;
    projects.forEach(function (p) {
      var show = filter === 'alle' || p.dataset.category === filter;
      p.classList.toggle('is-hidden', !show);
      // Enkel zichtbaar project: volle breedte
      p.classList.toggle('lg:col-span-12', false);
      if (show) visible++;
    });
    if (visible === 1) {
      projects.forEach(function (p) { if (!p.classList.contains('is-hidden')) p.classList.add('lg:col-span-12'); });
    }
  }
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () { applyFilter(chip.dataset.filter); });
  });
  if (chips.length) applyFilter('alle');

  // ---- Knoppen die een dienst vooraf selecteren ----------------------------
  var dienst = document.getElementById('dienst');
  document.querySelectorAll('[data-service]').forEach(function (el) {
    el.addEventListener('click', function () { if (dienst) dienst.value = el.dataset.service; });
  });

  // ---- Aanvraagformulier (alleen op de homepage) ---------------------------
  var form = document.getElementById('consultation-form');
  if (form) initForm();
  function initForm() {
  var feedback = document.getElementById('form-feedback');
  var feedbackText = document.getElementById('form-feedback-text');
  var errorEl = document.getElementById('form-error');
  var submitBtn = form.querySelector('button[type="submit"]');
  var btnLabel = submitBtn.querySelector('.btn-label');
  var btnText = btnLabel.textContent;

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }

  function showSuccess(msg) {
    feedbackText.textContent = msg;
    feedback.classList.remove('hidden');
    feedback.classList.add('flex');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.classList.add('hidden');
    feedback.classList.add('hidden');
    feedback.classList.remove('flex');

    if (!form.checkValidity()) {
      var invalid = form.querySelector(':invalid');
      var label = invalid && form.querySelector('label[for="' + invalid.id + '"]');
      showError('Controleer het veld “' + (label ? label.textContent.replace(' *', '') : 'formulier') + '”.');
      if (invalid) invalid.focus();
      return;
    }
    if (form._gotcha.value) return; // spam-bot

    var data = {
      naam: form.naam.value.trim(),
      telefoon: form.telefoon.value.trim(),
      email: form.email.value.trim(),
      woonplaats: form.woonplaats.value.trim(),
      dienst: dienst.options[dienst.selectedIndex].text,
      opmerking: form.opmerking.value.trim()
    };

    if (FORM_ENDPOINT) {
      submitBtn.disabled = true;
      btnLabel.textContent = 'Bezig met versturen…';
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.assign({ _subject: 'Aanvraag interieuradvies – ' + data.naam }, data))
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        showSuccess('Hartelijk dank voor uw aanvraag. Het Abbey Lane team neemt zo snel mogelijk contact met u op.');
      }).catch(function () {
        showError('Versturen is niet gelukt. Mail ons gerust direct via ' + STUDIO_EMAIL + ' of bel 040-8429365.');
      }).finally(function () {
        submitBtn.disabled = false;
        btnLabel.textContent = btnText;
      });
      return;
    }

    // Fallback: open het mailprogramma met een ingevulde aanvraag
    var body = [
      'Naam: ' + data.naam,
      'Telefoon: ' + data.telefoon,
      'E-mail: ' + data.email,
      'Woonplaats: ' + data.woonplaats,
      'Dienst: ' + data.dienst,
      '',
      'Wensen:',
      data.opmerking || '-'
    ].join('\n');
    window.location.href = 'mailto:' + STUDIO_EMAIL +
      '?subject=' + encodeURIComponent('Aanvraag interieuradvies – ' + data.naam) +
      '&body=' + encodeURIComponent(body);
    showSuccess('Uw mailprogramma wordt geopend met uw aanvraag. Verstuur de e-mail om de aanvraag af te ronden.');
  });
  }

  // ---- Openingstijden: vandaag uitlichten ----------------------------------
  var today = document.querySelector('.opening-hours [data-day="' + new Date().getDay() + '"]');
  if (today) {
    today.classList.add('bg-canvas-cream/10', 'text-canvas-cream', 'font-semibold');
    today.firstElementChild.textContent += ' (vandaag)';
  }

  // ---- Jaartal footer -------------------------------------------------------
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
