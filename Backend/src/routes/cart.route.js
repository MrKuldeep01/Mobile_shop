import { Router } from "express";
import { addProductToCart, removeProductFromCart, updateCartItemQuantity } from "../controllers/Cart.controller.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";
const router = Router();

// to ways of writing routers
// router.get("/",(req,res,next)=>{
//     console.log("this is from middelware!");
//     next();
// },(_,res)=>{
//   res.send("hello sir this is working...");
// })

// add product to cart ✅
// PROTECTED 
// PRODUCT ID AS AN PARAMS WITHOUT ANY NAME
router.route("/add/:productId").post(authMidd, addProductToCart);

router.route("/update/:productId").patch(authMidd, updateCartItemQuantity);

// remove product from cart ✅
router.route("/remove/:productId").post(authMidd, removeProductFromCart);
export default router;
