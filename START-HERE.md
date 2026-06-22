# Start hier

Welkom. Je gaat meewerken aan de nieuwe website van **Smart-Scale**. Dit document geeft je in
vijf minuten genoeg om te beginnen. Je hoeft niet te weten wat er hiervoor is gebeurd.

## Wat is dit

Smart-Scale is een **AI-bedrijf**. We helpen bedrijven AI te implementeren. Het hoofdaanbod nu is
**websites** (gebouwd met AI, daardoor sneller en scherper geprijsd). Daarnaast voice agents en
AI op maat (chatbots, koppelingen, automatisering).

De huidige live site leidt nog met chatbots/voicebots. We zetten hem om naar een site die leidt
met "AI-bedrijf dat bedrijven helpt AI te implementeren", met websites als hoofdaanbod. De **hele
site is in eerste versie herbouwd** (alle pagina's staan). Nu gaat het vooral om verfijnen: copy,
foto's en de laatste afronding. Daar kom jij in beeld.

## De twee mappen

- `oude-website/` — wat er nu live staat (smart-scale.ai). Niet aan werken, puur ter referentie.
- `nieuwe-website/` — **hier werk je in.** Alle hoofdpagina's zijn herbouwd (Home, Websites,
  Voice agents, AI op maat, Werk, Over ons, Contact). De oude losse pagina's (chatbots, solutions,
  demo, voicebots) staan er ook nog en moeten opgeruimd of doorverwezen worden.

Beide zijn complete statische sites (losse HTML/CSS/JS, geen build-stap, geen framework).

## Doe dit als eerste

1. Lees **`CLAUDE.md`** (10 min). Daar staat de positionering, de schrijfstijl-regels, hoe de
   techniek werkt en een paar valkuilen. Belangrijk.
2. Draai `nieuwe-website/` lokaal en klik rond (zie hieronder).
3. Lees **`PRD.md`** voor de volledige takenlijst en de aanbevolen volgorde.
4. Bekijk de screenshots in `screenshots/` (review van de eigen site, de demo's en het
   klantvoorbeeld Blue Shield).

## Lokaal draaien

De asset-paden zijn root-absoluut (`/style.css`, `/images/...`). Open de map dus **niet** als los
bestand (`file://`), maar serveer hem als webroot. Met Node:

```bash
npm install      # eenmalig
npm start        # http://localhost:8000
```

Of zonder Node:

```bash
cd nieuwe-website
python -m http.server 8000
```

## Drie regels die je niet moet vergeten

1. **Toon:** kort, direct, menselijk. Geen marketing-/AI-taal, geen hype, **geen em-dashes**.
   Zeg gewoon wat je krijgt. Zie CLAUDE.md voor voorbeelden.
2. **Asset-paden altijd root-absoluut** (`/images/...`), nooit relatief. Anders breekt de live
   site op subpagina's.
3. **Lighthouse 100/100/100/100** is het doel. Houd het licht (geen zware libraries).

## Wat menselijke input nodig heeft (vraag Joshua)

Sommige dingen kun je niet zelf invullen. Verzamel deze en vraag Joshua:

- **Teksten akkoord:** Joshua is kritisch op copy. Laat nieuwe teksten checken voordat je veel
  bouwt.
- **Team-bio's:** 1 regel per persoon (Sake, Joshua, Diego) naast hun rol.
- **Portfolio:** welke klanten mogen met naam + screenshot getoond worden? Voor nu is alleen
  **Blue Shield** (blueshield.it) bevestigd. Andere klanten pas na toestemming.
- **Echte foto's:** teamfoto's, eventueel een betere hero-visual.
- **Prijzen:** worden bewust **niet** op de site getoond. Prijs gaat via het gesprek.

## Waar je nu kunt beginnen

De pagina's staan al. De meest waardevolle eerste taken nu (volledige lijst in `PRD.md`):

1. **Loop alle copy na** met Joshua. De teksten zijn een eerste versie; hij is kritisch op toon.
2. **Over ons:** echte 1-regel bio's en teamfoto's toevoegen.
3. **Portfolio:** meer klanten zodra Joshua toestemming heeft (alleen Blue Shield is nu
   bevestigd). Gebruik `npm run shots` om nieuwe screenshots te maken.
4. **Oude pagina's** (`chatbots/`, `solutions/`, `demo/`, `voicebots/`) opruimen of doorverwijzen.
5. **Voor livegang:** echte Lighthouse-ronde op de gedeployde versie, `og:image` checken, en de
   nieuwe site terug in de live-repo zetten (zie CLAUDE.md, sectie Deploy).

Veel plezier. Bij twijfel: houd het simpel, duidelijk en snel.
