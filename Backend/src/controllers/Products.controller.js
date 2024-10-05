import AsyncHandler from "../utils/AsyncHandler.js";
import { Product as productModel } from "../models/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import cloudinaryUploader from "../utils/Cloudinary.js";
// all products OK-TESTED
export const getProducts = AsyncHandler(async (req, res) => {
  const products = await productModel.find();
  console.log("getting product list...");
  if(!products){
    throw new ApiError("503", `Faild to load products data`);
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "Product list successfully found", products));
});
// specific product
export const getProduct = AsyncHandler(async (req, res) => {
  ////////////////// this is must to send product id in url as  /:productId
  let productId = req.params?.productId;
  const product = await productModel.findById(productId);
  console.log("getting product from db... "+ productId);
  console.log(product);
  if(!product){
    throw new ApiError("400", `product is not found!`);
  }
  return res
    .status(201)
    .json(new ApiResponse(200,"Product found successfully",product))
});
//add products

export const addProduct = AsyncHandler(async (req, res) => {
  const { name, desc, catagory, price } = req.body;
  const imageLocalPath = await req?.file?.path;
  for (let value of [name, desc, catagory, price]) {
    if (value.trim() === "") {
      throw new ApiError("400", `${value} is required to proceed further!`);
    }
  }
  if (!imageLocalPath) {
    throw new ApiError(400, " 400 Product image is required!");
  }
  
  const image = await cloudinaryUploader(imageLocalPath);
  if (!image) {
    throw new ApiError(501, " 501 Product image is required!");
  }

  const createdProduct = await productModel.create({
    name,
    desc,
    catagory,
    price,
    image
  });
  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        `${createdProduct.name} is created successfully.`,
        createdProduct
      )
    );
});

// ----------------------------------------------------------------
