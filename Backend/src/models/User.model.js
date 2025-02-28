import mongoose from "mongoose";
import bcrypt from "bcrypt"
import constants from "../constants.js";
import jwt from "jsonwebtoken"
import envConfig from "../../Config/envConfig.js";
const historySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      unique: true,
    },
    isOwner : {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
    },
    refreshToken:{
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    address: {
      type: String,
    },
    theme:{
      type:String,
      enum:["dark", "light"],
      default: "light"
    },
    history: {
      type : [
        historySchema
      ]
    }
  },
  { timestamps: true }
);

// userSchema.pre("save", schemaMethods.hashPassword(next));
userSchema.pre("save", async function(next){
  if (!this.isModified("password")) return next();
    console.log("hasing the password ...");
    this.password = await bcrypt.hash(this.password, constants.bcryptRound);
    console.log("done, hash pass is ready");
    next();
});

// hash the given password and save to the user

userSchema.methods.checkPassword = async function (passwordString){
  // check password and return true or false
  return await bcrypt.compare(passwordString, this.password);
  }
userSchema.methods.generateAccessToken = function () {
  // generate Access Token
  // return schemaMethods.generateAccessToken();
  const accessToken = jwt.sign(
    { 
        _id: this._id,
        name: this.name,
        gmail: this.gmail,
        mobile: this.mobile,
        gender: this.gender,
        isOwner: this.isOwner
    },
envConfig.accessTokenSecretKey,
{ expiresIn: envConfig.accessTokenExpiry }
);
// console.log("Done : access token generating.",accessToken);
console.log("done : access token generated");
return accessToken;
};
userSchema.methods.generateRefreshToken = function () {
  // generate refresh Token
  // return schemaMethods.generateRefreshToken();
  const refreshToken = jwt.sign(
    { _id: this._id },
    envConfig.refreshTokenSecretKey,
    { expiresIn: envConfig.refreshTokenExpiry }
  );
  console.log("done: refresh token generated");
  
  return refreshToken;
};

export const User = mongoose.model("User", userSchema);
