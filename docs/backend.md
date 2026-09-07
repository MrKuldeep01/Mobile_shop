# Backend detail

Location: `Backend/`. Node + Express 5, ESM modules, MongoDB via Mongoose 8.

## Entry point & bootstrap

- `src/index.js`: `dotenv.config()` → `connection()` (Mongo) → `app.listen(port)`.
  `port` is `3000 || process.env.PORT`, which always resolves to `3000` — this
  is a bug (`||` short-circuits on the truthy literal), so setting `PORT` in
  the environment currently has no effect.
- `src/db/index.js`: connects Mongoose to `${DB_URI}/${constants.dataBaseName}`
  (`dataBaseName` is hardcoded `"MobileShop"` in `src/constants.js`), exits the
  process (`process.exit(1)`) on connection failure.
- `src/app.js`: CORS allow-list (`localhost:5173`, the Vercel and Netlify
  frontend URLs), cookie-parser, `express.json()`, `express.urlencoded()`,
  `express.static("public")`, then mounts every router under `constants.baseUrl`
  (`/api/v1`). Note it imports `./routes/Cart.route.js` (capital C) while the
  file on disk is `cart.route.js` — only works today because the dev/deploy
  filesystem is case-insensitive.

## Config

`Config/envConfig.js` centralizes all `process.env` reads:
`DB_URI`, `ALLOWED_ORIGIN`, `ACCESSTOKENSECRETKEY`, `ACCESSTOKENEXPIRY`,
`REFRESHTOKENSECRETKEY`, `REFRESHTOKENEXPIRY`, `CLOUDINARYNAME`,
`CLOUDINARYKEY`, `CLOUDINARYSECRET`, `CLOUDINARYURL`. (`ALLOWED_ORIGIN` is
read but not actually referenced by the CORS config in `app.js`, which uses a
hardcoded array instead.)

`src/constants.js` holds cross-cutting constants: DB name, bcrypt rounds (12),
cookie options for access/refresh tokens (`httpOnly`, `secure`, `sameSite:
"none"`), and the `/api/v1` base path.

## Routes → Controllers

| Route file | Mount | Endpoints |
|---|---|---|
| `Home.route.js` | `/api/v1/` | `GET /` — placeholder HTML landing page |
| `Auth.route.js` | `/api/v1/auth` | `POST /register` (multipart, `image` field), `POST /login`, `POST /logout` (protected) |
| `Products.route.js` | `/api/v1/products` | `GET /` (paginated list), `POST /add` (protected, owner only, multipart), `POST /edit/:productId` (protected, multipart), `POST /search/:productName`, `POST /:productId` (get one — uses POST, not GET), `DELETE /delete/:productId` (protected) |
| `cart.route.js` | `/api/v1/cart` | `POST /add/:productId` (protected), `PATCH /update/:productId` (protected), `POST /remove/:productId` (protected) |
| `Review.route.js` | `/api/v1/review` | `POST /product/new/:productId`, `POST /product/remove/:reviewId`, `POST /product/list/:productId`, `POST /product/update/:reviewId` — all protected |
| `Profile.route.js` | `/api/v1/profile` | `POST /currentUser` (protected), `POST /password-change` (protected), `POST /editDetails` (protected, multipart) |

Several routes use `POST` where `GET`/`DELETE` would be more conventional
(e.g. fetching a single product, listing reviews) — this is consistent across
the codebase, not a one-off typo, so treat it as the existing convention when
adding new endpoints.

`Order.controller.js` (`src/controllers/Order.controller.js`) defines
`createOrder`, but it references an undefined `productModel`, has no matching
route file, and is not mounted in `app.js` — it is dead/unfinished code today.

## Controllers

- **Auth.controller.js** — `register` (branches into `registerUser`/
  `registerOwner` based on `isOwner` in the body; uploads an image via
  Cloudinary or falls back to a GitHub-hosted default avatar), `login`
  (looks up `Owner` or `User` by gmail/mobile depending on `isOwner`, checks
  password, issues both tokens as cookies), `logout` (clears cookies, nulls
  `refreshToken` on the user doc if authenticated).
