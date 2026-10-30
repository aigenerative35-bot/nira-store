# Shopify theme — Nira (complete, v1.0.0)

## Install
Shopify admin → **Online Store → Themes → Add theme → Upload zip** →
`nira-shopify-theme.zip` → **Publish** → **Customize**.

## Templates (20)
index · product · collection · list-collections · cart · search · page ·
page.aplus · blog · article · 404 · password ·
customers: login · register · account · order · addresses ·
reset_password · activate_account · gift_card

## Sections (28)
header · footer · hero-slider · featured-collection · campaign-story ·
runway-slider · cube-slider · video-banner · offers · aplus ·
main-product · main-collection · main-cart · main-search · main-page ·
main-404 · main-blog · main-article · main-list-collections ·
main-login · main-register · main-account · main-order · main-addresses ·
main-reset-password · main-activate-account · main-password

## Layouts (2)
theme.liquid · password.liquid

## Shopify requirements covered
- `theme_info` block in `config/settings_schema.json` (required for upload)
- `{{ content_for_header }}` + `{{ content_for_layout }}`
- `assets/theme.css` + `assets/theme.js` via `asset_url`
- `locales/en.default.json`
- All standard templates + customer templates + gift card + password

## App / plugin support
App blocks (`"type": "@app"`) enabled in: **header, footer, product page, A+ content**.
So Judge.me, Klaviyo, Loox, Rebuy, Wishlist Hero, UpPromote etc. can inject
widgets from the theme editor.

## Features
Hero slider (autoplay/arrows/dots) · runway rail (drag) · 3D cube slider ·
video banner · A+ modules (banner/split/tiles/specs/quote/video) ·
offers with copy-code · predictive search (`/search/suggest.json`) ·
AJAX cart drawer · collection tag filters + sort + 10/page · customer
accounts · gift cards · native Shopify checkout & payments.

## After install
Theme editor → add slides to the Hero, pick a Featured collection, set
Runway / Video / Offers, assign footer menus, set logo + accent colour.

## Honest notes
- `theme-check` CLI cannot run in this environment; upload and open Customize —
  any schema warning shows there and is a one-line fix.
- No demo images ship with the theme; add your own in the editor.
