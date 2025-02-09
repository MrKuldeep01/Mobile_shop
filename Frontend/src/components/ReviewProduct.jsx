import React, { useEffect, useState } from "react";
import onChangeHandler from "../../utils/changeHandler.js";
import reviewService from "../servicies/Review.services.js"; // Corrected 'servicies' to 'services'
import { useSelector } from "react-redux";
import Loading from "./Loading.jsx";
import { useParams, useNavigate } from "react-router-dom";
import SmallProductCard from "./SmallProductCard.jsx";

const ReviewProduct = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isLogin = useSelector((state) => state.auth.authStatus);
  const isOwner = userData?.isOwner || false; // Changed default to false (boolean) instead of string
  const { productId, reviewId } = useParams();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({});
  const [reviews, setReviews] = useState([]);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
    if (!productId && !reviewId) {
      alert("There is no productId and reviewId!");
      navigate("../../");
    }
    // Fetch reviews should be done inside useEffect
    if (productId) {
      reviewService
        .getProductReviews(productId)
        .then((res) => {
          if (res.success) {
            setReviews(res.data);
          } else {
            console.log("Something went wrong with reviews!" || res.message);
          }
        })
        .catch((error) => {
          throw new Error("Error occurred while fetching reviews!", error.message);
        });
    }
  }, [isLogin, productId, reviewId, navigate]);

  let product = undefined;

  if (productId) {
    product = products.find((p) => {
      return productId === p._id;
    });
  }
  function deleteReview (id){
    // /product/remove/:reviewId
    setLoading(true);
    reviewService
      .deleteProductReview(id)
      .then((res) => {
        if (res.success) {
          alert(res.message || "Your review has been deleted.");
        } else {
          alert(res.message || "error in deleting review.");
        }
      })
      .catch((err) => {
        alert(err.message || "error in deleting review.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const changeHandler = (e) => {
    const { key, value } = onChangeHandler(e);
    setFormData((prevData) => ({ ...prevData, [key]: value })); // Updated to use functional update
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    // Validate inputs
    if (!formData.rating || !formData.reviewText) {
      setErr("Please provide rating and review text to move further!");
      setLoading(false);
      return; // Exit early if validation fails
    }

    const submitAction = reviewId
      ? reviewService.updateProductReview(formData, reviewId)
      : reviewService.createProductReview(formData, productId);

    submitAction
      .then((response) => {
        if (response.success) {
          console.log(
            response.message || "Review for product is submitted/edited."
          );
          // console.log(response.data);
        } else {
          setErr(response.message || "Product review failed!");
        }
      })
      .catch((error) => {
        setErr(
          error.response?.data?.message ||
            error.message ||
            "Product's review add/edit failed with error"
        );
      })
      .finally(() => {
        setLoading(false);
        navigate("../");
      });
  };
  return !loading ? (
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              {loading ? "loading..." : "Add review"}
            </button>
          </form>
        </div>
      </div>

      {/* Lower Portion: Reviews */}
      <div className="reviewContainer mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          [...reviews].reverse().map((review) => (
            <div
              key={review.id}
              className="flex items-start w-full mb-4 border-b pb-2"
            >
              <img
                src={review.user.image}
                alt={review.user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className=" w-full">
                <span className="flex items-center justify-start gap-3">
                  <h3 className="text-base font-semibold text-black/80 px-2 ">
                    {" "}
                    {review.user.name}{(review.user._id == userData._id) && "  (You)"}
                  </h3>
                  <p className="px-2">{" ⭐".repeat(review.rating)}</p>
                </span>
                <span className="flex px-2 items-center justify-between gap-3">
                  <p className="text-black p-2 rounded bg-gray-300/60 w-full pl-2 text-base ">
                    {review.reviewText}
                  </p>
                  {/* <button
                    className="bg-blue-500 text-white p-1 rounded mt-1 self-end"
                    onClick={() => {
                      alert("We are working on this...");
                      // setReviewText(review.text);
                      // setEditReviewId(review.id);
                    }}
                    hidden={userData._id === review.user._id ? false : true}
                  >
                    Edit
                  </button> */}
                  <button
                    className="bg-transparent text-amber-900 py-2 px-1 rounded self-end"
                    onClick={()=>{
                      deleteReview(review._id)}}
                    hidden={userData._id === review.user._id ? false : true}
                  >
                    <i className="ri-delete-bin-fill text-xl"></i>
                  </button>
                </span>
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
