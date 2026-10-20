# Abbey Lane – website

Nieuwe website voor **Abbey Lane**, woonwinkel voor interieur, styling & fashion in Valkenswaard (sinds 2007).
Statische site: `index.html` + `portfolio.html`, Tailwind via CDN, eigen JS/CSS. Geen build-stap.

- GitHub: https://github.com/Duco713/abbey-lane (openbaar)
- Preview (GitHub Pages): https://duco713.github.io/abbey-lane/ — bedoeld om aan de klant te laten zien
- Lokaal bekijken: `python3 -m http.server 8743` (staat ook in `.claude/launch.json`)
- Na elke push werkt Pages binnen ~1 minuut bij. Commit en push alleen als de gebruiker daarom vraagt.

## Echte bedrijfsgegevens (niet aanpassen zonder bron)
- Adres: Eindhovenseweg 16, 5554 AC Valkenswaard
- Telefoon: 040-8429365 (`tel:+31408429365`). WhatsApp (06-53607447) bewust NIET op de site.
- E-mail: interieuradvies@abbeylane.nl (advies/afspraken), info@abbeylane.nl (algemeen)
- Openingstijden: ma 12–18, di–vr 10–18, za 10–17, zo gesloten
- Facebook: https://www.facebook.com/people/Abbey-Lane-Valkenswaard/100063575920945/
- Google: 4,5 / 5 uit 30 reviews (handmatig bijhouden)
- Webshop verdwijnt: geen links naar de oude webshop.

## Diensten & prijzen (bron: oude site + papieren folder)
1. Personal Shopping in de winkel – gratis, op afspraak
2. Advies in de winkel – kort (≤30 min) gratis; uitgebreid 1–1,5 u € 79 incl. cadeaubon € 79
3. Advies aan huis / op locatie – 1–1,5 u € 199, incl. moodboard + gratis vervolgafspraak
4. Styling aan huis – 2–3 u € 399, incl. gratis inventarisatie in de winkel; helft stylingkosten terug bij aankoop ≥ € 2.500
5. Compleet interieurplan – v.a. € 1.299 (moodboard, 2D, 3D). Opties: moodboard v.a. € 39, meubelplan v.a. € 79, 2D v.a. € 149, 3D v.a. € 799
- Extra tijd € 19 per 15 min; geen reiskosten binnen 10 km; bij voorkeur ma–vr ingepland.

## Inhoud die nog niet echt is
- Uitgelichte review over "Licht onder de Kap": voorbeeldtekst met `[Naam klant]` — vervangen door echte review vóór livegang.
- Derde teamlid (foto gestreepte blouse): naam onbekend, staat als "Welkom in de Winkel".
- Portfolio-titels/beschrijvingen zijn door ons geschreven op basis van de foto's (originelen van abbeylane.nl/portfolio hadden geen tekst).
- `noindex` staat aan (preview). Weghalen bij echte livegang.

## Ontwerp & techniek
- Vast kleurthema **Roze** (`<html data-theme="roze">`) en vast **klassiek** lettertype (Newsreader + Hanken Grotesk):
  de klant koos deze. De schakelaars en de Abbey/GeosansLight-variant zijn verwijderd; het Licht-palet staat nog in de CSS.
- Advies & Styling-kaarten: prijs staat rechts op dezelfde regel als de titel, met een lijn eronder.
- Advies & Styling heeft drie ontwerpvarianten (`[data-variant-block="a|b|c"]`), wisselbaar met de knop linksonder
  (`.variant-switch`, localStorage `al-variant`, standaard A). A = kaarten met rechterkaarten per groep;
  B = keuzehulp met tabbladen (één dienst tegelijk, `[data-tabs]`); C = prijsoverzicht met 5 kolommen naast elkaar.
  Elke variant heeft eigen teksten/prijzen: wijzigingen in ALLE varianten doorvoeren. Na de keuze van de klant de
  andere varianten en de knop verwijderen.
- Animaties: `css/animations.css` + `js/animations.js` (respecteert reduced motion). Hotspots: klasse `.hotspot`.
- Menu volgt de volgorde van de pagina: Advies & Styling · Eigen Label · Portfolio · Reviews · Over Ons · Merken · Contact.
- Portfolio: `portfolio.html` = eenvoudige versie voor variant 1 (alle 31 projecten in de kaartopmaak van de homepage,
  zonder filter/lightbox). De uitgebreide versie (uitgelicht project met hotspots, filter, lightbox, `js/portfolio.js`)
  is geparkeerd als `portfolio-uitgebreid.html` (+ git-tag `portfolio-uitgebreid-v1`) voor variant 2. Niet gelinkt.
- Afbeeldingen: `images/eigen/` (eigen foto's), `images/projecten/` (31 portfoliofoto's), `images/projecten/hd/` (homepage).
- Bij wijzigen van JS/CSS: versienummer in de `?v=` achter de bestandsnaam verhogen (cache).

## Werkafspraken met de gebruiker
- Communicatie in het Nederlands.
- Bestaande teksten/namen die de gebruiker bewust heeft gekozen (bv. tegelnamen "Tafelen & Keuken", "Bespoke Maatwerk",
  "Banken & Textiel") niet zelf hernoemen.
- Verzonnen inhoud (reviews, namen, cijfers, merken) melden en niet als echt presenteren.
