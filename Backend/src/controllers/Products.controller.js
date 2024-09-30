import AsyncHandler from "../utils/AsyncHandler.js";
import { Product as productModel } from "../models/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import cloudinaryUploader from "../utils/Cloudinary.js"
// all products OK-TESTED
export const getProducts = AsyncHandler(async (req, res) => {
  const products = await productModel.find();
  console.log("getting product list...");
  return res
    .status(201)
    .json(new ApiResponse(200, "Product list successfully found", products));
});
// specific product
export const getProduct = AsyncHandler(async (req, res) => {
  ////////////////// this is must to send product id in url as  /:productId
  let productId = req.params?.productId;
  const product = await productModel.findById(productId);
  console.log("getting product from db...");

  return res
    .status(201)
    .json(new ApiResponse(200, "Product successfully found"), product);
});
//add products
export const addProduct = AsyncHandler(async (req, res) => {
  const { name, price, desc, catagory } = req.body;
  const imageLocalPath = req.file.image.path;
  console.log(image);
  console.table([name,price,desc, catagory])

  // all fields are required
  // if for edit : must to send productId in url
 
  for (let value of [name, price, desc, catagory]) {
    if (value.trim() === "") {
      throw new ApiError(406, ` ${value} is required`);
    }
    if(!imageLocalPath){
      throw new ApiError(406, `Image is required`);
    }
  }
  const uploadedImage = await cloudinaryUploader(imageLocalPath)
  const product =
   await productModel.create(
    {
    name,
    price,
    desc,
    image:uploadedImage,
    catagory,
  }
);

  if (!product) {
    throw new ApiError(
      403,
      "Something wrong with creation of product :: products.controller:ediAddProduct() "
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "product created successfully."));
});

// ----------------------------------------------------------------
