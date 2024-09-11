import {Router} from "express"
const router = Router();
import {login, register} from "../controllers/Auth.controller.js"

router.route('/register').post(register)
router.route('/login').post(login)








export default router;