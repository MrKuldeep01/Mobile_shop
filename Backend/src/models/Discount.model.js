/*
product_id
discount_percentage
start_date
end_date
*/

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  discountPercent: Number,
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
});
export const Order = mongoose.model("Order", orderSchema);
