import mongoose from "mongoose";
import schemaMethods from "../utils/SchemaMethods.js";
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
      lowercase: true, // This will automatically convert the email to lowercase
      validate: {
        validator: function (v) {
          // Optional: Regular expression to validate email format
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    mobile: {
      type: Number,
      unique: [true, "mobile number is required."],
    },
    payment: String,
    image: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    refresher: String,
    gender: {
      type: String,
      enum: {
        value: ["male", "female"],
      },
      default: "male",
    },
    experience: {
      type: Number,
      default: 12,
    },
    rating: {
      enum: [1, 2, 3, 4, 5],
      default: 4,
    },
    history: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        customer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        doneOn: Date.now(),
      },
    ],
  },
  { timestamps: true }
);

ownerSchema.pre("save",schemaMethods.hashPassword(next))
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
= mongoose.Model("Owner", ownerSchema);
