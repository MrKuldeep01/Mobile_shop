import mongoose from "mongoose";
import schemaMethods from "../utils/SchemaMethods.js";
const historySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      required: true,
    },
    image: {
      type: String,
      required: true,
      default:
        "https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png",
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
        historySchema,
      },
    ],
  },
  { timestamps: true }
);

// userSchema.pre("save", schemaMethods.hashPassword(next));
userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();
    console.log("hasing the password ...");
    this.password = await bcrypt.hash(this.password, constants.bcryptRound);
    console.log("done, hash pass is ready");
    next();
});
// hash the given password and save to the user

userSchema.methods.checkPassword = function (password) {
  // check password and return true or false
  return schemaMethods.checkPassword(password);
};
userSchema.methods.generateAccessToken = function () {
  // generate Access Token
  return schemaMethods.generateAccessToken();
};
userSchema.methods.generateRefreshToken = function () {
  // generate refresh Token
  return schemaMethods.generateRefreshToken();
};

export const User = mongoose.model("User", userSchema);
