import AsyncHandler from "../utils/AsyncHandler.js";
import { Product as productModel } from "../models/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
export const allProducts = AsyncHandler(async (req, res) => {
  const products = await productModel.find();
  return res
    .status(201)
    .json(new ApiResponse(200, "Product list successfully found", products));
});

export const specificProduct = AsyncHandler(async (req, res) => {

    ////////////////// this is must to send product id in url as  /:productId
  let productId = req.params?.productId;
  const product = await productModel.findById(productId);
  return res.status(201)
  .json(new ApiResponse(200,"Product successfully found"),product)

});

export const editAddProduct = AsyncHandler(async (req, res) => {
    const {name, price, desc, image, catagory, forEdit} = req.body;
    // all fields are required 
    // if for edit : must to send productId in url
    if(!req.params.productId)
    {
        for(let value of [name, price, desc, catagory]){         
            if(value.trim() === ""){
                throw new ApiError(406,` ${value} is required`)
            }
        } 

    }


});

// ----------------------------------------------------------------
