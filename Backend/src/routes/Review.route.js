import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
import {
  createProductReview,
  removeProductReview,
  updateProductReview,
} from "../controllers/Review.controller.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";

//      router.route("/currentUser").post(authMidd, getCurrentUser);
router.route("/product/new/:productId").post(authMidd, upload.none(), createProductReview);
// protected
// review id in params

router.route("/product/remove/:reviewId").post(authMidd, removeProductReview);

// protected
// review id in params
router.route("/product/update/:reviewId").post(authMidd, upload.none(), updateProductReview);

export default router;
