import { Router } from "express";
const router = Router();
import {
  createProductReview,
  removeProductReview,
  updateProductReview,
} from "../controllers/Review.controller.js";
import { getCurrentUser as authMidd } from "../middlewares/Auth.middleware.js";

//      router.route("/currentUser").post(authMidd, getCurrentUser);
router.route("/product/new/:productId").post(authMidd, createProductReview);
// protected
// review id in params

router.route("/product/remove/:reviewId").post(authMidd, removeProductReview);

// protected
// review id in params
router.route("/product/update/:reviewId").post(authMidd, updateProductReview);

export default router;
