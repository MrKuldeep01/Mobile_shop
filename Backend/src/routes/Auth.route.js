import {Router} from "express"
const router = Router();
import {login, register} from "../controllers/Auth.controller.js"

router.route('/register').post(register)
router.route('/login').post(login)
// "http://localhost:3000/api/v1/auth/register"

export default router;