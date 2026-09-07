# Frontend detail

Location: `Frontend/`. React 18 + Vite (not Create React App), React Router v6,
Redux Toolkit, Tailwind CSS.

## Bootstrap & routing

`src/main.jsx` builds the whole route tree with `createBrowserRouter` and
renders `<Provider store={store}><RouterProvider .../></Provider>`:

```
/                        -> Login
/home                    -> Home
/register                -> Register
/me                      -> Profile
/me/edit                 -> EditProfile
/products                -> Products
/products/search         -> Search
/products/add            -> AddProducts
/products/edit/:productId              -> AddProducts (same component, edit mode)
/products/review/add/:productId        -> ReviewProduct
/products/review/edit/:productId/:reviewId -> ReviewProduct
*                        -> NotFound
```

All routes render as children of `App` (`src/App.jsx`), which is the layout
route: `Header` + `Footer` + `LowerBar` chrome wrapped around `<Outlet/>`
(actual page content), inside a `Container` component. On mount, `App` calls
`Profile.getCurrentUser()` to attempt session restoration from the auth
cookies, dispatching `login`/`logout` (from `store/auth.slice.js`) based on
the result, and shows a `Loading` screen while that check is in flight.

## State management (`src/store/`)

Redux Toolkit, combined in `Store.js`:
- `auth.slice.js` — `{ authStatus, userData }`, actions `login`/`logout`.
- `Product.slice.js` — `{ products[], currentPage, totalPages, isLoading, error }`
  for the paginated catalog view.
- `Cart.slice.js` — `{ products: { [productId]: product } }` keyed map, with
  `setProduct`/`removeProduct`/`clearProducts`/`updateQuantity`/
  `incrementQuantity`/`decrementQuantity`.
- `Review.slice.js` — review state for the currently viewed product (see file
  for exact shape).

There is no cart/product persistence layer talking to the backend for reading
back a saved cart on load beyond what the components wire up manually — cart
state lives in Redux (client-side) with the `Cart` model on the backend used
per-action (add/update/remove), not as a synced source of truth fetched on load.

## Services (`src/servicies/` — note the spelling)

One class per backend resource; each method builds a URL as
`${VITE_SERVER_BASE_URI}/<path>` and calls the shared `fetchData` helper:

- `Auth.services.js` — `register`, `login`, `logout`. Also maintains a
  `handShake` value in `localStorage` (read from the `accessToken` cookie
  after a successful auth call) as a client-side signal/fallback token.
- `Product.services.js` — `getProductList(page, limit)`, `addProduct`,
  `editProduct`, `getProductDetails`, `deleteProduct`, `searchProducts`.
- `Cart.services.js` — `addProductToCart`, `updateCartItemQuantity` (validates
  quantity is a positive integer, capped at 99, client-side), `removeProductFromCart`.
- `Profile.services.js` — `getCurrentUser`, `passwordChange`, `editDetails`.
- `Review.services.js` — `createProductReview`, `deleteProductReview`,
  `getProductReviews`, `updateProductReview`.

## HTTP layer (`utils/FetchData.js`)

A hand-rolled wrapper around the native `fetch` (axios is a listed dependency
but is not actually used for requests):

- Always sends `credentials: "include"` so the httponly auth cookies travel
  with every request.
- For `POST`/`PUT`/`PATCH` with a data payload, packs the payload into a
  `FormData` object (this is why file uploads and plain JSON-like fields share
  one code path across every service class) — no `Content-Type` header is set
  explicitly, so the browser sets the multipart boundary itself.
- For `GET`, appends `data` as query string params instead.
- Auto-detects JSON vs. text response bodies via the `Content-Type` header.
- Reads a `handShake` value from `localStorage` and attaches it as a `Bearer`
  token header — this is a secondary/legacy auth path; cookies are the
  primary mechanism actually verified by the backend's `Auth.middleware.js`.

## Components (`src/components/`)

Pages (re-exported from `src/components/index.js` for the router):
- `Login.jsx`, `Register.jsx` — auth forms (react-hook-form), branch on
  "I am an owner" style toggle to set `isOwner` in the submitted payload.
- `Home.jsx` — landing/showcase page.
- `Products.jsx` — paginated catalog grid, drives `Product.slice.js`.
- `Product.jsx` / `SmallProductCard.jsx` — single product detail vs. compact
  card used in listings.
- `AddProducts.jsx` — owner-only add/edit form (shared component for both
  `/products/add` and `/products/edit/:productId`, branching on whether a
  `productId` param is present).
- `Profile.jsx` / `EditProfile.jsx` — view/edit the logged-in user's or
  owner's profile.
- `ReviewProduct.jsx` / `ReviewCard.jsx` — create/edit a review vs. render one.
- `Search.jsx` — product search by name.
- `NotFound.jsx` — catch-all 404 route element.

Shared chrome/UI: `Header/Header.jsx`, `Footer/Footer.jsx`, `LowerBar.jsx`
(likely a bottom nav/cart bar), `Logo.jsx`, `Button.jsx`, `Input.jsx`,
`Loading.jsx`, `container/Container.jsx` (layout wrapper used by `App.jsx`).

## Build & deploy config

- `vite.config.js` — stock `@vitejs/plugin-react` setup, no custom aliases or
  proxy configured (dev server talks directly to `VITE_SERVER_BASE_URI`, no
  Vite dev proxy is set up for the API).
- `tailwind.config.js` / `postcss.config.js` — Tailwind CSS build pipeline.
- `vercel.json` — SPA rewrite (`/(.*) -> /`) for Vercel hosting.
- `public/_redirects` — equivalent SPA rewrite for Netlify hosting.
- Both are present and the backend's CORS list allow-lists both
  corresponding origins, so the app is (or was) actually deployed to both
  platforms rather than one being leftover config.
