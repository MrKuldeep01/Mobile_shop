import {Router} from "express"
const router = Router();
import {login, register} from "../controllers/Auth.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

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
// "http://localhost:3000/api/v1/auth/register"

export default router;  