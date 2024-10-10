import { Router } from "express";
const router = Router();
import {
    editUser,
  getCurrentUser,
  passwordChange,
} from "../controllers/Auth.controller.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";

// getCurrentUser PROTECTED /////////
router.route("/profile/currentOwner").post(authMidd, getCurrentUser);

//  password change  PROTECTED /////////
router.route("/profile/passwordChange").post(authMidd, passwordChange);

//  editUser  PROTECTED /////////
//MULTER: SINGLE FILE NAMED IMAGE /////////
/*
   newGmail,
    newMobile,
    localAddress,
    city,
    postCode,
    state,
    experience,
*/
router.route("/profile/editDetails").post(authMidd, upload.Single('image'), editUser );

export default router;
