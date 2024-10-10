import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import { Cart as cartModel } from "../models/Cart.model.js";
import { Product as productModel } from "../models/Product.model.js";

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
  const isProductInCart = await cartModel.find({ productId });
  quantity = isProductInCart ? (isProductInCart.length + 1) : 1;
  const addedProduct = await cartModel.create({
    userId: user._id,
    productId,
    quantity,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        202,
        ` ${product.name}, ${product.model} is successfully added in cart.`,
        addedProduct
      )
    );
});

export const removeProductFromCart = AsyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "Please login first!");
  }
  const productId = req.params?.productId;
  if (!productId) {
    throw new ApiError(400, "bad request, provide product id properly");
  }
  const isProductInCart = await cartModel.findOne({ productId });
  if(!isProductInCart){
    throw new ApiError(400,"Product is not available in cart!")
  }
  const removedProduct = await cartModel.deleteMany({
    userId: user._id,
    productId
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        202,
        `Product removed from cart successfully.`,
        removedProduct
      )
    );
});

