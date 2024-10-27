import { Router } from "express";
const router = Router();
import {
    editUser,
  getCurrentUser,
  passwordChange,
} from "../controllers/Auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";

// getCurrentUser PROTECTED /////////✅
router.route("/currentUser").post(authMidd, getCurrentUser);

//  password change  PROTECTED /////////✅
/*
gmail || mobile, prePassword, newPassword 
*/
router.route("/password-change").post(authMidd, passwordChange);

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
router.route("/editDetails").post(authMidd, upload.single('image'), editUser);

export default router;
