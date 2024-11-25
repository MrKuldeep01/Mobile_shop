import React, { useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import product from "../servicies/Product.services.js";
import { useDispatch } from "react-redux";
import { setProduct } from "../store/Product.slice.js";

const AddProducts = () => {
  // name, desc, model, catagory, price, quantity
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
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
    product
      .addProduct(formData)
      .then((response) => {
        if (response.success) {
          dispatch(setProduct(response.data));
          console.log("product: ");
          console.log(response.data);
        } else {
          setErr(response.message || "Product insertion faild!");
        }
      })
      .catch((error) => {
        setErr(
          error.response?.data?.message ||
            error.message ||
            "Product insertion failed with error"
        );
      })
      .finally(() => {
        setLoad(false);
        setErr("");
      });
  };
  return !loading ? (
    <div className="container max-w-md mx-auto w-full md:w-3/4 lg:w-1/3">
      <div className="hero max-w-[90%] justify-center items-center mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
        <div className="text-center my-8 sm:mt-6">
          <h1 className="font-thin text-4xl text-amber-950">Add New Product</h1>
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
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Product Description"
              name="desc"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              rows="3"
              required
            ></textarea>
          </div>
          <div>
            <input
              placeholder="image file"
              name="image"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              type="file"
              required
            ></input>
          </div>
          <div>
            <input
              type="text"
              placeholder="Model"
              name="model"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="catagories"
              name="catagory"
              onChange={changeHandler}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              name="price"
              onChange={changeHandler}
              min={1}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          {err && <div className="loading">
            {err}
          </div>}
          <div>
            <input
              type="number"
              placeholder="Quantity"
              name="quantity"
              onChange={changeHandler}
              min={1}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-500 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
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
