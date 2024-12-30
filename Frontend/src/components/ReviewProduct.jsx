import React, { useEffect, useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import reviewService from "../servicies/Review.services.js";
import { useSelector } from "react-redux";
import Loading from "./Loading.jsx";
import { useParams, useNavigate } from "react-router-dom";
import SmallProductCard from "./SmallProductCard.jsx";
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
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    if (!productId && !reviewId) {
      alert("there is no productid and review id !");
      navigate("../../");
    }
  }, [userData]);
  let product = undefined;
  let reviews = []; // the array that we need to fetch from db :)

  if (productId) {    
    // product = products.find((p) => productId === p._id);
    product = products.find((p) => {
      console.log(`Checking if ${productId} === ${p._id}`);
      return productId === p._id;
    });

    if (!product) {
      console.log("No matching product found.");
    } else {
      console.log("product in review component: \n");
      console.log(product);
    }
    reviewService
      .getProductReviews(productId)
      .then((res) => {
        if (res.success) {
          reviews = res.data;
          console.log("reviews list found.");
          console.log(res.data);
        } else {
          console.log("something wrong with reviews!" || res.message);
        }
      })
      .catch((error) => {
        console.log("error occured while fetching reviews!", error.message);
      });
  }

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
      !reviewId &&
      reviewService
        .createProductReview(formData, productId)
        .then((response) => {
          if (response.success) {
            console.log(response.message || "Review for product is submitted ");
            console.log(response.data);
          } else {
            setErr(response.message || "Product review faild!");
          }
        })
    )(
      reviewId &&
        reviewService
          .updateProductReview(formData, reviewId)
          .then((response) => {
            if (response.success) {
              console.log(
                response.message ||
                  "Product review edited.\nresponse data is : \n"
              );
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
    // <div className="container max-w-md min-h-[90vh] mx-auto w-full md:w-3/4">
    //   {!err ? (
    //     <div className="hero md:flex flex-col max-w-[90%] justify-center items-center gap-2 mx-auto my-16 bg-zinc-500/10 px-8 sm:px-14 py-4 sm:py-8 md:py-14 rounded-3xl shadow-2xl">
    //       <div className="leftBox productShowCase w-full md:w-[50%] px-4 py-8 md:px-10">

    //       </div>
    //       <div className="rightBox reviewSection w-full md:w-[50%] h-auto px-4 md:px-10 py-4 flex flex-col justify-center items-start">
    //         <div className="reviewAdd"></div>
    //         {/* <div className="reviewsSection"></div> */}
    //       </div>
    //       <div className="text-center my-8 sm:mt-6">
    //         <h1 className="font-thin text-4xl text-amber-950">
    //           {productId ? "Edit" : "Add New"} Review
    //         </h1>
    //       </div>
    // <form
    //   className="space-y-4"
    //   encType="multipart/form-data"
    //   onSubmit={submitHandler}
    // >
    //   <div>
    //     <input
    //       type="range"
    //       placeholder="rate me 1 - 5"
    //       id="rating"
    //       // value={productData && productData.price}
    //       name="rating"
    //       onChange={changeHandler}
    //       min={1}
    //       max={5}
    //       className="w-full text-amber-900 px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950
    //         focus:border-dashed
    //         focus:outline-none"
    //       required
    //     />
    //     <label htmlFor="rating" className="text-amber-800">
    //       Rating: {formData.rating}
    //     </label>
    //   </div>

    //   <div>
    //     <textarea
    //       placeholder="Review text here..."
    //       name="reviewText"
    //       onChange={changeHandler}
    //       // value={productData && productData.desc}
    //       className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-amber-950
    //         focus:border-dashed
    //         focus:outline-none"
    //       rows="3"
    //       required
    //     ></textarea>
    //   </div>
    //   {err && (
    //     <p
    //       role="alert"
    //       className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
    //     >
    //       {err}
    //     </p>
    //   )}
    //   <button
    //     type="submit"
    //     disabled={loading}
    //     className="w-full bg-amber-950 text-white rounded-lg px-4 py-3 mt-6 hover:bg-amber-800 focus:outline-2 focus:outline-white/70 focus:outline-opacity-50 "
    //   >
    //     {loading ? "loading..." : "Add Product"}
    //   </button>
    // </form>
    //     </div>
    //   ) : (
    //     <p
    //       role="alert"
    //       className="py-2 px-4 bg-white/20 text-red-700 font-semibold text-base my-2 rounded border-red-600 border-2 "
    //     >
    //       {err}
    //     </p>
    //   )}
    // </div>

    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upper Left: Product Details */}
        <div className="p-1">
          <SmallProductCard product={product} preview={true} />
        </div>

        {/* Upper Right: Review Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
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
              {loading ? "loading..." : "Done"}
            </button>
          </form>
        </div>
      </div>

      {/* Lower Portion: Reviews */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="flex items-start mb-4 border-b pb-2"
            >
              <img
                src={review.user.image}
                alt={review.user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{review.user.name}</h3>
                <p className="text-gray-700">{review.text}</p>
                <button
                  className="text-blue-500 underline mt-1"
                  onClick={() => {
                    setReviewText(review.text);
                    setEditReviewId(review.id);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ReviewProduct;
