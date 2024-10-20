import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'
import envConfig from "../../Config/envConfig.js";
import { User as userModel } from "../models/User.model.js";
import { Owner as ownerModel } from "../models/Owner.model.js";
import constants from "../constants.js";
export const getCurrentUser = AsyncHandler(async (req, res, next)=>{
    const accessToken = await req.cookies?.accessToken;
    console.log("fetching user's details...")
   

    if(!accessToken){
    console.log(`redirecting unauthorized user to login page: ${constants.baseUrl}/auth/login`)
        return res.redirect(`${constants.baseUrl}/auth/login`)
    }
   
    const payload = jwt.verify(String(accessToken),envConfig.accessTokenSecretKey)
    console.log(`if data available then payload =  ${payload}`);
    if(!payload){
    console.log(`redirecting unauthorized user to login page: ${constants.baseUrl}/auth/login`)
        return res.redirect(`${constants.baseUrl}/auth/login`)
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