import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { Cart as cartModel } from "../models/Cart.model.js";
import { Product as productModel } from "../models/Product.model.js";

// PROTECTED /////
// product id in params without any name
export const addProductToCart = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Please login first!");
  }
  const productId = req.params?.productId;
  if (!productId) {
    throw new ApiError(400, "bad request, provide product id properly");
  }
  const product = await productModel.findById(productId);
  if (!product) {
    throw new ApiError(409, "Not a valid product id");
  }
  /*
    userId,
    productId,
    quantity,
    */
  const productInCart = await cartModel.findOne({
    userId: user._id, productId });
  // quantity = productInCart ? (productInCart.quantity + 1) : 1;
  let addedProduct;
  if(productInCart){
    productInCart.quantity += 1;
    addedProduct = await productInCart.save();
  }else{
    addedProduct = await cartModel.create({
      userId: user._id,
      productId,
      quantity: 1
    });
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        ` ${product.name}, ${product.model} is successfully added in cart.`,
        addedProduct
      )
    );
});

// ... existing imports and code ...

// PROTECTED /////
export const updateCartQuantity = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Please login first!");
  }

  const productId = req.params?.productId;
  if (!productId) {
    throw new ApiError(400, "Bad request, provide product id properly");
  }

  const { quantity } = req.body;
  if (!quantity || !Number.isInteger(Number(quantity)) || quantity < 1) {
    throw new ApiError(400, "Please provide a valid quantity (positive integer)");
  }

  const productInCart = await cartModel.findOne({
    userId: user._id,
    productId
  });

  if (!productInCart) {
    throw new ApiError(404, "Product not found in cart!");
  }

  productInCart.quantity = quantity;
  const updatedProduct = await productInCart.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Cart quantity updated successfully.",
        updatedProduct
      )
    );
});


// PROTECTED /////
export const removeProductFromCart = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Please login first!");
  }
  const productId = req.params?.productId;
  if (!productId) {
    throw new ApiError(400, "bad request, provide product id properly!");
  }
  const productInCart = await cartModel.findOne({ 
    userId: user._id,
    productId 
});
  if(!productInCart){
    throw new ApiError(400,"Product is not available in cart!")
  }
  // delete product from cart
  const removedProduct = await cartModel.deleteOne({
    userId: user._id,
    productId
  });

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      `${product.name} removed from cart successfully.`,
      removedProduct
    )
  );
});

