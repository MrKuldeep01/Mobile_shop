import { Router } from "express";
import { addProduct, getProducts, getProduct } from "../controllers/Products.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();
// path is  :   /product
//all products
router.route("/").post(getProducts);
// single product
// router.route("/:productId").post(getProduct);


// add or edit product
// field name must be : image
// router.route("/add").post(addProduct);
router.route("/add").post(upload.single('image'), addProduct);

export default router;
 