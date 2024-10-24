import mongoose from "mongoose";
import constants from "../constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import envConfig from "../../Config/envConfig.js";

const historySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobile: {
      type: Number,
      required: [true, "Mobile number is required."],
      unique: [true, "This mobile number is used by someone."],
    },
    upiID: String,
    upiName: String,
    upiCurrencyCode: {
      type: String,
      default: "INR",
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    shopName: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    image: {
      type: String,
      required: true,
      // default: "https://cdn2.iconfinder.com/data/icons/business-persons-flat-1/512/person_3-512.png",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    experience: {
      type: Number,
      default: 0,
    },
    isOwner: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
      enum: ["dark", "light"],
      default: "light",
    },
    rating: {
      type: Number,
      min: [1, "Rating must be vary from 1 - 5"],
      max: [5, "Rating must be vary from 1 - 5"],
      default: 1,
    },
    history: {
      type: [historySchema],
    },
  },
  { timestamps: true }
);

ownerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("hasing the password ...");
  this.password = await bcrypt.hash(this.password, constants.bcryptRound);
  console.log("done, hash pass is ready");
  next();
});
// hash the given password and save to the user

ownerSchema.methods.checkPassword = async function (passwordString) {
  // check password and return true or false
  return await bcrypt.compare(passwordString, this.password);
};
ownerSchema.methods.generateAccessToken = function () {
  // generate Access Token
  // return schemaMethods.generateAccessToken();
  const accessToken = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      gmail: this.gmail,
      mobile: this.mobile,
      gender: this.gender,
      isOwner: this.isOwner,
    },
    envConfig.accessTokenSecretKey,
    { expiresIn: envConfig.accessTokenExpiry }
  );
  // console.log("Done : access token generating.",accessToken);
  console.log("done: access token generated");
  return accessToken;
};
ownerSchema.methods.generateRefreshToken = function () {
  // generate refresh Token
  // return schemaMethods.generateRefreshToken();
  const refreshToken = jwt.sign(
    { _id: this._id },
    envConfig.refreshTokenSecretKey,
    { expiresIn: envConfig.refreshTokenExpiry }
  );
  console.log("Done: refresh token generated");

  return refreshToken;
};
export const Owner = mongoose.model("Owner", ownerSchema);
