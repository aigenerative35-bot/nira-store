# NIRA — beauty & atelier

A **React + Vite storefront** with a full commerce flow. Editorial luxury layout: ivory ground,
maroon used strictly as an accent, Bodoni Moda display over Jost.

## Stack
- React 18 + React Router 6
- Framer Motion (page transitions, drawer, modals, scroll reveals)
- Plain CSS design system (`src/styles.css`), no UI kit
- esbuild bundle → `docs/` (served by GitHub Pages)

## Pages
| Route | What it does |
|---|---|
| `/` | Video hero with sound toggle, marquee, mosaic categories, new-in grid, editorial split, campaign film, brand band, reviews, journal, newsletter |
| `/shop` | 16 products, live category filters, 4 sort modes, wishlist view |
| `/product/:id` | Gallery, size + shade selectors, qty, pincode delivery check, accordions, reviews, related, sticky buy bar |
| `/cart` | Line items, qty, remove, promo `NIRA10` (10% off), totals |
| `/checkout` | 3-step flow (contact → address → payment) with validation and an order confirmation |
| `/about`, `/contact`, `*` | Story, contact + FAQ, 404 |

Cart, wishlist and promo persist in `localStorage`, so state survives navigation and reloads.

## Run
```bash
npm install
npm run dev        # vite dev server
npm run build      # vite build → docs/  (needs the native rollup binary)
```

The published build is produced with esbuild directly:
```bash
npx esbuild src/main.jsx --bundle --minify --format=esm --target=es2020 \
  --jsx=automatic --outfile=docs/assets/app.js \
  --define:process.env.NODE_ENV='"production"'
```

## Deploy
GitHub Pages serves `docs/` on `main`. Base path is `/nira-store/`.

Photography and footage: Pexels free licence. Brand "NIRA" is a placeholder.
