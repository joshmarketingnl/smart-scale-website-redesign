# Lees dit eerst

Hoi! Je gaat meewerken aan de nieuwe website van Smart-Scale. Goed nieuws: het meeste werk doet
**Claude** (Claude Code). Jij geeft in gewone taal aan wat er moet gebeuren, Claude past de code
aan, en jij controleert het resultaat in je browser. Je hoeft dus geen ervaren developer te zijn.

Claude leest de andere bestanden in deze map (zoals `CLAUDE.md` en `PRD.md`) zelf wel. Jij hebt
eigenlijk alleen dit document nodig.

## Wat dit is

- `nieuwe-website/` = de nieuwe site waar je aan werkt.
- `oude-website/` = de huidige live site, alleen ter referentie. Hier kom je niet aan.
- De overige bestanden zijn context voor Claude.

## Eenmalig instellen

1. Zorg dat je **Claude Code** hebt.
2. Je hebt **Node.js** nodig om de site lokaal te bekijken. Weet je niet of je dat hebt? Open
   Claude en vraag: *"Heb ik Node.js? Zo niet, help me het stap voor stap te installeren."*
3. Zet deze map op je computer (clonen). Vraag Claude: *"Clone de repo <link die je van Joshua
   krijgt> naar mijn computer en open hem."* Joshua zorgt dat je toegang hebt.

Kom je er bij een stap niet uit? Vraag het gewoon aan Claude in normale taal. Daar is hij voor.

## Beginnen (elke keer dat je gaat werken)

4. Open het project in Claude Code en typ als allereerste:

   > Lees START-HERE.md, CLAUDE.md en PRD.md. Vat samen waar we staan en wat de eerste taken zijn.

   Zo weet Claude precies wat de bedoeling en de stijl is.

5. Bekijk de site lokaal. Typ:

   > Start de site lokaal zodat ik hem in mijn browser kan bekijken.

   Claude draait dan `npm install` en `npm start`. Open daarna **http://localhost:8000**.

## Hoe je iets laat aanpassen

6. Beschrijf gewoon in normale taal wat je wilt. Bijvoorbeeld:

   > Maak de tekst op de Websites-pagina wat korter en zakelijker.

   Claude past het aan. Ververs je browser en kijk of het klopt. Niet goed? Zeg het, dan past hij
   het opnieuw aan. Je kunt eindeloos bijsturen.

7. Twee dingen die Claude al weet, maar goed om te weten:
   - De toon moet **kort, menselijk en duidelijk** zijn. Geen marketingtaal, geen lange streepjes.
   - **Niets gaat automatisch live.** Deze map is nog niet de echte website. De livegang regelt
     Joshua. Je kunt dus rustig experimenteren.

## Je werk opslaan

8. Als je iets af hebt, sla je het op in GitHub. Typ:

   > Commit en push mijn wijzigingen met een korte uitleg.

   Claude doet de rest. Doe dit gerust vaak; dan gaat er nooit werk verloren.

## Wat je aan Joshua vraagt

Sommige dingen kun je niet zelf bepalen. Verzamel deze en stem af met Joshua:
- Of de **teksten** goed zijn (hij is kritisch op toon).
- **Teamfoto's** en een korte bio (1 regel) per persoon.
- Welke **klanten** in het portfolio mogen (nu staat alleen Blue Shield erin).

## Een paar opdrachten om mee te starten

Kopieer er gerust een naar Claude:

- *"Lees PRD.md. Loop de teksten van de homepage na en stel kortere, duidelijkere versies voor in
  dezelfde nuchtere toon. Laat me de voor/na zien voordat je iets wijzigt."*
- *"Voeg op de Over ons-pagina een korte bio van één regel toe per teamlid. Hier zijn de teksten:
  [plak hier]."*
- *"De oude pagina's /chatbots, /solutions, /demo en /voicebots staan er nog. Stel een veilige
  manier voor om die op te ruimen of door te verwijzen, en voer die uit."*
- *"Controleer de hele site op spel- en taalfouten en verbeter ze, zonder de betekenis te
  veranderen."*
- *"Maak met `npm run shots` nieuwe screenshots en zet een nettere afbeelding in de Werk-sectie."*

## Als je vastzit

Vraag het gewoon aan Claude: *"ik snap dit niet, leg uit"* of *"dit ging fout, wat nu?"*. En kom
je er samen niet uit, app Joshua.
