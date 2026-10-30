# NIRA — beauty & atelier

Campaign-led storefront for a beauty + atelier house. React 18 + hand-written CSS,
deployed on GitHub Pages, plus an installable Shopify theme in `shopify-theme/`.

**Live:** https://aigenerative35-bot.github.io/nira-store/
**Shopify theme:** `shopify-theme/nira-shopify-theme.zip`

## Pages
| Route | What it does |
|---|---|
| `/` | Campaign home: hero slider, banner strip, three worlds, campaign film, runway slider, cube slider, campaign story, manifesto, house band, reviews, video banners |
| `/shop` | Search, category chips, price + rating filters, sort, **10 per page**, 4-column grid |
| `/product/:id` | Split PDP: gallery + thumbnails, running campaign film, floating buy card, size guide, pincode check, reviews, A+ content |
| `/cart`, `/checkout` | Bag, promo codes, 3-step checkout, order tracking |
| `/offers`, `/account`, `/about`, `/contact` | Offers (3D cards), auth + order history, house story, contact |

## Features
- Cart, wishlist, reviews and orders persist in `localStorage`
- Drag-and-drop hero panels (categories / offers) with 3D entrance
- Runway slider: auto-advance + drag + arrows + keyboard
- Cinematic video banners and a campaign film on the PDP
- SEO: per-route titles, OG/Twitter cards, JSON-LD, `sitemap.xml`, `robots.txt`
- PWA: `manifest.json` + service worker (offline)
- A11y: focus rings, alt text, AA contrast, reduced-motion support
- Responsive: 380 → 2560 px, exact 154.517 × 195.792 mm card ratio

## Local preview
`nira-local-preview.zip` — unzip and open `index.html` (hash router, works offline).

## Build
```bash
npm install
npx esbuild src/main.jsx --bundle --minify --format=esm --target=es2020 \
  --jsx=automatic --loader:.jsx=jsx --outfile=assets/app.js \
  --define:process.env.NODE_ENV='"production"'
```

Photography and film: Pexels free licence. Fonts: Bodoni Moda + Jost.
