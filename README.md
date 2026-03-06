# ArkID — Digital NFC Business Card Platform

> **Ditch The Paper, Stay Arktive**

ArkID is a digital identity platform that lets you share your contact info, social links, and portfolio with a single NFC tap. Buy a card, activate it, set your redirect URL — and anyone who taps your card gets sent exactly where you want them.

**Live site:** https://www.ark-id.xyz

---

## What It Does

| Step | What Happens |
|------|-------------|
| **Buy** | Purchase an NFC card via the checkout page |
| **Activate** | Log in and link your Card ID to your account + set a redirect URL |
| **Share** | Hand someone your card — they tap it and get redirected instantly |
| **Track** | View tap counts and redirect stats on your dashboard |

---

## Tech Stack

| Category | Tools |
|----------|-------|
| **Framework** | React 19, TypeScript, Vite |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v4, Framer Motion |
| **Auth / Web3** | Privy (`@privy-io/react-auth`), Solana (`@solana/web3.js`) |
| **Forms** | React Hook Form + Zod |
| **HTTP** | Axios |
| **Backend** | REST API at `https://arkid-bk3nd.onrender.com` |

---

## Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx        # Marketing homepage
│   ├── CheckoutPage.tsx       # Purchase flow (form, discount, payment)
│   ├── CardActiviate.tsx      # Card activation page wrapper
│   ├── Dashboard.tsx          # Authenticated user dashboard
│   ├── ScanPage.tsx           # NFC tap handler (smart routing)
│   └── PaymentCallback.tsx    # Payment gateway callback handler
├── components/
│   ├── ActivateCard.tsx       # Activation form (Card ID + redirect URL)
│   ├── ProfileForm.tsx        # Profile display
│   ├── RedirectSection.tsx    # Redirect URL management
│   ├── StatCard.tsx           # Tap / redirect stats
│   └── Preloader.tsx          # Loading animation
└── services/
    ├── config.ts              # Privy auth config
    └── api/
        ├── getCard.ts         # GET card by username
        ├── getUserCards.ts    # GET authenticated user's cards
        ├── activateCard.ts    # POST activate card
        ├── updateRedirectUrl.ts  # PUT update redirect URL
        └── validateDiscount.ts   # POST validate discount code
```

---

## Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | LandingPage | Hero, how-it-works, CTA |
| `/checkout` | CheckoutPage | NFC card purchase (NGN 25,000 base price) |
| `/activate` | CardActiviate | Link Card ID to account + set redirect URL |
| `/dashboard` | Dashboard | Stats, profile, redirect URL management |
| `/scan/:username` | ScanPage | NFC tap entry point — routes based on card state |
| `/payment/callback` | PaymentCallback | Payment gateway callback handling |

### Scan Page Routing Logic

When someone taps an NFC card (`/scan/:username`):
- Card has redirect URL → **redirect immediately**
- Card exists but not activated → **show "Not Activated" page**
- User is authenticated → **show dashboard with card data**
- User not authenticated → **prompt login**

---

## Environment Variables

Create a `.env` file at the project root:

```env
VITE_PRIVY_APP_ID=your_privy_app_id
VITE_API_URL=https://arkid-bk3nd.onrender.com
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## API Endpoints

All requests go to `VITE_API_URL`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/card/:username` | Fetch card by username |
| `GET` | `/api/card/user/cards` | Get authenticated user's cards |
| `POST` | `/api/card/activate` | Activate a card |
| `PUT` | `/api/card/:cardId/redirect` | Update redirect URL |
| `POST` | `/api/orders` | Create a new order |
| `POST` | `/api/discount/validate` | Validate a discount code |

Authentication is handled via **Privy** — JWT bearer tokens are attached to protected requests automatically.

---

## Pricing (Nigeria)

| Item | Price |
|------|-------|
| NFC Card | NGN 25,000 |
| Delivery (within Lagos) | NGN 4,500 |
| Delivery (outside Lagos) | NGN 7,000 |
