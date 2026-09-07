# Mobile_shop

## What this is

A full-stack MERN web app ("Mobile Shop - Mr Kumar") for a mobile phone/accessory
shop: an owner manages a product catalog (phones, chargers, cables, accessories,
repair parts, recharge/SIM services) and customers browse, review, and cart
products. Two roles share the same auth system: `User` (customer) and `Owner`
(shop admin, `isOwner: true`), distinguished by an `isOwner` flag rather than
separate login systems.

This is a **combined repo**: `Backend/` (Express + MongoDB API) and `Frontend/`
(React + Vite SPA) live side by side in one git history. There is no root-level
`package.json`, no `docker-compose.yml`, and no script that runs both sides
together — each half is installed and run independently from its own folder.

## Is this repo stale / superseded?

No evidence of that was found. `git remote -v` points at
`git@github.com:MrKuldeep01/Mobile_shop.git` — the same combined layout — and
it is the actively-developed repo (96 commits, most recent dated 2025-02-10,
message "It's a final touch."). Image fallback URLs in the backend controllers
also point at `raw.githubusercontent.com/MrKuldeep01/Mobile_shop/...`, i.e. this
exact repo. There is no reference anywhere in the code or readmes to sibling
`Mobile_shop_frontend` / `Mobile_shop_backend` repos. Treat this as the
canonical, currently-maintained project unless told otherwise.

## Tech stack

**Backend** (`Backend/`)
- Node.js (ESM, `"type": "module"`), Express 5
- MongoDB via Mongoose 8
- Auth: JWT (access + refresh tokens in httponly cookies) + bcrypt
- Multer (local temp upload) → Cloudinary (final image hosting)
- cookie-parser, cors, dotenv

**Frontend** (`Frontend/`)
- React 18 + Vite (not CRA), React Router v6, Redux Toolkit + react-redux
- Tailwind CSS, react-hook-form, react-icons, axios (declared but the app
  actually fetches via a hand-rolled `fetch` wrapper, see below)
- Deployed as a static SPA to both Vercel (`vercel.json` rewrite) and Netlify
  (`public/_redirects`) — the backend's CORS allow-list includes both
  `mobile-shop-frontend-brown.vercel.app` and `mobileshopweb.netlify.app`,
  plus `http://localhost:5173` for local dev.

## Running both sides locally

No unified script exists; start each in its own terminal.

**Backend** — `Backend/`
```bash
cd Backend
npm install
npm run dev        # nodemon -r dotenv/config src/index.js
```
Needs a `Backend/.env` with (see `Backend/Config/envConfig.js`):
`DB_URI`, `ALLOWED_ORIGIN`, `ACCESSTOKENSECRETKEY`, `ACCESSTOKENEXPIRY`,
`REFRESHTOKENSECRETKEY`, `REFRESHTOKENEXPIRY`, `CLOUDINARYNAME`,
`CLOUDINARYKEY`, `CLOUDINARYSECRET`, `CLOUDINARYURL`.
The Mongo database name (`MobileShop`) is hardcoded in `src/constants.js` and
appended to `DB_URI`, so `DB_URI` should be a connection string without a
trailing db name.
Listens on port **3000** — note `src/index.js` has `const port = 3000 || process.env.PORT`,
which always evaluates to `3000` (an `||` bug), so `process.env.PORT` is
currently ignored regardless of what's set.

**Frontend** — `Frontend/`
```bash
cd Frontend
npm install
npm run dev         # vite, default port 5173
```
Needs a `Frontend/.env` with `VITE_SERVER_BASE_URI` pointing at the backend's
API base, e.g. `http://localhost:3000/api/v1` (see `Frontend/config/envConfig.js`
and `Backend/src/constants.js` for the `/api/v1` prefix).

## Folder structure

### `Backend/`
- `src/index.js` — entry point: loads dotenv, connects to Mongo, starts Express.
- `src/app.js` — Express app setup: CORS allow-list, cookie/json/urlencoded
  middleware, static `public/`, and mounts all routers under `/api/v1`.
- `src/constants.js` — shared constants: DB name, cookie options, bcrypt
  rounds, the `/api/v1` base path.
- `Config/envConfig.js` — reads/exports all `process.env` values used app-wide.
- `src/db/index.js` — Mongoose connection helper.
- `src/routes/` — one router per resource: `Auth`, `Home`, `Products`, `cart`,
  `Review`, `Profile`. (`app.js` imports `./routes/Cart.route.js` with a
  capital C, but the file on disk is `cart.route.js` lowercase — works on
  case-insensitive filesystems like macOS/Windows, will break on Linux unless
  the casing is fixed or the filesystem is case-insensitive.)
