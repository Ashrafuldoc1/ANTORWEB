# Cha Pata Hut — Sreemangal Tea E-commerce

A fully working e-commerce site for **Cha Pata Hut Sreemangal** (Sylhet, Bangladesh).
Real backend, persistent SQLite database, admin panel — products added in admin appear
on the live site, and orders customers place are saved and trackable end-to-end.

## Stack

- **Client:** Vite + React 18, React Router, Tailwind CSS, inline SVG icon set
- **Server:** Node.js + Express, better-sqlite3 (file-based SQLite), Multer for uploads
- **No external services** required — runs entirely locally

## Run

Two terminals (or use a process manager):

```bash
# 1) Backend (port 4000) — also seeds DB and admin on first run
cd cha-pata-hut/server
npm install
npm start

# 2) Frontend (port 5173) — proxies /api and /uploads to backend
cd cha-pata-hut/client
npm install
npm run dev
```

Open http://localhost:5173

### Default admin login

- URL: `/admin`
- Username: `admin`
- Password: `admin123`

Change this by editing the seeded row in `server/index.js` (or by inserting a new row into the `admin` table in `server/data/cha-pata-hut.db`).

## Project structure

```
cha-pata-hut/
├── server/                  Express + SQLite API
│   ├── index.js             Routes, schema, seeding
│   ├── data/                SQLite DB file (auto-created)
│   └── uploads/             Product images
└── client/                  Vite + React app
    ├── tailwind.config.js   Theme colors (primary/secondary/cream/gold/ink/muted)
    └── src/
        ├── App.jsx                    Router
        ├── main.jsx
        ├── api.js                     API client
        ├── data/site.js               Categories, testimonials, blog, ORDER_STAGES
        ├── context/
        │   ├── CartContext.jsx        localStorage-backed cart
        │   └── SettingsContext.jsx    Loads zones/weights/site info from API
        ├── components/                Header, Hero, CategoryGrid, ProductCard,
        │                              BestSellers, FeatureStrip, TestimonialCard,
        │                              BlogCard, Footer, FloatingContacts, Icon
        └── pages/
            ├── HomePage.jsx
            ├── ShopPage.jsx
            ├── CategoryPage.jsx       /category/green-tea, /category/rosella-tea, ...
            ├── AboutPage.jsx
            ├── BlogPage.jsx
            ├── ContactPage.jsx
            ├── CheckoutPage.jsx       Cart + address + zones + payments
            ├── OrderTrackingPage.jsx  /track  — Order ID + phone lookup
            ├── AdminLoginPage.jsx     /admin
            └── AdminDashboardPage.jsx /admin/dashboard
```

## Data model

`products` — id, name, category, description, price, image_url, stock_quantity, weight_grams, created_at
`orders`   — id (CPH-#####), customer_name, phone, address, division, district, upazila,
            delivery_zone, items (JSON), subtotal, delivery_charge, weight_grams, total,
            payment_method, status, created_at
`settings` — key/value (delivery_zones, weight_threshold_grams, weight_extra_per_kg, site_settings)
`admin`    — username + password (currently a single account; extend as needed)

## Editing without touching code

- **Products** → Admin Panel → "Manage Products" → Add/Edit/Delete
- **Delivery zones & weight charge** → Admin Panel → "Delivery Settings"
- **Site contact info** → stored in `settings.site_settings` (extend the admin panel to edit it)
- **Categories, testimonials, blog posts** → edit `client/src/data/site.js`
- **Colors / fonts** → edit `client/tailwind.config.js`

## End-to-end flow (verified)

1. Customer adds products to cart on the site
2. Goes to `/checkout`, enters BD-style address (Division, District, Upazila, street)
3. Selects a delivery zone — server calculates `(zone base) + (extra per kg over threshold)`
4. Places order → server generates a unique `CPH-#####` ID, saves to `orders` with status `Order Placed`
5. Customer sees confirmation with the Order ID
6. Admin logs in at `/admin` → "Manage Orders" → changes status to Processing / Shipped / Delivered
7. Customer visits `/track`, enters Order ID + phone → sees the live status, progress bar, items, breakdown, estimated delivery

## Bangladesh-market specifics

- All prices in ৳ (Taka)
- Bengali text on hero, buttons, error states, success messages, delivery zone labels
- Floating WhatsApp + Facebook Messenger buttons bottom-right
- Payment options: COD (default), bKash, Nagad, Rocket
- Delivery zones are config-driven (Sreemangal Town / Rest of Sylhet / Outside Sylhet) so swapping to Pathao/Steadfast/RedX later is a config change
