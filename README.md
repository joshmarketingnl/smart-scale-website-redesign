# Smart-Scale website — oud vs. nieuw

Twee versies van de Smart-Scale website naast elkaar, om te vergelijken.

- **`oude-website/`** — de huidige live site (smart-scale.ai). Leidt met chatbots, voicebots en
  automatisering.
- **`nieuwe-website/`** — redesign-probeersel. Nieuwe positionering: Smart-Scale als AI-bedrijf dat
  bedrijven helpt AI te implementeren, met websites als hoofdaanbod. Tot nu toe is alleen de
  **homepage** herschreven; de rest van de pagina's is nog de oude.

Beide mappen zijn complete statische sites (HTML/CSS/JS, geen build-stap).

## Lokaal bekijken

Met Node (aanbevolen):

```bash
npm install
npm start        # http://localhost:8000
```

Of met Python:

```bash
cd nieuwe-website
python -m http.server 8000
```

Niet openen als los bestand: de asset-paden zijn root-absoluut.

Zie [`CLAUDE.md`](CLAUDE.md) voor de volledige context: positionering, schrijfstijl, techniek,
de belangrijke valkuil met asset-paden, en de status van het redesign.