- `src/controllers/` — request handlers: `Auth`, `Products`, `Profile`,
  `Review`, `cart`. `Order.controller.js` exists but is an unfinished stub
  (`createOrder` references an undefined `productModel` and is not wired to
  any route) — orders are not actually usable yet.
- `src/models/` — Mongoose schemas: `User`, `Owner` (both carry password
  hashing + JWT methods), `Product`, `Cart`, `Review`, `Order`, `Address`,
  `Payment`, `Discount`. `Order`, `Address`, `Payment`, and `Discount` are
  defined but have little or no controller/route wiring yet (early/planned
  features).
- `src/middlewares/` — `Auth.middleware.js` (verifies the access-token cookie,
  attaches `req.user` as owner or user) and `multer.middleware.js` (disk
  storage into `public/tmp/uploadedFiles`, later pushed to Cloudinary).
- `src/utils/` — `ApiError`, `ApiResponse` (uniform response/error shape),
  `AsyncHandler` (wraps controllers, forwards errors to Express), `Cloudinary.js`
  (uploads a local file and deletes it afterward).
- `public/` — static assets served by Express: default owner/user/"no image"
  avatars and the multer scratch-upload directory.
- `Backend/readme.md` / `Backend/faltu.txt` — the author's own planning notes
  and README drafts (not authoritative docs; `faltu.txt` is literally
  scratch/junk notes used while writing the top-level readme).

### `Frontend/`
- `src/main.jsx` — defines the `react-router-dom` route tree
  (`createBrowserRouter`) and wraps the app in the Redux `Provider`.
- `src/App.jsx` — root layout (`Header`/`Footer`/`LowerBar` chrome around an
  `Outlet`); on mount calls the profile service to restore the session from
  cookies and dispatches `login`/`logout` into Redux.
- `src/components/` — one file per page/UI piece: `Login`, `Register`,
  `Home`, `Products` (catalog listing, pagination), `Product`/`SmallProductCard`
  (product cards), `AddProducts` (owner add/edit form), `Profile`/`EditProfile`,
  `ReviewProduct`/`ReviewCard`, `Search`, `NotFound`, plus shared chrome
  (`Header/`, `Footer/`, `LowerBar`, `Logo`, `Button`, `Input`, `Loading`,
  `container/Container.jsx`). `src/components/index.js` re-exports the
  page-level components used by the router.
- `src/servicies/` (note the spelling) — one class per backend resource,
  each method builds a URL from `VITE_SERVER_BASE_URI` and calls the shared
  `fetchData` helper: `Auth.services.js`, `Product.services.js`,
  `Profile.services.js`, `Cart.services.js`, `Review.services.js`.
- `src/store/` — Redux Toolkit slices: `auth.slice.js` (session/user),
  `Product.slice.js` (catalog + pagination state), `Cart.slice.js` (cart
  items and quantities), `Review.slice.js`; `Store.js` wires them together.
- `utils/FetchData.js` — a hand-rolled `fetch` wrapper (not axios, despite
  axios being a dependency): sends `credentials: "include"` for cookies, packs
  request bodies into `FormData` (so file uploads and plain fields share one
  code path), and auto-parses JSON vs. text responses. Also reads a
  `handShake` value from `localStorage` as a Bearer-token fallback.
- `utils/LogoutHandler.js`, `utils/changeHandler.js` — small shared UI helpers.
- `config/envConfig.js` — exposes `VITE_SERVER_BASE_URI` from Vite's env.
- `public/`, `index.html`, `vite.config.js`, `tailwind.config.js`,
  `postcss.config.js`, `eslint.config.js` — standard Vite/Tailwind project
  scaffolding.
- `vercel.json` / `public/_redirects` — SPA rewrite rules for Vercel and
  Netlify respectively (both deployment targets are live per the backend's
  CORS list).

## Notable conventions

- Auth is cookie-based (httponly `accessToken`/`refreshToken` cookies with
  `sameSite: "none", secure: true`), not header-based, even though
  `FetchData.js` also has an unused Bearer-token code path.
- Role is a boolean flag (`isOwner`) on the same `User`/`Owner` model family,
  not a separate role enum — routes/controllers branch on `req.user.isOwner`.
- Backend responses are always wrapped in `ApiResponse`/`ApiError` for a
  consistent `{ statusCode, success, message, data }` shape.
- File uploads always go through Multer (temp disk) → Cloudinary (permanent
  URL) → the local temp file is deleted after upload.
- Several models/controllers (`Order`, `Payment`, `Discount`, `Address`) are
  present but only partially implemented — treat them as in-progress, not as
  working features, until you've confirmed the specific flow you need.
