import mongoose from "mongoose";
import schemaMethods from "../utils/SchemaMethods.js";
import bcrypt from "bcrypt"
import constants from "../constants.js";
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
      required: true,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
    },
    refreshToken:{
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Address"
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
  return schemaMethods.generateAccessToken();
};
userSchema.methods.generateRefreshToken = function () {
  // generate refresh Token
  return schemaMethods.generateRefreshToken();
};

export const User = mongoose.model("User", userSchema);
