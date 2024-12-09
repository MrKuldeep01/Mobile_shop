import React, { useEffect, useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import product from "../servicies/Product.services.js";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../store/Product.slice.js";
import Loading from "./Loading.jsx";
import { useParams, useNavigate } from "react-router-dom";
const AddProducts = () => {
  // name, desc, model, catagory, price, quantity
  // give me product id if you wanna use me as edit component
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.authStatus);
  const isOwner = userData?.isOwner || "false";
  const { productId } = useParams();
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!isLogin){
      navigate('/')
    }
    if (isLogin && !isOwner) {
      setLoad(true);
      setErr("you are not authorized for add product");
      setLoad(false);
      setErr("");
      navigate("/me");
    }
   
  }, [userData]);
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
  }, [productId]);
  const changeHandler = (e) => {
    const { key, value } = onChangeHandler(e);
    setFormData({ ...formData, [key]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // validations
    setLoad(true);
    if (!formData.name && !formData.desc && !formData.image) {
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
      {!err ? (
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

            {err && (
              <p
                role="alert"
                className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
              >
                {err}
              </p>
            )}

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
            {err && (
              <p
                role="alert"
                className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
              >
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
            >
              {loading ? "loading..." : "Add Product"}
            </button>
          </form>
        </div>
      ) : (
        <p
          role="alert"
          className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
        >
          {err}
        </p>
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default AddProducts;
