import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import envConfig from "../../Config/envConfig.js";
import { User as userModel } from "../models/User.model.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import constants from "../constants.js";
// import ApiError from "../utils/ApiError.js";
export const getCurrentUser = AsyncHandler(async (req, res, next) => {
  const accessToken = await req.cookies?.accessToken || req.header["Authorization"]?.replace("Bearer ", "");
  // const refreshToken = await req.cookies?.refreshToken;
  console.log(req.cookies.accessToken && "cookies are available.");
  if (!accessToken) {
    console.log("access token is not found");
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Please login first.",
      data: null,
    });
  }

  function varifyToken(token, tokenKey) {
    try {
      return jwt.verify(String(token), tokenKey);
    } catch (error) {
      return null;
    }
  }
  let payload = null;
  try {
    payload = varifyToken(accessToken, envConfig.accessTokenSecretKey);
    if(!payload)throw new Error("jwt Token expired!")    
  } catch (error) { 
    return res.status(406)
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({
      success: false,
      message: "jwt tokens expired!",
      data: null,
    });
  }

  let currentUser = {};
  if (payload?.isOwner || payload?.isOwner == "true") {
    currentUser = await ownerModel
      .findById(payload?._id)
      .select("-password -refreshToken");
    console.log("Owner ", currentUser.name, "[", currentUser.gmail,"] is online :)");
    req.user = currentUser;
    return next();
  } else {
    currentUser = await userModel
      .findById(payload?._id)
      .select("-password -refreshToken");
      console.log("User ", currentUser.name, "[", currentUser.gmail,"] is online :)");
    req.user = currentUser;
    return next();
  }
});
