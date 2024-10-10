import AsyncHandler from "../utils/AsyncHandler.js";
import { Product as productModel } from "../models/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import cloudinaryUploader from "../utils/Cloudinary.js";

//add products

export const addProduct = AsyncHandler(async (req, res) => {
  if(!(req.user.isOwner)){
    throw new ApiError(405,"You are not authorized, for this task!")
  }
  const { name, desc, model, catagory, price, quantity } = req.body;
  const imageLocalPath = await req?.file?.path;
  // for (let value of [name, desc, catagory, price]) {
  //   if (value.trim() === "") {
  //     throw new ApiError("400", `${value} is required to proceed further!`);
  //   }
  // }
  if (
    !(name && desc && catagory && price && model && imageLocalPath)
  ) {
    throw new ApiError(400, " Product details are not complete!");
  }

  const image = await cloudinaryUploader(imageLocalPath);
  if (!image) {
    throw new ApiError(
      501,
      " Process failed to upload image!, error from our side!"
    );
  }
  quantity = req.body.quantity || 1;
  catagory = Array.from(catagory.toString().replaceAll(",", "")).filter(
    (v) => v != " "
  );
  const createdProduct = await productModel.create({
    name,
    desc,
    catagory,
    price,
    image,
    model,
    quantity,
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

// edit product
export const editProduct = AsyncHandler(async (req, res) => {
  if(!(req.user.isOwner)){
    throw new ApiError(405,"You are not authorized, for this task!")
  }
  const productId = req?.params?.productId;
  if (!productId) {
    throw new ApiError(400, "Please provide product id to edit!");
  }
  const existingProduct = await productModel.findById(productId);
  if (!existingProduct) {
    throw new ApiError(400, "Not a valid Product id");
  }
  const imageLocalPath = req?.file?.path;
  const image =
    (imageLocalPath && (await cloudinaryUploader(imageLocalPath))) ||
    existingProduct.image;
  // const { name, catagory, price, desc } = req.body;
  if (!image) {
    throw new ApiError(500, "Problem with Product image");
  }
  const name = req.body?.name || existingProduct.name;
  const price = req.body?.price || existingProduct.price;
  const desc = req.body?.desc || existingProduct.desc;
  const model = req.body?.model || existingProduct.model;
  const quantity = req.body?.quantity || existingProduct.quantity;
  const catagory = req.body?.catagory || existingProduct.catagory;
  const editedProduct = await productModel.findByIdAndUpdate(
    existingProduct._id,
    { name, desc, price, catagory, image, model, quantity },
    {
      new: true,
    }
  );

  if (!editedProduct) {
    throw new ApiError(500, "faild to update the product!");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        ` ${name} Product edited successfully`,
        editedProduct
      )
    );
});

// all products OK-TESTED
export const getProducts = AsyncHandler(async (req, res) => {
  const products = await productModel.find();
  console.log("getting product list...");
  if (!products) {
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
  console.log("getting product from db... " + productId);
  console.log(product);
  if (!product) {
    throw new ApiError("400", `product is not found!`);
  }
  return res
    .status(201)
    .json(new ApiResponse(200, "Product found successfully", product));
});

// delete Product
export const deleteProduct = AsyncHandler(async (req, res) => {
  if(!(req.user.isOwner)){
    throw new ApiError(405,"You are not authorized, for this task!")
  }
  const productId = req?.params?.productId;
  if (!productId) {
    throw new ApiError(400, "Please provide product id to delete.");
  }
  console.log(`finding the product ${productId} to delete`);
  const deletedProduct = await productModel.deleteOne({ _id: productId });
  if (!deleteProduct) {
    throw new ApiError(500, "failed to delete product ", productId);
  }
  res
    .status(204)
    .json(new ApiResponse(200, "Product deleted successfully", deletedProduct));
});
// ----------------------------------------------------------------
