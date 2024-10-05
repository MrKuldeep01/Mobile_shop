import { Router } from "express";
import { addProduct, editProduct, getProducts, getProduct, deleteProduct } from "../controllers/Products.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router();
// path is  :   /products

//all products
router.route("/").post(getProducts);

// add or edit product
// field name must be : image
router.route("/add").post(upload.single('image'), await addProduct);

// router.route("/add").post(addProduct);
// edit product 
router.route("/edit/:productId").post(upload.single('image'), await editProduct);

// get single product
router.route("/:productId").post(getProduct);

// delete single product
router.route("/delete/:productId").post(deleteProduct);
export default router;
 