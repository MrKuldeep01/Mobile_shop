# Local dev setup

Both sides are installed and run independently — there is no root
`package.json`, no workspaces, and no `docker-compose.yml` tying them together.
Run each in its own terminal.

## Prerequisites

- Node.js (recent LTS; backend uses ESM + Express 5, frontend uses Vite 5)
- A MongoDB instance (Atlas or local) for the backend
- A Cloudinary account (image uploads will fail without valid credentials,
  though most flows fall back to a hardcoded default image URL if no file is
  provided)

## 1. Backend

```bash
cd Backend
npm install
```

Create `Backend/.env` (read by `Config/envConfig.js`):

```bash
DB_URI=mongodb+srv://<user>:<pass>@<cluster>/          # no db name suffix — MobileShop is appended in code
ALLOWED_ORIGIN=http://localhost:5173                    # read but currently unused by the CORS logic in app.js
ACCESSTOKENSECRETKEY=<random-secret>
ACCESSTOKENEXPIRY=1d
REFRESHTOKENSECRETKEY=<random-secret>
REFRESHTOKENEXPIRY=10d
CLOUDINARYNAME=<cloudinary-cloud-name>
CLOUDINARYKEY=<cloudinary-api-key>
CLOUDINARYSECRET=<cloudinary-api-secret>
CLOUDINARYURL=<cloudinary-url>                          # (cloudinary:// connection string, if you use it)
```

Run it:

```bash
npm run dev     # nodemon -r dotenv/config --experimental-json-modules src/index.js
```

The server listens on port **3000** (hardcoded — see `docs/backend.md` for the
`3000 || process.env.PORT` bug that makes a `PORT` env var currently
ineffective). The API base path is `/api/v1` (from `src/constants.js`).

## 2. Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env` (read by `config/envConfig.js` via Vite's `import.meta.env`):

```bash
VITE_SERVER_BASE_URI=http://localhost:3000/api/v1
```

Run it:

```bash
npm run dev     # vite, default port 5173
```

Open `http://localhost:5173`. The backend's CORS allow-list in
`Backend/src/app.js` already includes `http://localhost:5173`, so no CORS
config change is needed for local dev at the default Vite port.

## Talking to each other

- The frontend never proxies through Vite — it calls
  `VITE_SERVER_BASE_URI` directly from the browser, so the backend must be
  reachable from wherever the frontend is loaded (same machine for local dev).
- Auth is cookie-based: the backend sets `accessToken`/`refreshToken` as
  `httpOnly` cookies with `sameSite: "none"; secure: true`. Cookies marked
  `secure` are only sent over HTTPS by the browser — plain
  `http://localhost` normally still allows this in Chrome/Firefox for
  `localhost`, but if login/session-restore appears to silently fail locally,
  check this cookie flag combination first (some browsers/versions are
  stricter about `secure` cookies over `http://localhost` than others).
- Uploads (register with a photo, add/edit product, edit profile) require a
  working Cloudinary config on the backend; without it, upload calls will
  fail and error responses will surface in the corresponding
  `src/servicies/*.services.js` call.

## Things to double check before relying on a feature

- Orders/checkout: modeled (`Order` schema) but not implemented end-to-end —
  see `docs/backend.md`. Don't assume `/api/v1/order*` exists.
- Payments and discounts: models only, no controllers/routes at all.
- `npm start` is not defined for the backend — only `npm run dev` (nodemon).
  If deploying to a host that runs `npm start` by convention, that script
  needs to be added first.
