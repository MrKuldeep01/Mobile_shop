import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "./ApiError.js";
import constants from "../constants.js";

// to be used in pre save hook in usermodel and owner model as well
const hashPassword = async (next) => {
  if (!this.isModified("password")) return next();
    console.log("hasing the password ...");
    this.password = await bcrypt.hash(this.password, constants.bcryptRound);
    console.log("done, hash pass is ready");
    next();
};

// to check the password at any time
const checkPassword = async (passwordString) => {
    console.log("checking password...");
    return await bcrypt.compare(passwordString, this.password);
};

// to generate tokens
// REFRESH TOKEN
const generateRefreshToken = async () => {
  const refreshToken = jwt.sign(
    { _id: this._id },
    envConfig.refreshTokenSecretKey,
    { expiresIn: envConfig.refreshTokenExpiry }
  );
  console.log("refresh token generating...");
  
  return refreshToken;
};
// ACCESS TOKEN
const generateAccessToken = async () => {
    const accessToken = jwt.sign(
        { 
            _id: this._id,
            name: this.name,
            gmail: this.gmail,
            mobile: this.mobile,
            gender: this.gender,
            payment: this?.payment || ""
        },
    envConfig.accessTokenSecretKey,
    { expiresIn: envConfig.accessTokenExpiry }
);
console.log("access token generating...");
  return accessToken;
};

export default {
  hashPassword,
  checkPassword,
  generateAccessToken,
  generateRefreshToken,
};
