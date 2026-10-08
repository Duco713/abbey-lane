/* Abbey Lane – portfolio: filter & projectdetails */
(function () {
  'use strict';

  var IMG = 'images/portfolio/';
  var projects = {
    'villa-valkenswaard': {
      title: 'Villa Valkenswaard — Rust & Tactiele Diepte',
      category: 'Totaalinrichting',
      location: 'Valkenswaard • 2024',
      image: 'villa-valkenswaard.jpg',
      brief: 'Een ruimtelijke transformatie van een nieuwbouwwoning naar een tactiel leefhuis. Kille witte stucmuren maakten plaats voor Mia Colore kalkverf, royale bouclé bekleding en gerookt eiken kastenwerk.',
      swatches: [
        { name: 'Mia Colore Grigio Caldo', color: '#D5C8B5', type: 'Kalkverf wand' },
        { name: 'Wol-bouclé Pebble', color: '#EDE6D8', type: 'Bankbekleding' },
        { name: 'Gerookt Europees eiken', color: '#5A4632', type: 'Kastenwerk' },
        { name: 'Arte Les Thermes Terracotta', color: '#B97155', type: 'Wandbekleding' }
      ],
      quote: '“Abbey Lane begreep precies wat we zochten. Ons huis voelt warm, geborgen en toch adembenemend ruimtelijk.” — Fam. Van de Ven'
    },
    'herenhuis-valkenswaard': {
      title: 'Herenhuis Valkenswaard',
      category: 'Totaalinrichting',
      location: 'Valkenswaard • 2024',
      image: 'herenhuis-valkenswaard.jpg',
      brief: 'Volledige herindeling van een statig herenhuis. Behoud van historische stijlelementen, verrijkt met diepe velours tinten, sfeervolle verlichting en een eiken eettafel voor tien personen.',
      swatches: [
        { name: 'Forest Velvet Mos', color: '#44513E', type: 'Zitmeubilair' },
        { name: 'Oud Hollands Wit', color: '#FAF7F0', type: 'Plafondlijsten' },
        { name: 'Donker gebeitst notenhout', color: '#3A281E', type: 'Eettafel' },
        { name: 'Messing patina', color: '#C5A059', type: 'Armaturen' }
      ],
      quote: '“De balans tussen historie en modern comfort is meesterlijk getroffen door het Abbey Lane team.” — Dhr. B. Louwers'
    },
    'loft-brabant': {
      title: 'Loft Brabant — Oisterwijk',
      category: 'Kleur- & Materiaaladvies',
      location: 'Oisterwijk • 2024',
      image: 'loft-brabant.jpg',
      brief: 'Een voormalig industrieel atelier getransformeerd tot warme woonloft. Het kleurconcept brengt evenwicht tussen harde bakstenen constructies en warme wolstoffen in aardetinten.',
      swatches: [
        { name: 'Havermout wol', color: '#E4DCB9', type: 'Vloerkleed' },
        { name: 'Gebakken terracotta', color: '#A8583B', type: 'Accentwand' },
        { name: 'Geolied walnoot', color: '#4D3627', type: 'Kasten' }
      ],
      quote: '“Geen kille industriële uitstraling meer, maar een warme cocon vol sfeer.” — K. Verhoeven'
    },
    'stadswoning-eindhoven': {
      title: 'Stadswoning Eindhoven',
      category: 'Eigen Label',
      location: 'Eindhoven • 2024',
      image: 'stadswoning-eindhoven.jpg',
      brief: 'Een hoekbank uit ons eigen label, samengesteld in maat, stof en kleur: warme terracottastof, afgestemd op de afmetingen van een compacte stadswoning in het centrum van Eindhoven.',
      swatches: [
        { name: 'Terracotta geweven chenille', color: '#BD6547', type: 'Bankstof' },
        { name: 'Travertijn classic', color: '#E2D9C8', type: 'Salontafel' },
        { name: 'Zacht linnen zand', color: '#EBE4D5', type: 'Kussens' }
      ],
      quote: '“De bank zit fantastisch en maakt de hele woonkamer direct af qua kleur en schaal.” — S. Jansen'
    },
    'landhuis-westerhoven': {
      title: 'Landhuis Westerhoven',
      category: 'Totaalinrichting',
      location: 'Westerhoven • 2023',
      image: 'landhuis-westerhoven.jpg',
      brief: 'Totaalconcept voor een vrijstaand landhuis. Ruwe kalkstenen schouw, zichtbare houten gebinten en royale raampartijen omlijst met gordijnen in puur linnen.',
      swatches: [
        { name: 'Puur linnen', color: '#DFD8C7', type: 'Gordijnen' },
        { name: 'Frans kalksteen', color: '#D8CDBA', type: 'Open haard' },
        { name: 'Rustiek eiken', color: '#684F39', type: 'Balklaag' }
      ],
      quote: '“Het uitzicht naar buiten en de rust binnen lopen naadloos in elkaar over dankzij het interieuradvies.” — M. van Gestel'
    },
    'penthouse-strijp-s': {
      title: 'Penthouse Strijp-S',
      category: 'Styling aan Huis',
      location: 'Eindhoven • 2024',
      image: 'penthouse-strijp-s.jpg',
      brief: 'Verfijnde styling met items uit onze winkelcollectie: organische keramiek van HKliving, sculpturale salontafels van travertijn en Japanse papieren lichtsculpturen.',
      swatches: [
        { name: 'Naturel travertijn', color: '#E8E1CE', type: 'Salontafel' },
        { name: 'Washi rijstpapier', color: '#F9F5EB', type: 'Hanglamp' },
        { name: 'Mat zwart staal', color: '#2B2B2B', type: 'Detailwerk' }
      ],
      quote: '“De juiste accessoires en styling brachten rust en ziel in ons moderne nieuwbouwappartement.” — L. de Graaf'
    },
    'boutique-apartment-vught': {
      title: 'Appartement Vught',
      category: 'Styling aan Huis',
      location: 'Vught • 2024',
      image: 'boutique-apartment-vught.jpg',
      brief: 'Sfeervolle styling van een compact appartement met een royale boekenkastwand, rotan fauteuils met webbing en aardse kalktinten op het plafond.',
      swatches: [
        { name: 'Olijfgroen vergrijsd', color: '#737861', type: 'Boekenkast' },
        { name: 'Naturel rotan webbing', color: '#D3BF9B', type: 'Fauteuil' },
        { name: 'Krijt zand', color: '#EFE9DC', type: 'Wanden' }
      ],
      quote: '“Elke hoek van onze woning voelt nu als een boutique hotel suite.” — E. Driessen'
    },
    'pastorie-de-kempen': {
      title: 'Pastorie De Kempen',
      category: 'Kleur- & Materiaaladvies',
      location: 'Bergeijk • 2023',
      image: 'pastorie-de-kempen.jpg',
      brief: 'Kleurplan op basis van de kalkverven van Mia Colore in een monumentale voormalige pastorie. Zachte kleurovergangen tussen vestibule, salon en eetkamer.',
      swatches: [
        { name: 'Mia Colore Calce Naturale', color: '#EBE5D8', type: 'Salonwanden' },
        { name: 'Mia Colore Cotto', color: '#A66652', type: 'Eetkamer accenten' },
        { name: 'Gerestaureerd grenen', color: '#B38B61', type: 'Parket' }
      ],
      quote: '“De authentieke sfeer van de pastorie is behouden, maar voelt nu fris en behaaglijk.”'
    },
    'villa-son-en-breugel': {
      title: 'Villa Son en Breugel',
      category: 'Totaalinrichting',
      location: 'Son • 2024',
      image: 'villa-son-en-breugel.jpg',
      brief: 'Interieuradvies voor een riante leefkeuken en salon. Een centraal donker eiken eiland vormt het hart van de woning, met warme houten wandpanelen.',
      swatches: [
        { name: 'Gezoet travertijn', color: '#DACFB9', type: 'Keukenblad' },
        { name: 'Geribbeld donker eiken', color: '#443226', type: 'Kookeiland' },
        { name: 'Zacht woltapijt', color: '#EAE5D9', type: 'Zithoek' }
      ],
      quote: '“Zowel koken als ontspannen voelt in deze ruimte als een dagelijkse luxe.” — Fam. Snijders'
    }
  };

  // ---- Filter --------------------------------------------------------------
  var buttons = document.querySelectorAll('.pf-filter');
  var items = document.querySelectorAll('.pf-item');

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
      var show = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !show);
      // 'Alle': het eigen redactionele raster; bij een filter: twee gelijke kolommen
      var span = filter === 'all' ? item.dataset.span : 'md:col-span-6';
      item.className = item.className.replace(/\bmd:col-span-\d+\b/g, '').trim() + ' ' + span;
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyFilter(b.dataset.filter); });
  });
  applyFilter('all');

  // ---- Projectdetails (modal) ----------------------------------------------
  var modal = document.getElementById('project-modal');
  var content = document.getElementById('project-modal-content');
  var lastFocus = null;

  function esc(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function openProject(id) {
    var d = projects[id];
    if (!d) return;
    lastFocus = document.activeElement;
    var swatches = d.swatches.map(function (s) {
      return '<div class="flex items-center gap-space-xs p-2 bg-surface-plaster rounded-md">' +
        '<span class="w-7 h-7 rounded-full shadow-inner shrink-0 ring-1 ring-black/5" style="background-color:' + s.color + '"></span>' +
        '<div class="flex flex-col leading-tight"><span class="text-[12px] font-medium text-espresso-deep">' + esc(s.name) + '</span>' +
        '<span class="text-[11px] text-on-surface-variant">' + esc(s.type) + '</span></div></div>';
    }).join('');

    content.innerHTML =
      '<div class="space-y-space-xs pr-12">' +
        '<span class="font-label-caps text-label-caps uppercase text-clay-terracotta tracking-widest">' + esc(d.category) + '</span>' +
        '<h2 id="project-modal-title" class="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-espresso-deep">' + esc(d.title) + '</h2>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(d.location) + '</p>' +
      '</div>' +
      '<div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg items-start">' +
        '<div class="rounded overflow-hidden aspect-[4/3] bg-surface-taupe"><img src="' + IMG + d.image + '" alt="' + esc(d.title) + '" class="w-full h-full object-cover"/></div>' +
        '<div class="space-y-space-md">' +
          '<div><h3 class="font-label-caps text-label-caps uppercase text-espresso-text tracking-wider mb-1">Het concept</h3>' +
          '<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed">' + esc(d.brief) + '</p></div>' +
          '<div class="bg-surface-plaster p-space-md rounded"><p class="font-serif text-[1.05rem] italic text-espresso-deep leading-relaxed">' + esc(d.quote) + '</p></div>' +
        '</div>' +
      '</div>' +
      '<div class="space-y-space-xs">' +
        '<h3 class="font-label-caps text-label-caps uppercase text-espresso-text tracking-wider">Kleur- &amp; materiaalpalet</h3>' +
        '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">' + swatches + '</div>' +
      '</div>' +
      '<div class="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-border-hairline">' +
        '<span class="font-body-sm text-body-sm text-on-surface-variant">Stalen en stoffen bekijken in onze winkel in Valkenswaard?</span>' +
        '<a href="index.html#contact" class="px-space-lg py-space-sm rounded-full bg-primary-container text-canvas-cream font-label-md text-label-md hover:bg-espresso-deep transition-all whitespace-nowrap">Vraag advies aan →</a>' +
      '</div>';

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    modal.querySelector('[data-modal-close]').focus();
  }

  function closeProject() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-project]').forEach(function (el) {
    el.addEventListener('click', function () { openProject(el.dataset.project); });
    if (el.tagName !== 'BUTTON') {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(el.dataset.project); }
      });
    }
  });
  modal.addEventListener('click', function (e) { if (e.target === modal) closeProject(); });
  modal.querySelector('[data-modal-close]').addEventListener('click', closeProject);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeProject();
  });
})();
