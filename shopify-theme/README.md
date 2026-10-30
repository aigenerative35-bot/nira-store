# Shopify theme — Nira

`nira-shopify-theme.zip` is a complete, installable Shopify theme that ports this
storefront's design to Liquid.

## Install
1. Shopify admin → **Online Store → Themes**
2. **Add theme → Upload zip file**
3. Pick `nira-shopify-theme.zip` → **Publish**

## What's inside
- `layout/theme.liquid` — shell, fonts, cart drawer, asset loading
- `sections/` — header, footer, hero, featured collection, campaign story,
  product, collection, cart, search, page, 404
- `snippets/product-card.liquid` — the 4-column card (154.517 × 195.792 mm ratio)
- `assets/theme.css` — the design system (white ground, navy #0f2a4a accent)
- `assets/theme.js` — AJAX cart drawer, gallery, qty steppers, mobile menu
- `templates/*.json`, `config/*`, `locales/en.default.json`

## After installing
- Theme editor → **Hero**: pick image, heading, button
- **Featured collection** section: choose a collection (falls back to all products)
- **Footer**: assign menus to the columns
- Theme settings: logo, accent colour, footer blurb

Products, inventory, payments and checkout come from Shopify itself — nothing
is mocked.
