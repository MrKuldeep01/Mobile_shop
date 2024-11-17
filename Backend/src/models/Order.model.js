/*
// Order Model
Purpose: Manage customer orders.
Attributes:

user_id
product_id
quantity
total_price
status (pending/shipped/delivered/cancelled)
order_date
shipping_address

*/

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
  status: {
    type: String,
    enum: ["pending", "Shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
});
export const Order = mongoose.model("Order", orderSchema)