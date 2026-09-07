# Architecture

## Overview

Mobile_shop is a two-tier MERN application:

```
Frontend/ (React + Vite SPA)  --HTTP/JSON+cookies-->  Backend/ (Express API)  --Mongoose-->  MongoDB
                                                              |
                                                              +--> Cloudinary (product/profile images)
```

There is no shared code, no monorepo tooling (no workspaces/turborepo/lerna),
and no process manager that starts both sides together. They are two
independent Node projects that happen to sit in one git repo, wired together
only by:

- an HTTP contract (routes under `/api/v1/...`, JSON bodies, `multipart/form-data`
  for file uploads), and
- shared-by-convention env vars (`Frontend`'s `VITE_SERVER_BASE_URI` must equal
  `Backend`'s `http(s)://host:port` + `/api/v1`).

## Backend shape

`Backend/src/app.js` builds the Express app: CORS (allow-list of specific
frontend origins), cookie/json/urlencoded parsing, `public/` static file
serving, then mounts routers under a single `constants.baseUrl` (`/api/v1`):

- `/api/v1/` → `Home.route.js` (a placeholder landing page)
- `/api/v1/auth` → register/login/logout
- `/api/v1/products` → catalog CRUD + search
- `/api/v1/cart` → add/update/remove cart items
- `/api/v1/review` → product reviews CRUD
- `/api/v1/profile` → current-user, password change, edit details

`src/index.js` is the process entry point: load env, connect to Mongo
(`src/db/index.js`), then `app.listen`.

Requests that need auth go through `middlewares/Auth.middleware.js`, which
reads the `accessToken` cookie, verifies the JWT, loads the corresponding
`User` or `Owner` document (based on the JWT's `isOwner` claim), and attaches
it as `req.user`. There is a single access-control primitive throughout the
codebase: `req.user.isOwner` — there's no separate roles/permissions system.

Controllers are thin: validate input, call the Mongoose model, wrap the
result in `ApiResponse`/`ApiError` (`src/utils/`), and let `AsyncHandler`
forward any thrown error to Express's error pipeline.

Image uploads flow: browser → `multipart/form-data` → Multer writes to
`public/tmp/uploadedFiles` → controller calls `utils/Cloudinary.js` → file is
pushed to Cloudinary and the local temp file is deleted → the Cloudinary URL
is what's actually stored on the Mongo document.

## Frontend shape

`src/main.jsx` defines the entire route tree with `createBrowserRouter` and
wraps it in a Redux `Provider`. `src/App.jsx` is the root route element: it
renders persistent chrome (`Header`, `Footer`, `LowerBar`) around an `Outlet`,
and on mount calls `Profile.getCurrentUser()` to silently restore a session
from the httponly auth cookies, dispatching into the `auth` Redux slice.

Each backend resource has a matching `src/servicies/*.services.js` class that
builds a URL from `VITE_SERVER_BASE_URI` and delegates to the shared
`utils/FetchData.js` wrapper (plain `fetch`, `credentials: "include"`, bodies
packed as `FormData`). Components call these services directly in `useEffect`/
event handlers and push results into Redux slices (`store/*.slice.js`) rather
than using RTK Query or any data-fetching cache layer.

## Deployment

- Frontend is a static SPA build (`vite build`), deployed to **both** Vercel
  (`vercel.json` SPA rewrite) and Netlify (`public/_redirects`) — the backend's
  CORS allow-list in `app.js` explicitly names both origins
  (`mobile-shop-frontend-brown.vercel.app`, `mobileshopweb.netlify.app`).
- Backend is a standalone Node/Express process; nothing in the repo pins a
  specific host (no Dockerfile, no Procfile), so its deployment target isn't
  determinable from the code alone.
- Local dev origin `http://localhost:5173` (Vite's default) is also
  allow-listed in `app.js`.

## Known gaps / in-progress areas

- `Order.controller.js` exists but `createOrder` is an unfinished stub (uses
  an undefined `productModel`) and no `Order` route is registered in `app.js`
  — checkout/orders are modeled in Mongoose but not reachable via the API yet.
- `Payment` and `Discount` models exist with no controllers/routes at all.
- `Address` model exists; profile editing takes a flat `address` string
  rather than using the `Address` collection (see `docs/backend.md`).
