# NIRA — beauty & atelier

A complete React storefront for a beauty + atelier house: campaign-led home page,
Herrera-style product grid on the shop page, split-screen product detail, cart,
3-step checkout and order tracking.

**Live:** https://aigenerative35-bot.github.io/nira-store/

## Stack
- React 18 + React Router 6
- Framer Motion (drawer, modals, reveals)
- Hand-written CSS design system (`src/styles.css`) — white surfaces, navy `#0f2a4a` accents
- esbuild bundle → `assets/` (served from the repo root by GitHub Pages, `.nojekyll` set)

## Pages
| Route | What it does |
|---|---|
| `/` | Campaign home: hero slider, banner strip, three worlds rail, campaign film, runway slider, cube slider, campaign story, manifesto, house band, reviews, video banners, collection CTA |
| `/shop` | Category + search page: search box, category chips, sort, **10 products per page** with pagination, 4-column editorial grid |
| `/product/:id` | Split-screen PDP: gallery + thumbnails on the left, running campaign film on the right, floating buy card (colour, size, qty, pincode, add to bag) |
| `/cart` | Line items, qty, promo code `NIRA10`, summary |
| `/checkout` | Contact → address → payment, order confirmation + tracking timeline |
| `/about`, `/contact` | House story, contact form + FAQ |

## Features
- Cart, wishlist and comments persist in `localStorage`
- Cart drawer, quick view, search overlay, comment sheet
- Like / comment / share on every product card (Web Share API + clipboard fallback)
- Hero panels (categories, offers) hidden by default, slide in with a 3D entrance
- HD imagery (1000×1250 products, 1800×1200 banners), lazy loaded
- Four films: hero, campaign, atelier, handloom (`video/`)

## Local dev
```bash
npm install
npm run dev        # open /dev.html
npm run build      # vite build (needs the native rollup binary)
```

## Build note
The deployed bundle in `assets/` is produced with esbuild:

```bash
npx esbuild src/main.jsx --bundle --minify --format=esm --target=es2020 \
  --jsx=automatic --loader:.jsx=jsx --outfile=assets/app.js \
  --define:process.env.NODE_ENV='"production"'
```

Photography and film: Pexels free licence. Fonts: Bodoni Moda + Jost (Google Fonts).
