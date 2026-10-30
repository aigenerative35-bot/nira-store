# Shopify theme — Nira (complete)

Installable Liquid theme that ports the whole storefront: sliders, A+ content,
offers, predictive search, customer accounts and app blocks.

## Install
Shopify admin → **Online Store → Themes → Add theme → Upload zip** →
`nira-shopify-theme.zip` → **Publish**.

## Templates (16)
index · product · collection · list-collections · cart · search · page ·
page.aplus · blog · article · 404 · customers/login · customers/register ·
customers/account · customers/order · gift_card

## Sections (24)
header · footer · **hero-slider** · featured-collection · campaign-story ·
**runway-slider** · **cube-slider** · **video-banner** · **offers** ·
**aplus** · main-product · main-collection · main-cart · main-search ·
main-page · main-404 · main-blog · main-article · main-list-collections ·
main-login · main-register · main-account · main-order

## Plugins / apps
- `{{ content_for_header }}` present in the layout (required by every Shopify app)
- **App blocks** supported in: header, footer, product page and A+ content
  (`"type": "@app"` in their schemas) — so apps like Judge.me, Klaviyo,
  Loox, Rebuy, Wishlist Hero can drop widgets in via the theme editor
- Native Shopify: cart AJAX, checkout, payments (UPI/cards), discounts,
  customer accounts, gift cards, inventory

## Features ported from the React build
- Hero slider (autoplay + arrows + dots + hover pause)
- Runway rail (drag, snap, scroll)
- Cube slider (3D rotating faces, reduced-motion aware)
- Video banner (Shopify-hosted video, MP4 URL or image fallback)
- A+ content modules (banner / split / tiles / specs / quote / video)
- Offers grid with 3D tilt + copy-code
- Predictive search (`/search/suggest.json`)
- Collection tag filters, sort, 10-per-page pagination
- Customer login, register, order history, order detail

## After installing
Theme editor → Hero slider (add slides) · Featured collection (pick a collection)
· Runway slider · Video banner · Offers · Footer menus · Theme settings
(logo, accent colour, footer blurb).

## Honest notes
- Shopify's `theme-check` CLI cannot run in this build environment; upload the
  zip and open **Customize** — any schema warning appears there and is a
  one-line fix.
- The theme ships without demo images: add your own in the editor.
