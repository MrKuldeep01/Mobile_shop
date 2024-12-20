import React, { useEffect, useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import reviewService from "../servicies/Review.services.js";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../store/Product.slice.js";
import Loading from "./Loading.jsx";
import { useParams, useNavigate } from "react-router-dom";
const ReviewProduct = () => {
  // rating, reviewText
  // give me review id if you wanna use me as edit component in params
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.authStatus);
  const isOwner = userData?.isOwner || "false";
  const { productId, reviewId } = useParams();
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const [productData, setProductData] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    if (!productId || !reviewId) {
      alert("there is no productid or review id !");
    }
  }, [userData]);

  const changeHandler = (e) => {
    const { key, value } = onChangeHandler(e);
    setFormData({ ...formData, [key]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // validations
    setLoad(true);
    if (!formData.rating && !formData.reviewText) {
      setErr("Please provide rating and review text to move further!");
    }

    //rating, reviewText
    (
      productId &&
      reviewService
        .createProductReview(formData, productId)
        .then((response) => {
          if (response.success) {
            console.log(response.message || "Review for product is submitted ");
            console.log(response.data);
            navigate("/products")
          } else {
            setErr(response.message || "Product review faild!");
          }
        })
    )(
      reviewService.updateProductReview(formData, reviewId).then((response) => {
        if (response.success) {
          console.log(
            response.message || "Product review edited.\nresponse data is : \n"
          );
          console.log(response.data);
          navigate("/products");
        } else {
          setErr(response.message || "Product addition faild!");
        }
      })
    )
      .catch((error) => {
        setErr(
          error.response?.data?.message ||
            error.message ||
            "Product's review add/edit failed with error"
        );
        setLoad(false);
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
              {productId ? "Edit" : "Add New"} Review
            </h1>
          </div>
          <form
            className="space-y-4"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <div>
              <input
                type="range"
                placeholder="rate me 1 - 5"
                id="rating"
                // value={productData && productData.price}
                name="rating"
                onChange={changeHandler}
                min={1}
                max={5}
                className="w-full text-amber-900 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
                  focus:border-dashed
                  focus:outline-none"
                required
              />
              <label htmlFor="rating" className="text-amber-800">
                Rating: {formData.rating}
              </label>
            </div>

            <div>
              <textarea
                placeholder="Review text here..."
                name="reviewText"
                onChange={changeHandler}
                // value={productData && productData.desc}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950 
                  focus:border-dashed
                  focus:outline-none"
                rows="3"
                required
              ></textarea>
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

export default ReviewProduct;
