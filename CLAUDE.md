# Smart-Scale website — context (CLAUDE.md)

Dit bestand geeft context aan Claude Code (en aan een ontwikkelaar) die met deze repo werkt.

## Wat is dit

Een vergelijking van twee versies van de Smart-Scale website:

- `oude-website/` — de huidige live site van smart-scale.ai. Leidt met chatbots, voicebots en
  automatisering. Dit is wat er nu online staat.
- `nieuwe-website/` — een redesign-probeersel (work in progress). Tot nu toe is alleen de
  **homepage** herschreven naar de nieuwe positionering. De overige pagina's zijn nog de oude.

Beide mappen zijn complete, deploybare statische sites (de inhoud van `public_html`).

## Het bedrijf

Smart-Scale is een **AI-bedrijf**. We helpen bedrijven AI te implementeren. Op dit moment draait
het meeste werk om **websites** (gebouwd met AI, daardoor sneller en scherper geprijsd). Daarnaast:
**voice agents** (AI-telefoonassistenten) en **AI op maat** (chatbots, koppelingen, automatisering).
Websites zijn nu het hoofdaanbod; de rest is secundair / vervolgaanbod.

Noem het bedrijf nooit een "AI-studio". Het is een AI-bedrijf.

## Schrijfstijl (belangrijk)

De teksten moeten klinken als een mens, niet als AI-marketing.

- Kort, direct, praktisch, duidelijk.
- Geen hype-woorden, geen nepwarmte, geen emoji.
- **Geen em-dashes.** Punt of komma.
- Zeg gewoon wat je krijgt. Geen slogans zoals "van intake naar live zonder ruis" of
  "we brengen AI naar je bedrijf".
- Koppen mogen benoemen wat er staat ("Het probleem", "Hoe het werkt", "Wat we doen") of een
  nuchtere vraag zijn ("Even sparren?").

## Nieuwe positionering (homepage)

- Hero eyebrow: `AI-bedrijf`
- Hero H1: **"We zetten AI in waar het je bedrijf echt iets oplevert."**
- Secties: Wat we doen (Websites = hoofdaanbod, Voice agents, AI op maat) -> Waarom met AI ->
  Werk (klant Blue Shield + branche-demo's) -> Hoe het werkt (nuchtere stappen) ->
  Over ons (Sake, Joshua, Diego) -> FAQ -> CTA.
- Navigatie: Websites, Voice agents, AI op maat, Werk, Over ons, Contact.
- CTA's: "Plan een gesprek" (Calendly) en "App ons" (WhatsApp). Geen contactformulier.

## Techniek

- **Statische site**: losse HTML, CSS (`style.css`) en JavaScript (`script.js`). Geen framework,
  geen build-stap, geen CMS. Bewuste keuze: snel, veilig, onderhoudsarm, en het is precies het
  product dat Smart-Scale verkoopt.
- Donker thema met geel accent. Tokens staan in `:root` (kleuren, fonts Poppins + Inter, radius,
  spacing). Hergebruik die tokens.
- Doel: **Lighthouse 100 / 100 / 100 / 100** (Performance, Accessibility, Best Practices, SEO).

## Belangrijkste valkuil: gebruik root-absolute asset-paden

De server (Hostinger/LiteSpeed) stuurt schone URL's door naar een trailing slash
(`/websites` -> `/websites/`). Met **relatieve** asset-paden breken op subpagina's dan de CSS,
JS en afbeeldingen (404/500). Resultaat: kapot menu, gebroken afbeeldingen en de chat-widget
laadt niet.

Regel: **alle verwijzingen root-absoluut**: `/style.css`, `/script.js`, `/images/...`,
`/fonts/...`. Nooit relatief in de HTML.

Gevolg voor lokaal previewen: open de map niet als los bestand (`file://`) en niet in een
preview die niet in de sitemap geworteld is, want dan resolven `/images/...` niet. Serveer de
map als webroot:

```bash
cd nieuwe-website
python -m http.server 8000
# open http://localhost:8000
```

## Chat-widget (n8n)

`script.js` laadt een n8n-chatwidget (de "Joshua"-assistent). De launcher wordt **lazy-loaded**
(lichte knop eerst, de zware bundle pas bij klik) voor de Performance-score. De launcher is een
rond geel bolletje met een chat-icoon, consistent voor en na openen. De demo-pagina's
(garage/schoonheid/shopify) hebben eigen persona's.

## Deploy (ter info, niet via deze repo)

De live site staat op Hostinger als statische site. Deployen = de inhoud van de site-map
(`public_html`) als tar.gz uploaden. Deze vergelijkings-repo wordt niet gedeployed.

## Status van `nieuwe-website/`

Klaar:
- Homepage: nieuwe positionering, structuur, teksten, nav, footer + JSON-LD (Organization).
- Alle hoofdpagina's gebouwd: Websites, Voice agents, AI op maat, Werk, Over ons, Contact.
- Werk-sectie met echte screenshot-tegels (Blue Shield + demo's).
- SEO-basis: `sitemap.xml` en `robots.txt`.
- Geverifieerd met Playwright (alle pagina's 200, CSS laadt, geen kapotte beelden).

Nog te doen:
- Oude losse pagina's (chatbots, voicebots, solutions, demo) opschonen of laten doorverwijzen.
- Copy laten checken door Joshua; 1-regel bio per teamlid; echte teamfoto's.
- Meer portfolio met toestemming van klanten.
- Redirects voor oude URL's; extra structured data (Breadcrumb/FAQ); echte Lighthouse-ronde.
- `og:image` controleren (`smart-scale-logo.png` bestaat mogelijk niet).