- **Products.controller.js** — `addProduct`/`editProduct` (owner-only,
  `req.user.isOwner` check, image via Cloudinary), `getProducts` (paginated,
  `page`/`limit` query params, sorted newest-first), `searchProducts` (exact
  name match, not full-text search), `getProduct` (by id), `deleteProduct`
  (owner-only).
- **cart.controller.js** — `addProductToCart` (increments quantity if the
  product is already in the user's cart, otherwise creates a `Cart` doc),
  `updateCartQuantity`, `removeProductFromCart`. Cart is scoped by
  `{ userId, productId }` — no owner/shop-level cart concept.
- **Review.controller.js** — `createProductReview`, `removeProductReview`,
  `getProductReviews`, `updateProductReview`, all keyed by `userId`/`ownerId`
  + `productId`. `updateProductReview` references a bare `user` variable that
  is never defined in that function's scope — likely a latent bug if that
  branch is exercised.
- **Profile.controller.js** — `getCurrentUser` (returns `req.user` as set by
  the auth middleware), `passwordChange` (re-checks the previous password
  before overwriting), `editUser` (patches gmail/mobile/name/address/image/
  experience; commented-out code shows an abandoned attempt to also manage a
  separate `Address` document per user).

## Models (`src/models/`)

- **User** / **Owner** — near-identical schemas (name, gmail [unique,
  lowercase], mobile [unique], password [bcrypt-hashed via a `pre("save")`
  hook], image, gender enum, `isOwner` flag, `theme` enum, and an embedded
  `history[]` of `{ productId, ownerId|customerId }`). Both carry
  `checkPassword`, `generateAccessToken`, `generateRefreshToken` instance
  methods signing with the same `envConfig` secrets. `Owner` additionally has
  `upiID`/`upiName`/`upiCurrencyCode`, `shopName`, `rating`, `experience`, and
  an `orders[]` ref array.
- **Product** — name, price, model, desc, image, quantity (default 1),
  `catagory: [String]` (free-form array, not a formal enum, though a comment
  in the file documents the intended category vocabulary).
- **Cart** — `{ userId, productId, quantity, addedDate }`, one document per
  user+product pair.
- **Review** — `{ userId | ownerId, productId, user (raw object snapshot),
  rating (1-5), reviewText }`.
- **Order** — `{ userId, products[], status enum, orderDate, quantity,
  totalPrice, shippingAddress → Address }`. Defined but not wired to any
  working route (see above).
- **Address** — `{ userId | ownerId, localAddress, city, postCode, state,
  country (default "India") }`. Defined but not created/read from any
  controller currently in use.
- **Payment** — `{ orderId, paymentStatus, paymentMethod, transactionId,
  paymentDate }`. No controller references it; the file's own trailing
  comment says payments aren't implemented yet ("I DON'T HAVE ENOUGH
  KNOWLEDGE ABOUT PAYMENTS...").
- **Discount** — `{ productId, discountPercent, startDate, endDate }`. No
  controller references it.

## Middleware & utils

- `middlewares/Auth.middleware.js` — reads `accessToken` from cookies (or a
  `Bearer` header as a fallback), verifies the JWT, loads the `Owner` or
  `User` doc by the token's `isOwner` claim, attaches `req.user`, calls `next()`.
  On missing/invalid/expired token it responds directly (401/406) rather than
  throwing, so it does not go through `ApiError`.
- `middlewares/multer.middleware.js` — disk storage into
  `public/tmp/uploadedFiles`, filename `<fieldname>_<random>.<ext>`.
- `utils/ApiError.js` / `utils/ApiResponse.js` — uniform error/response
  envelope: `{ statusCode, success, message, data, errors }`.
- `utils/AsyncHandler.js` — wraps controller functions, forwards any thrown
  error into `next(new ApiError(...))`.
- `utils/Cloudinary.js` — uploads a local file path to Cloudinary
  (`resource_type: "auto"`), deletes the local temp file whether the upload
  succeeds or fails, returns the hosted URL (or `null` on failure).

## Packages

express, mongoose, jsonwebtoken, bcrypt, multer, cloudinary, cookie-parser,
cors, dotenv (dev), nodemon (dev). `npm run dev` = `nodemon -r dotenv/config
--experimental-json-modules src/index.js`. There is no `npm start`/production
script defined — `dev` is the only script in `Backend/package.json`.
