import mongoose from "mongoose";
/* 
user_id
product_id
rating
review_text
created_at
*/
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      required: true,
      min:[1,"Rating can be vary between 1 - 5"],
      max:[5,"Rating can be vary between 1 - 5"]
    },
    reviewText: {
      type: String,
    },
  },
  { timestamps: true }
);
export const Review = mongoose.model("Review", reviewSchema);
