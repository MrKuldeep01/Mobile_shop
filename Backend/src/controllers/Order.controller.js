import { Order as orderModel } from "../models/Order.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
/*
  {productId,
  status: {
    type: String,
    enum: ["pending", "Shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate,
  quantity,
  totalPrice,
  shippingAddress,
}
*/


/*
create order 
- get data : status, orderDate, quantity, totalPrice, shippingAddress
    - get productId from params
    - get userId from req.user._id  
- validate input data including productid and userId as well: 
    - is available or not
    - is valid or not
- create order
- check if order is created or not
- send response via ResponseHandler with proper message and order data
*/
export const createOrder = AsyncHandler(async (req, res) => {
  const { status, orderDate, quantity, totalPrice, shippingAddress } = req.body;
  const productId = req.params.productId;   
  const userId = req.user._id;
  for(const key in { status, orderDate, quantity, totalPrice, shippingAddress }){
    if(req.body[key].trim() == "" && !req.body[key]){
      throw new ApiError(`${key} is required and cannot be empty`);
    }
  }
  const product = await productModel.findById(productId);
  if(!product){
    throw new ApiError("Product not found with the given productId :: Error in order creation :: Order controller ");
  }
  // I will come back to this later ==== TODO

})