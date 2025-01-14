import express from "express";
import envConfig from "../Config/envConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import constants from "./constants.js";
const app = express();
// Define the CORS options with dynamic origin handling
const allowedOrigins = [
  "http://localhost:5173",
  "https://mobile-shop-frontend-brown.vercel.app",
  "https://mobileshopweb.netlify.app"
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins array or if it's undefined (for non-browser requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Block the request
    }
  },
  credentials: true, // Allow cookies to be sent
};

// Apply CORS middleware
app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import homeRouter from "./routes/Home.route.js";
import authRoute from "./routes/Auth.route.js";
import productRoute from "./routes/Products.route.js";
import cartRoute from "./routes/Cart.route.js";
import reviewRoute from "./routes/Review.route.js";
import profileRoute from "./routes/Profile.route.js";

app.use(`${constants.baseUrl}/`, homeRouter);
app.use(`${constants.baseUrl}/auth`, authRoute);
app.use(`${constants.baseUrl}/products`, productRoute);
app.use(`${constants.baseUrl}/cart`, cartRoute);
app.use(`${constants.baseUrl}/review`, reviewRoute);
app.use(`${constants.baseUrl}/profile`, profileRoute);

export default app;
