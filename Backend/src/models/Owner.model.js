import mongoose from "mongoose";
import schemaMethods from "../utils/SchemaMethods.js";
import constants from "../constants.js";
import bcrypt from "bcrypt";
const historySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps:true})
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
    upiID:String,
    upiName:String,
    upiCurrencyCode : {
      type:String,
      default:"INR"
    },
    address:{
      type:String
    },
    image: {
      type: String,
      required: true,
      default: "https://cdn2.iconfinder.com/data/icons/business-persons-flat-1/512/person_3-512.png",
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
    gender: {
      type: String,
      enum:  ["male", "female"],
      default: "male",
    },
    experience: {
      type: Number,
      default: 12,
    },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 4,
    },
    history:{
      type : [ historySchema ],
    }
  },
  { timestamps: true }
);


ownerSchema.pre("save",async function(next){
  if (!this.isModified("password")) return next();
    console.log("hasing the password ...");
    this.password = await bcrypt.hash(this.password, constants.bcryptRound);
    console.log("done, hash pass is ready");
    next();
})
// hash the given password and save to the user 

ownerSchema.methods.checkPassword = function (password){
// check password and return true or false
 return schemaMethods.checkPassword(password)
}
ownerSchema.methods.generateAccessToken = function (){
// generate Access Token
return schemaMethods.generateAccessToken();
}
ownerSchema.methods.generateRefreshToken = function (){
// generate refresh Token
return schemaMethods.generateRefreshToken();
}
export const Owner 
= mongoose.model("Owner", ownerSchema);
