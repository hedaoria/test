# Vakconnectie

Nederlands platform dat opdrachtgevers in contact brengt met vakmensen voor
werk in en rond het huis. Gebouwd met Next.js 16 (App Router), React 19,
TypeScript en Tailwind CSS 4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
npm run lint
```

## Wat zit erin

**Publieke site** (`app/(site)`)

| URL | Pagina |
| --- | --- |
| `/` | Homepage: hero met klusinvoer, hoe het werkt, vakgebieden, zoeken, vertrouwen, sectie voor vakmensen, regio's |
| `/vakmensen` | Zoeken op vakgebied, postcode, plaats en afstand (gewone GET-form, werkt zonder JS) |
| `/vakmensen/[stad]` | SEO-landingspagina's voor 12 steden |
| `/[vakgebied]` | Categoriepagina's, bijv. `/schilder`, `/loodgieter` (meervoud zoals `/schilders` → 308 redirect) |
| `/vakman/[slug]` | Openbaar profiel met projecten, reviews, werkgebied, bedrijfsgegevens, CTA's |
| `/klus-plaatsen` | Stap-voor-stap flow (6 stappen + overzicht), accepteert `?vakgebied=`, `?wat=`, `?vakman=` |
| `/hoe-werkt-het`, `/voor-vakmensen`, `/reviews`, `/veelgestelde-vragen` | Uitleg, abonnementen, FAQ |
| `/inloggen`, `/registreren`, `/wachtwoord-vergeten`, `/wachtwoord-herstellen`, `/e-mail-bevestigen` | Accountflows |
| `/over-ons`, `/contact`, `/blog`, `/vacatures`, juridische pagina's | Overig |

**Dashboards** (`app/(dashboard)`, noindex)

- `/account`: opdrachtgever (klussen, reacties, berichten, opgeslagen vakmensen, reviews schrijven, notificaties, instellingen)
- `/mijn-bedrijf`: vakman (overzicht, nieuwe opdrachten uit de regio, reageren, berichten, profiel, reviews, werkgebied, beschikbaarheid, abonnement, instellingen)
- `/beheer`: beheeromgeving (gebruikers, vakmensen goedkeuren, blokkeren, opdrachten, reviews, meldingen, categorieën)

**SEO**: unieke titles/descriptions per pagina, canonical URL's, `sitemap.xml`,
`robots.txt`, OG-afbeelding en JSON-LD (Organization, WebSite, BreadcrumbList,
Service, FAQPage, ItemList, HomeAndConstructionBusiness met AggregateRating en Review, Article).

## Architectuur en uitbreiden

- `lib/types.ts`: domeinmodel (gebruikers met rollen, vakmensen, klussen, reacties, berichten, reviews, meldingen, abonnementen).
- `lib/repository.ts`: **de enige plek waar pagina's data ophalen**. Nu leest dit uit de demo-data in `lib/data/`; vervang de implementatie door databasequeries (bijv. Postgres + Prisma/Drizzle) zonder pagina's aan te passen.
- `lib/auth.ts` + `proxy.ts`: rollen, rechten en een toegangscontrole voor `/account`, `/mijn-bedrijf` en `/beheer` (aan te zetten met `AUTH_ENABLED=true` zodra er een sessie is). `lib/dashboard.ts` bevat de tijdelijke demo-gebruikers.
- `lib/validation.ts`: gedeelde validatie voor formulieren en API-routes.
- `lib/geo.ts`: postcode/plaats → coördinaten (per postcodegebied, benaderd) en afstandsberekening. Vervang door een echte postcode-API (bijv. PDOK Locatieserver).
- `app/api/*`: klus plaatsen, contact, registreren, inloggen, wachtwoord vergeten/herstellen. Deze valideren de invoer; opslaan, e-mails versturen (verificatie, notificaties, wachtwoordherstel), foto-upload en betalingen zijn gemarkeerd met `TODO`.
- Interactieve dashboardacties (berichten, reageren, goedkeuren, blokkeren) werken nu lokaal in de browser en zijn bedoeld om aan server actions/API-routes te koppelen.

## Vóór livegang

1. `NEXT_PUBLIC_DEMO_MODE=false` en de fictieve demo-data in `lib/data/` vervangen door echte data (de demobalk bovenaan verdwijnt dan).
2. Bedrijfsgegevens in `lib/site.ts` invullen.
3. Eigen fotografie toevoegen in `public/images/` en doorgeven aan `<Photo src=…>` (hero, sectie voor vakmensen, over ons, projectfoto's). Tot die tijd tonen we bewust rustige placeholders in plaats van stockfoto's.
4. Authenticatie, database, e-maildienst en betaalprovider koppelen (zie `TODO`'s).
5. Juridische teksten laten controleren; de abonnementsprijzen in `lib/data/platform.ts` zijn een voorstel.

Huisstijl: één merkkleur (`brand`, groen) plus warme neutrale tinten (`stone`), lettertype Figtree. Zie `app/globals.css`.
