import React, { useEffect, useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import product from "../servicies/Product.services.js";
import { useDispatch } from "react-redux";
import { setProduct } from "../store/Product.slice.js";

const AddProducts = ({ productId = undefined }) => {
  // name, desc, model, catagory, price, quantity
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      setLoad(true);
      product
        .getProductDetails(productId)
        .then((response) => {
          if (response.success) {
            setProductData(response.data);
          } else {
            setErr("Error while fetching data!");
          }
        })
        .catch((error) => {
          setErr(error.message || "Error in fetching Data");
        })
        .finally(() => {
          setLoad(false);
          setErr("");
        });
    }
  }, []);
  const changeHandler = (e) => {
    const { key, value } = onChangeHandler(e);
    setFormData({ ...formData, [key]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // validations
    if (!formData.name && !formData.desc) {
      setErr("Please provide required information!");
    }
    (productId
      ? product.editProduct(formData, productId).then((response) => {
          if (response.success) {
            console.log("edited product: ");
            console.log(response.data);
          } else {
            setErr(response.message || "Product edit faild!");
          }
        })
      : product.addProduct(formData).then((response) => {
          if (response.success) {
            dispatch(setProduct(response.data));
            console.log("added product: ");
            console.log(response.data);
          } else {
            setErr(response.message || "Product addition faild!");
          }
        })
    )
      .catch((error) => {
        setErr(
          error.response?.data?.message ||
            error.message ||
            "Product add/edit failed with error"
        );
      })
      .finally(() => {
        setLoad(false);
        setErr("");
      });
  };
  return !loading ? (
    <div className="container max-w-md mx-auto w-full md:w-3/4">
      <div className="hero max-w-[90%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
        <div className="text-center my-8 sm:mt-6">
          <h1 className="font-thin text-4xl text-amber-950">
            {productId ? "Edit" : "Add New"} Product
          </h1>
        </div>
        <form
          className="space-y-4"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          <div className="mt-5">
            <input
              type="text"
              placeholder="Product Name"
              name="name"
              onChange={changeHandler}
              value={productData && productData.name}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Product Description"
              name="desc"
              onChange={changeHandler}
              value={productData && productData.desc}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <input
              placeholder="image file"
              value={productData && productData.image}
              name="image"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              type="file"
              required
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={productData && productData.model}
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="catagories"
              value={productData && productData.catagory}
              name="catagory"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              value={productData && productData.price}
              name="price"
              onChange={changeHandler}
              min={1}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              required
            />
          </div>
          {err && <div className="loading">{err}</div>}
          <div>
            <input
              type="number"
              value={productData && productData.quatity}
              placeholder="Quantity"
              name="quantity"
              onChange={changeHandler}
              min={1}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
              focus:border-dashed
              focus:outline-none"
              required
            />
          </div>
          {loading && <div className="loading">loading... </div>}
          {err && <p className="error p-2 rounded-md bg-white/70 text-red-700/90 font-base font-semibold" role="alert"> {err}</p>}
          <button
            type="submit"
            className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
};

export default AddProducts;
