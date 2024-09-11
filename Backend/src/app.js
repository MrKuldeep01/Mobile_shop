import express from "express";
import envConfig from "../Config/envConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import constants from "./constants.js";
const app = express();
app.use(cors({ origin: envConfig.allowed_Origin}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))

import homeRouter from "./routes/home.js"
app.use(`${constants.baseUrl}/`,homeRouter)

export default app;
