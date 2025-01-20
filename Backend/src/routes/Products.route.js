import { Router } from "express";
import {
  addProduct,
  editProduct,
  getProducts,
  getProduct,
  deleteProduct,
  searchProducts
} from "../controllers/Products.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";
// path is  :   /products
//all products ✅
// Get all products should use GET method instead of POST since it's retrieving data
router.route("/").get(getProducts); 

// add product
// MULTER SINGLE FILE NAMED  : image
/*
name, desc, model, catagory, price, quantity  ✅
*/
router.route("/add").post(authMidd, upload.single("image"), addProduct);

// edit product
/*
PRODUCT ID IN PARAMS without any name
MULTER SINGLE FILE NAMED IMAGE
name, desc, price, catagory, model, quantity ✅
*/
router
  .route("/edit/:productId")
  .post(authMidd, upload.single("image"), await editProduct);

// get products 
// product name in params is requested without any name
router.route("/search/:productName").post(searchProducts);

// get single product
// product id in params is requested without any name
router.route("/:productId").post(getProduct);

// delete single product
// product id in params is requested without any name
router.route("/delete/:productId").delete(authMidd, deleteProduct);
export default router;
