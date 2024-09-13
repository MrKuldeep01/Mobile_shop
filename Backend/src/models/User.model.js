import mongoose from "mongoose";
import schemaMethods from "../utils/SchemaMethods.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index:true,
    },
    gmail: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      },
      message: (v) => `${v.value} is not valid gmail!`,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "",
    },
    refreshToken: String,
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
      default: "male",
    },
    address: {
      type: String,
    },
    history: [
      {
        owner: {
          owner: mongoose.Schema.Types.ObjectId,
          ref: "Owner",
        },
        product: {
          owner: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        doneOn: Date.now(),
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save",schemaMethods.hashPassword(next))
// hash the given password and save to the user 

userSchema.methods.checkPassword = function (password){
// check password and return true or false
 return schemaMethods.checkPassword(password)
}
userSchema.methods.generateAccessToken = function (){
// generate Access Token
return schemaMethods.generateAccessToken();
}
userSchema.methods.generateRefreshToken = function (){
// generate refresh Token
return schemaMethods.generateRefreshToken();
}

export const User = mongoose.model("User", userSchema);