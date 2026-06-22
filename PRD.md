# Smart-Scale website — PRD (werk- en bouwplan)

Status: actief. Voor de persoon die het redesign verder afmaakt.
Werk in `nieuwe-website/`. Lees eerst `START-HERE.md` en `CLAUDE.md`.

Dit document is de takenlijst en de richting. Geen interne prijzen of strategie; die loopt via
Joshua.

---

## 1. Doel

Een herziene smart-scale.ai die:
- leidt met "Smart-Scale is een AI-bedrijf dat bedrijven helpt AI te implementeren", met
  websites als hoofdaanbod;
- duidelijke, menselijke teksten heeft (geen AI-marketingtaal);
- snel, toegankelijk en goed vindbaar is (doel: Lighthouse 100/100/100/100);
- zelf een visitekaartje is voor het product dat we verkopen (een snelle, nette website).

---

## 2. Huidige staat

Klaar (in `nieuwe-website/`):
- **Homepage** herschreven (hero, structuur, teksten, nav, footer), met JSON-LD (Organization)
  en echte screenshot-tegels in de Werk-sectie.
- **Alle hoofdpagina's gebouwd:** Websites, Voice agents, AI op maat, Werk, Over ons, Contact.
  Consistente header/footer, root-absolute paden, per pagina unieke title + meta + canonical.
- **SEO-basis:** `sitemap.xml` en `robots.txt` toegevoegd.
- Geverifieerd met Playwright: alle pagina's status 200, CSS laadt, geen kapotte beelden,
  geen mislukte requests.

Nog te doen (zie backlog):
- De oude losse pagina's (`chatbots/`, `voicebots/`, `solutions/`, `demo/`) staan er nog en zijn
  niet meer in de nav. Opruimen of laten doorverwijzen.
- Copy laten checken door Joshua; team-bio's (1 regel) en echte teamfoto's; meer portfolio met
  toestemming.
- Redirects voor oude URL's; extra structured data (Breadcrumb/FAQ); echte Lighthouse-ronde;
  `og:image` controleren.

---

## 3. Backlog

Geordend op waarde. Pak bij voorkeur van boven naar beneden.

### A. Pagina's bouwen (hoogste prioriteit)
- [ ] **Websites** (`/websites/index.html`) — het hoofdaanbod. Wat je krijgt, hoe het werkt,
      waarom statisch (snel/veilig/geen CMS-gedoe), voorbeelden, CTA. Dit is de belangrijkste
      nieuwe pagina.
- [ ] **Voice agents** (`/voice-agents/index.html`) — nuchter: wat het doet, waar het past,
      wat je krijgt, FAQ. Kan voortbouwen op de oude `voicebots/`-pagina, maar herschreven.
- [ ] **AI op maat** (`/ai-op-maat/index.html`) — chatbots + koppelingen + automatisering als
      vervolgaanbod. Eerlijk: dit is meestal niet de eerste stap.
- [ ] **Werk** (`/werk/index.html`) — portfolio: echte klanten (Blue Shield bevestigd) +
      branche-demo's. Met screenshots (zie `screenshots/`).
- [ ] **Over ons** (`/over-ons/index.html`) — kort, menselijk. Team: Sake, Joshua, Diego.
- [ ] **Contact** (`/contact/index.html`) — simpel: WhatsApp, e-mail, Calendly. Geen
      contactformulier (bewuste keuze).
- [ ] Oude pagina's (`chatbots/`, `solutions/`, `demo/`) opruimen of laten doorverwijzen.

Hergebruik op elke pagina dezelfde header en footer als de homepage (kopieer en pas de
actieve link aan). Gebruik de bestaande componenten uit `style.css` (`.section`, `.shell`,
`.card`, `.feature-grid`, `.dual`, `.timeline`, `.btn`, eyebrow-labels).

### B. Copy nalopen
- [ ] Homepage-teksten nog een keer scherp lezen (kort, menselijk, geen jargon).
- [ ] De voorbeeld-chat in de hero (`.chat-ui` bubbels) bevat nog oude demo-tekst; vervangen
      door iets dat past bij "websites".
- [ ] Alle oude AI-marketingtermen eruit ("zonder ruis", "intake", "conversie-first", enz.).

### C. Beeld en visuals
- [ ] Echte teamfoto's op Over ons.
- [ ] Screenshots van gebouwde sites in de Werk-sectie (begin met Blue Shield, zie
      `screenshots/blueshield.png`).
- [ ] Eventueel een betere hero-visual dan de huidige abstracte SVG.

### D. Secties / features die erbij kunnen
Niet verplicht, wel waardevol. Overleg met Joshua wat past.
- [ ] Korte uitleg "Waarom statisch" (snelheid/veiligheid) als losse sectie of op Websites.
- [ ] Logorij of "gewerkt voor" strip (pas met toestemming van klanten).
- [ ] Eenvoudige testimonial/quote (alleen echte; niets verzinnen).
- [ ] Duidelijke "Wat je krijgt"-checklist op Websites.
- [ ] Eventueel een blog/nieuws-opzet (later).

### E. SEO en techniek
- [ ] `sitemap.xml` en `robots.txt` toevoegen (ontbreken nu).
- [ ] Per pagina unieke `<title>` + `meta description` in mensentaal.
- [ ] Structured data (JSON-LD): `Organization` op home, `BreadcrumbList` op subpagina's,
      `FAQPage` waar een FAQ staat.
- [ ] Controleer `og:image` (wijst naar `smart-scale-logo.png` die mogelijk niet bestaat).
- [ ] Redirects bedenken voor oude URL's (`/chatbots`, `/voicebots`, `/solutions`, `/demo`)
      zodat bestaande links en SEO niet breken bij livegang.
- [ ] Lighthouse-check per pagina (mobiel en desktop), streef naar 100/100/100/100.

---

## 4. Toon en techniek (samengevat, details in CLAUDE.md)

- Schrijfstijl: kort, direct, menselijk, geen hype, geen em-dashes.
- Statische site, geen framework. Hergebruik de tokens in `:root` (kleuren, fonts).
- **Asset-paden altijd root-absoluut** (`/style.css`, `/images/...`). Nooit relatief.
- Chat-widget (n8n) blijft, lazy-loaded; raak de laad-logica in `script.js` niet onnodig aan.

---

## 5. Definition of done (per pagina)

- Teksten in de juiste toon, geen AI-marketingtaal.
- Alle asset-paden root-absoluut.
- Header/footer en interne links kloppen, actieve nav-link gemarkeerd.
- Lighthouse 100/100/100/100 (of afwijkingen besproken met Joshua).
- Meta/SEO ingevuld.
- Lokaal getest via een statische server (niet `file://`).

---

## 6. Aanbevolen volgorde

1. Websites-pagina (hoofdaanbod).
2. Werk-pagina met Blue Shield-screenshot.
3. Voice agents en AI op maat.
4. Over ons en Contact.
5. Homepage-copy finetunen + hero-chat tekst.
6. SEO, sitemap, structured data, redirects.
7. Lighthouse-ronde.

---

## 7. Open vragen voor Joshua

- Welke klanten mogen (naast Blue Shield) met naam + screenshot in de portfolio?
- Team-bio's: 1 regel per persoon.
- Akkoord op de homepage-copy en de hero-zin?
- Moet er ergens toch een prijsindicatie komen, of blijft alles "in het gesprek"?
- Zijn er specifieke secties/features die hij er zeker bij wil?
