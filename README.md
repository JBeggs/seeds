# Seeds & Garden (Template 7)

Next.js 16 storefront for **[PLAN-07-SEEDS.md](../PLAN-07-SEEDS.md)**. Forked from `honey/` (Template 2) with themes **Heirloom**, **Botanical**, and **Modern Garden**. Dev server: **port 3008**. Default company slug: **`seeds`**.

## Quick start

```bash
cd seeds
cp .env.example .env.local   # set NEXT_PUBLIC_COMPANY_SLUG and API URL
npm install
npm run dev
```

Open [http://localhost:3008](http://localhost:3008).

## Configuration

- **`NEXT_PUBLIC_COMPANY_SLUG`** — tenant for `X-Company-Slug` (see django-crm `/admin/setup`).
- **`NEXT_PUBLIC_API_URL`** — django-crm API base (e.g. `http://localhost:8000/api`).
- **`NEXT_PUBLIC_SITE_URL`** — canonical URL for Open Graph (optional on Vercel; `VERCEL_URL` is used as fallback).

Themes: `data-theme` values **`heirloom`** (default), **`botanical`**, **`modern-garden`**. Cookie / `localStorage` key: **`site_theme`**.

## Scripts

- `npm run dev` — dev server (port **3008**)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm test` — Vitest

First-party catalog products use blank `supplier_slug`; checkout uses **`isCourierGuyCartItem`** — see PLAN-07 and PLAN-02 courier pitfall sections.
