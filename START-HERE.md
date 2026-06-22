# Start hier

Welkom. Je gaat meewerken aan de nieuwe website van **Smart-Scale**. Dit document geeft je in
vijf minuten genoeg om te beginnen. Je hoeft niet te weten wat er hiervoor is gebeurd.

## Wat is dit

Smart-Scale is een **AI-bedrijf**. We helpen bedrijven AI te implementeren. Het hoofdaanbod nu is
**websites** (gebouwd met AI, daardoor sneller en scherper geprijsd). Daarnaast voice agents en
AI op maat (chatbots, koppelingen, automatisering).

De huidige live site leidt nog met chatbots/voicebots. We zetten hem om naar een site die leidt
met "AI-bedrijf dat websites bouwt". De **homepage is al herschreven**, de rest van de site nog
niet. Daar kom jij in beeld.

## De twee mappen

- `oude-website/` — wat er nu live staat (smart-scale.ai). Niet aan werken, puur ter referentie.
- `nieuwe-website/` — **hier werk je in.** De herziene homepage staat er al; de andere pagina's
  zijn nog de oude en moeten vervangen worden.

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
bestand (`file://`), maar serveer hem als webroot:

```bash
cd nieuwe-website
python -m http.server 8000
# open http://localhost:8000
```

(Werkt ook met `npx serve` of een andere statische server.)

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

De drie meest waardevolle eerste taken (details in `PRD.md`):

1. Bouw de **Websites**-pagina (`/websites`) — dat is het hoofdaanbod en het belangrijkste.
2. Vervang de oude subpagina's die nog in de nav staan (`/voice-agents`, `/ai-op-maat`,
   `/werk`, `/over-ons`, `/contact`) of laat ze netjes naar bestaande inhoud wijzen.
3. Loop de **homepage-copy** nog een keer na en zet echte screenshots in de Werk-sectie.

Veel plezier. Bij twijfel: houd het simpel, duidelijk en snel.
