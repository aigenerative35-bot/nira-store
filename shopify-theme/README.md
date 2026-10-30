# Shopify theme — Nira v1.1.0

Design + **integration hooks** for courier tracking, payments, GST invoices,
analytics and affiliate.

## Install
Shopify admin → Online Store → Themes → **Add theme → Upload zip** →
`nira-shopify-theme.zip` → Publish → Customize.

## Templates (21) · Sections (29) · Layouts (2) · Snippets (4)
Adds `page.track` (Track order) on top of v1.0.0.

## Integrations — what the theme does vs what an app does

| Need | In the theme | Where to install the app |
|---|---|---|
| **Courier tracking** | `snippets/tracking.liquid` renders `order.fulfillments` (company, AWB, tracking URL) on the order page and account table; `/pages/track` page with AWB lookup | Shiprocket / Delhivery / iThink — add tracking in Shopify admin, theme displays it |
| **Razorpay / payments** | Payment icons in the footer (`shop.enabled_payment_types`); checkout is Shopify's | Shopify admin → Settings → Payments → Razorpay (India) |
| **GST invoice** | GSTIN in the footer, optional GST-number field in the cart (`cart.attributes`) | Any GST invoice app (e.g. GstInvoice, Envoice) reads the attribute |
| **Analytics** | `snippets/analytics.liquid` — GA4 (+view_item / view_item_list events), Meta Pixel, Microsoft Clarity, custom head scripts | Theme settings → *Analytics & pixels* |
| **Affiliate** | `?ref=CODE` captured to localStorage and attached to cart as `attributes[ref]` | UpPromote / Refersion / Affiliate+ read the cart attribute |

## Theme settings (6 groups)
theme_info · Theme settings · Product card · **Analytics & pixels** ·
**Store & tax** (GSTIN, legal name, support phone, GST field toggle) ·
**Affiliate** (param name, on/off)

## App blocks
`"type": "@app"` in header, footer, product page and A+ content — apps can inject
widgets from the theme editor.

## Still app-side (cannot live in a theme)
Payment capture, courier API calls, invoice PDF generation, affiliate payouts and
tax filing all run on the app's servers. The theme provides the display and the
data hooks above.

## Honest notes
- `theme-check` CLI cannot run in this environment — upload and open Customize.
- No demo images ship with the theme.
