import express from "express";
import envConfig from "../Config/envConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import constants from "./constants.js";
const app = express();
// Define the CORS options with dynamic origin handling
const corsOptions = {
    origin: (origin, callback) => {
      if (origin) {
        // Log the incoming origin for debugging
        console.log(`Origin received: ${origin}`);
      }
  
      // Allow all origins dynamically
      callback(null, origin);
    },
    credentials: true, // Allow cookies or credentials to be sent
  };
  
  // Use the CORS middleware with the defined options
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
