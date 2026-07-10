# AquaFix Loodgieter — Website

Bilingual (Dutch/English) marketing website for a Netherlands-based plumbing
company, built with Next.js (App Router) and Tailwind CSS.

## Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Fully static-friendly pages (SSG) with two API routes for form submissions

## Structure

- `/nl/*` and `/en/*` — fully separate, localized route trees (Dutch is the
  default language). URLs, content, and metadata are localized per page
  (e.g. `/nl/diensten/lekkage-opsporen` vs `/en/services/leak-detection`).
- `lib/site.ts` — business info (NAP, phone, WhatsApp, social links). **Update
  this with real business details before going live** — the current values
  (business name, address, KvK/BTW numbers, domain) are placeholders.
- `lib/routes.ts` — central registry mapping page keys to localized URLs, used
  for navigation, the language switcher, and the sitemap.
- `lib/i18n/` — UI string dictionaries (nav, buttons, forms, footer, etc.).
- `lib/content/` — page content: services, FAQs, testimonials, service areas,
  blog posts, legal page copy.
- `components/layout/` — Header, Footer, sticky call/WhatsApp bar, cookie
  consent, language switcher.
- `components/pages/` — page-level templates shared between the `/nl` and
  `/en` route trees.
- `app/sitemap.ts` / `app/robots.ts` — generated automatically from the route
  registry and blog post list.
- `proxy.ts` — redirects `/` to `/nl` (Next.js 16 renamed Middleware to Proxy).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/nl`.

## Environment variables

Copy `.env.example` to `.env.local` if you want to enable Google Analytics:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

Analytics only loads after a visitor accepts cookies via the consent banner.

## Before deploying to production

1. Replace the placeholder business details in `lib/site.ts` (legal name,
   address, KvK/BTW numbers, social links, domain in `SITE_URL`).
2. Wire up `app/api/contact/route.ts` and `app/api/quote/route.ts` to a real
   email/CRM integration (they currently validate and log submissions).
3. Add real photography — the site currently uses icon-driven, gradient-based
   visuals instead of stock photos.
4. Set the real Google Search Console verification code in
   `app/nl/layout.tsx` and `app/en/layout.tsx` (`verification.google`).
5. Set `NEXT_PUBLIC_GA_ID` if using Google Analytics.
