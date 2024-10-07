import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'
import envConfig from "../../Config/envConfig";
import { User as userModel } from "../models/User.model.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import constants from "../constants.js";
export const getCurrentUser = AsyncHandler(async (req, res, next)=>{
    const accessToken = req.cookies?.accessToken;
    if(!accessToken){
        return res.redirect(`${constants.baseUrl}auth/login`)
    }

    const payload = jwt.verify(accessToken,envConfig.accessTokenSecretKey)
    console.log(`if data available then payload =  ${payload}`);
    if(!payload){
        return res.redirect(`${constants.baseUrl}auth/login`)
    }
    let currentUser={};
    if(payload?.isOwner || payload?.isOwner=='true'){
        currentUser = await ownerModel.findById(payload?._id).select("-password -refreshToken");
        console.log("owner fetched");
        req.user = currentUser ;
        return next();
    }
    else{
        currentUser = await userModel.findById(payload?._id).select("-password -refreshToken");
        console.log("user fetched");
        req.user= currentUser;
        return next();
    }
 
})