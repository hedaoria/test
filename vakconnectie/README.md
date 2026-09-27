# Vakconnectie

Website van Vakconnectie V.O.F. (Haarlem, KvK 42065725): een bemiddelingsbedrijf
dat klanten helpt bij het vinden van passende zelfstandige vakmensen.
Gebouwd met Next.js 16 (App Router), React 19, TypeScript en Tailwind CSS 4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Bedrijfsregels (niet wijzigen zonder akkoord)

- Een projectaanvraag is voor klanten gratis en vrijblijvend.
- Vakconnectie bemiddelt; het werk wordt uitgevoerd door zelfstandige vakmensen.
- De KvK-inschrijving van een vakman wordt gecontroleerd vóór introductie.
- Klant en vakman maken zelf schriftelijke afspraken over prijs, planning, werkzaamheden en garantie.
- Aanvragen, aanmeldingen en contactberichten worden verstuurd via WhatsApp of e-mail: het formulier opent de eigen app van de bezoeker met een ingevuld bericht. Er wordt niets verstuurd of opgeslagen voordat de bezoeker dat bericht zelf verstuurt (zie `lib/contact.ts` en `components/forms/SendButtons.tsx`).

Bedrijfs- en contactgegevens staan op één plek: `lib/site.ts`.

## Talen (Nederlands en Engels)

De hele website is tweetalig. Nederlands staat op de root (`/klus-plaatsen`), Engels onder `/en` met Engelse URL's (`/en/project-request`). In het menu staat een taalkeuze **NL | EN** die naar dezelfde pagina in de andere taal gaat.

- `lib/i18n/dictionaries.ts`: alle vaste teksten per taal.
- `lib/i18n/routes.ts`: vertaling van URL's tussen Nederlands en Engels (`localizePath`).
- `proxy.ts`: stuurt bezoekers naar de interne route `app/[lang]/...` en zet de taal door.
- Vakgebieden, steden, veelgestelde vragen en het privacybeleid hebben een Engelse versie in `lib/data/`.
- Elke pagina heeft `hreflang`-verwijzingen naar de andere taal; de sitemap bevat beide talen.
- Accounts en dashboards (nog uitgeschakeld) zijn voorlopig alleen Nederlands.

## Pagina's

| URL | Inhoud |
| --- | --- |
| `/` | Homepage: aanvraag starten, direct contact, werkwijze, vakgebieden, vertrouwen, vakmensen, regio's |
| `/klus-plaatsen` | Projectaanvraag in stappen, versturen via WhatsApp of e-mail (`?vakgebied=`, `?wat=`, `?vakman=`) |
| `/aanmelden-als-vakman` | Aanmelding zelfstandig vakman met KvK-nummer, via WhatsApp of e-mail |
| `/vakmensen`, `/vakmensen/[stad]`, `/[vakgebied]`, `/vakman/[slug]` | Vind een vakman, regio- en vakgebiedpagina's, openbare profielen |
| `/hoe-werkt-het`, `/voor-vakmensen`, `/veelgestelde-vragen`, `/over-ons`, `/contact` | Informatie |
| `/privacybeleid`, `/cookiebeleid`, `/algemene-voorwaarden` | Juridisch (`/privacy-policy.html` → `/privacybeleid`) |

## Nog aan te vullen met echte gegevens

- **Algemene voorwaarden**: plak de officiële tekst in `termsSections` in `lib/data/legal.ts`. Tot dan verwijst de pagina naar contact en wordt hij niet geïndexeerd.
- **Vakmanprofielen en reviews**: `lib/data/professionals.ts` en `lib/data/reviews.ts` zijn leeg. Zolang ze leeg zijn, tonen pagina's geen profielen, zoekresultaten of beoordelingen. Voeg alleen echte, gecontroleerde vakmensen en echte beoordelingen toe; zoeken, profielpagina's en structured data werken dan automatisch.
- **Vakgebieden en regio's**: `lib/data/categories.ts` en `lib/data/cities.ts`. Stem af op waar Vakconnectie daadwerkelijk bemiddelt.
- **Fotografie**: `<Photo src=…>` toont een rustige placeholder zolang er geen eigen foto is.

## Klaar voor later (staat uit)

Accounts, dashboards voor klanten (`/account`) en vakmensen (`/mijn-bedrijf`), berichten, reviews schrijven en de beheeromgeving (`/beheer`) zijn gebouwd, maar staan uit tot authenticatie en een database zijn gekoppeld. Zet dan `ACCOUNTS_ENABLED=true`. Alle data loopt via `lib/repository.ts`, zodat alleen die laag op de database hoeft te worden aangesloten.
