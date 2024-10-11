/*
product_id
discount_percentage
start_date
end_date
*/
import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  discountPercent: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

export const Discount = mongoose.model("Discount", discountSchema);
