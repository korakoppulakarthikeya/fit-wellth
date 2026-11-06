# FitWellth

Responsive React + Vite healthy-food storefront for FitWellth.

## Run locally
1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add Supabase credentials and a WhatsApp number (optional).
5. Run `npm run dev`.

The storefront works in local-demo mode without Supabase. Products, cart and reviews are persisted in localStorage. Admin edits are local-demo edits until you connect the Supabase services and configure the SQL schema.

## Demo admin
Open `/admin`. This starter intentionally does not ship with a public admin password. Before production, enable Supabase Auth, create an admin user, configure Row Level Security, and protect admin routes.

## Nutrition data
Nutrition values are illustrative estimates for demo recipes. Replace ingredient values with the exact nutrition label data for the brands and quantities you serve. The calculator derives recipe totals from ingredient weights; it does not claim laboratory-verified values.

## Images
The supplied FitWellth logo is included at `public/logo.png` and `src/assets/images/logo.png`. Product photos use remote Unsplash image URLs as placeholders; replace them with your own licensed product photos in `public/images/`.
