import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import envConfig from "../../Config/envConfig.js"
import constants from "../constants.js";

// to be used in pre save hook in usermodel and owner model as well
// const hashPassword = async (next) => {
//   if (!this.isModified("password")) return next();
//     console.log("hasing the password ...");
//     this.password = await bcrypt.hash(this.password, constants.bcryptRound);
//     console.log("done, hash pass is ready");
//     next();
// };

// to check the password at any time
// to generate tokens
// REFRESH TOKEN 
const generateRefreshToken = async function(){
  const refreshToken = jwt.sign(
    { _id: this._id },
    envConfig.refreshTokenSecretKey,
    { expiresIn: envConfig.refreshTokenExpiry }
  );
  console.log("Done : refresh token generating.",refreshToken);
  
  return refreshToken;
}; 
// ACCESS TOKEN
const generateAccessToken = async function (){
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
console.log("Done : access token generating.",accessToken);
  return accessToken;
};

export default {
  generateAccessToken,
  generateRefreshToken,
};
