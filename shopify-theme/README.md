# Shopify theme — Nira v1.2.0

## Install
Online Store → Themes → Add theme → Upload zip → Publish → Customize.

## App compatibility — what works out of the box

### 1. Apps that inject scripts (`content_for_header`) — 100% work
The layout includes `{{ content_for_header }}`, so any app that adds a ScriptTag
works with zero theme edits: Klaviyo, Judge.me, Yotpo, Meta/Google pixels,
Hotjar, Microsoft Clarity, Privy, Gorgias, Tidio, Rebuy, Searchanise…

### 2. App embeds & app blocks — supported
- **App embeds** render automatically on any theme with `content_for_header`.
- **App blocks** (`"type": "@app"`) are enabled in: header, footer, product page,
  A+ content — so merchants can drop widgets from the theme editor.

### 3. Shopify Search & Discovery (filters) — supported
`snippets/facets.liquid` renders `collection.filters` (list + price range,
active-filter pills, apply/clear). Install the app, add filters, they appear.

### 4. Cart / checkout apps
AJAX cart drawer uses `/cart/add.js`, `/cart.js`, `/cart/change.js` — the same
endpoints bundle apps, upsell apps and free-gift apps hook into.

### 5. Apps that need a manual snippet
Some apps ask you to paste code into `theme.liquid` or a product template.
Use **Theme settings → Analytics & pixels → Custom head scripts** for head code,
or add a `@app` block in the editor for body widgets. No file editing needed.

## What a theme cannot do
Payment capture (Razorpay), courier API calls (Shiprocket), invoice PDFs,
affiliate payouts, GST filing — those run on the app's servers. The theme
provides display + data hooks (tracking, GSTIN, cart attributes, ref codes).

## Inventory
21 templates · 29 sections · 2 layouts · 6 snippets · theme.css · theme.js
config: theme_info + 5 setting groups (theme, card, analytics, tax, affiliate)

## Honest notes
- `theme-check` CLI cannot run here; upload and open Customize to see warnings.
- No demo images ship with the theme.
