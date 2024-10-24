import {Router} from "express"
const router = Router();
import {login, logout, register} from "../controllers/Auth.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";
// "http://localhost:3000/api/v1/auth/{register}"

//MULTER: SINGLE FILE NAMED IMAGE /////////
// register ✅
/*
name,
    gmail,
    mobile,
    gender,
    password,
    address,
    rating,
    experience,
    isOwner,
    image from file with name 'image'
*/

router.route('/register').post(upload.single('image'),register)

/* login 
    password, gmail || mobile, isOwner  ✅
*/
router.route('/login').post(login)

// Protected : logout
router.route('/logout').post(authMidd, logout)
export default router;  