<h1 align="center">IN.EX Shop</h1>

<p align="center">A full-stack e-commerce platform featuring role-based JWT authentication, Google OAuth, real-time Pusher chat, Stripe payments, product management, forum posts, and monthly sales analytics.</p>

## ✨ Features

- **JWT Authentication & Role-Based Access** — Secure user registration and login with role-based guards (admin / user). Refresh tokens stored in HTTP-only cookies.
- **Google OAuth 2.0** — One-click sign-in via Passport Google OAuth strategy.
- **Stripe Payments** — Secure checkout integrated with Stripe, including cart management and order confirmation.
- **Product Management** — Full CRUD for products with image upload support, category filtering, and search.
- **Real-Time Chat** — Pusher-powered bidirectional messaging between users within chatrooms.
- **Forum Posts & Community** — Users can create, view, and interact with forum posts.
- **Admin Dashboard** — User account management and monthly sales statistics with charts.
- **Transactional Email** — Nodemailer + Handlebars templated emails for registration and password reset.

## 📦 Application Stack & Ports

| Service | Technology | Port | Description |
|---|---|---|---|
| **Client** | Next.js 13, React 18, Tailwind CSS, Framer Motion | `3000` | Frontend SSR web application |
| **Server** | NestJS 10, Passport, Mongoose | `5000` | REST API, JWT/OAuth, business logic |
| **Database** | MongoDB 7 | `27017` | User accounts, products, orders, messages |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose **or** Node.js 20+ with npm
- A [Stripe](https://stripe.com) account (publishable + secret keys)
- A [Pusher](https://pusher.com) account (app key + cluster)
- A [Google Cloud OAuth 2.0](https://console.cloud.google.com) client ID and secret
- An SMTP provider (Gmail, Mailgun, etc.) for transactional email

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/ttncode/inex.git
cd inex

# 2. Bootstrap environment files
./init-env.sh

# 3. Fill in required secrets in server/.env and client/.env.local

# 4. Start everything with Docker Compose
docker compose up -d --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## Environment Variables

### Server (`server/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | NestJS server port (default: `5000`) |
| `BASE_URL` | Yes | Public server URL (e.g. `http://localhost:5000`) |
| `CLIENT_URL` | Yes | Frontend URL (e.g. `http://localhost:3000`) |
| `MONGO_DATABASE_URL` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Secret key to sign JWT access tokens |
| `SESSION_SECRET` | Yes | Secret key for session cookie encryption |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key (`sk_live_...` or `sk_test_...`) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `NEXT_PUBLIC_GOOGLE_SECRET_KEY` | Yes | Google OAuth client secret |
| `MAIL_HOST` | Yes | SMTP host (e.g. `smtp.gmail.com`) |
| `MAIL_PORT` | Yes | SMTP port (e.g. `587`) |
| `MAIL_USER` | Yes | SMTP username |
| `MAIL_PASSWORD` | Yes | SMTP password |
| `MAIL_FROM` | Yes | Sender display address |

### Client (`client/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | Yes | Server API URL (e.g. `http://localhost:5000`) |
| `NEXT_PUBLIC_ENDPOINT` | Yes | API endpoint prefix |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `NEXT_PUBLIC_PUSHER_KEY` | Yes | Pusher app key |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | Yes | Pusher cluster region |
| `NEXT_PUBLIC_AUTH_SECRET` | Yes | NextAuth secret |
| `GOOGLE_CLIENT_ID` | Yes | Google OAuth client ID |
| `GOOGLE_SECRET_KEY` | Yes | Google OAuth client secret |

## Development

Run client and server locally without Docker:

```bash
# Terminal 1 — NestJS Backend
cd server
npm install
npm run start:dev

# Terminal 2 — Next.js Frontend
cd client
npm install
npm run dev
```

## Tech Stack

Next.js 13 · React 18 · NestJS 10 · MongoDB · Mongoose · JWT · Google OAuth · Stripe · Pusher · Nodemailer · Tailwind CSS · Framer Motion · Docker · Docker Compose
