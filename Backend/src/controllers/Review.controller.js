import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Review as reviewModel } from "../models/Review.model.js";
import { User as userModel } from "../models/User.model.js";
import { Owner as ownerModel } from "../models/Owner.model.js";

/*
    **Review model** for products only
        - creation :
            - validate request ✔
            - get user/owner's credentials from req
            - validate with database
            - gather information from 'req.body' like : 
                rating:  1 - 5,
                reviewText: String,
            - product id from 'req.params'.
            
            - create the review document with : {
                rating:  1 - 5,
                reviewText: String,
                product id,
                user/owner id
            }
        
        - delete 
            - validate user   
            - get review id from 'req.params'
            - validate (if or not )and fatch
            - check review.userId || ownerId == user._id
            - delete the review document
        
        - edit
            - review id from params
            - user form req.user
            - validate review id (if or not)
            - take values from req.body like {
                rating:  1 - 5,
                reviewText: String}
            - validate inputs 
            - update the review document
*/
///// Protected

//  rating , reviewText  and productid in parameters
export const createProductReview = AsyncHandler(async (req, res) => {
  if (!req?.user) {
    throw new ApiError(405, "Unauthorized user, please login first!");
  }
  const user = await (req.user.isOwner
    ? ownerModel.findById(req.user._id)
    : userModel.findById(req.user._id));
  if (!user) {
    throw new ApiError(
      405,
      "Unauthorized user due to wrong User id , please login first! "
    );
  }
  let { rating, reviewText } = req.body;

  //   if (
  //     [rating, reviewText].some((value) => {
  //       value.trim() == "";
  //     })
  //   ) {
  //     throw new ApiError(
  //       400,
  //       "Bad request, You have to feed review & rating both to move further!"
  //     );
  //   }

  if (rating.trim() === "" || reviewText.trim() == "") {
    throw new ApiError(
      400,
      "Bad request, You have to feed review & rating both to move further!"
    );
  }
  rating = Number(rating);
  if (rating < 1 || rating > 5) {
    throw new ApiError(
      400,
      "Bad request!, Rating must be a number between 1 and 5."
    );
  }
  const productId = req.params?.productId;
  if (!productId) {
    throw new ApiError(500, "Invalid product to add review!");
  }
  const review = await reviewModel.create({
    [user.isOwner ? "ownerId" : "userId"]: user._id,
    rating,
    reviewText,
    productId,
  });
  const createdReview = await reviewModel
    .findById(review._id);
  if (!createdReview) { 
    throw new ApiError(
      500,
      `Internal server error in the process of saving , ${user.name}'s review`
    );
  }
  console.log("review is created by", user.name);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Review is successfully saved form this product.",
        createdReview
      )
    );
});

//// Protected
// reviewId in parameters
export const removeProductReview = AsyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new ApiError(405, "Unauthorized request, please login first!");
  }
  const reviewId = req.params?.reviewId; // ======= reviewId in params
  const review = await reviewModel.findById(reviewId);
  if (!review) {
    throw new ApiError(
      500,
      "Internal server error due to review id! Kindly report this error to the Owner."
    );
  }
  if (
    !(
      (user.isOwner && review.ownerId === user._id) ||
      review.userId === user._id
    )
  ) {
    throw new ApiError(
      405,
      "Unauthorized request, you are not creater of this review! "
    );
  }
  await reviewModel.deleteOne({ _id: reviewId });
  console.log("review is deleted successfully");
  return res
    .status(200)
    .json(new ApiResponse(200, "Review is removed successfully."));
});

export const updateProductReview = AsyncHandler(async (req, res) => {
  /*
   - review id from params
            - user form req.user
            - validate review id (if or not)
            - take values from req.body like {
                rating:  1 - 5,
                reviewText: String}
            - validate inputs 
            - update the review document
 */
  if (!req?.user) {
    throw new ApiError(405, "Unauthorized user, please login first!");
  }
  let { rating, reviewText } = req.body;
  const reviewId = req.params?.reviewId;
  if (!reviewId) {
    throw new ApiError(
      400,
      "Bad request due to review id, for updating review! "
    );
  }
  if (
    (!rating && !reviewText) ||
    (rating.trim() === "" && reviewText.trim() == "")
  ) {
    return res
      .status(200)
      .json(new ApiResponse(200, "review saved with same data successfully."));
  }
  const review = await reviewModel.findById(reviewId);

  if (
    !(user.isOwner ? review.ownerId === user._id : review.userId === user._id)
  ) {
    throw new ApiError(
      405,
      "Unauthorized request for updating review, you are not creater of this review! "
    );
  }
  rating = rating ? Number(rating) : review.rating;
  if (rating < 1 || rating > 5) {
    throw new ApiError(
      400,
      "Bad request!, Rating must be a number between 1 and 5."
    );
  }
  reviewText = reviewText ? reviewText : review.reviewText;

  const updatedReview = await reviewModel
    .findByIdAndUpdate(
      reviewId,
      {
        rating,
        reviewText,
      },
      { new: true }
    )
    .select("-userId -ownerId -productId");
  if (!updatedReview) {
    throw new ApiError(
      500,
      `Internal server error in the process of updating , ${user.name}'s review`
    );
  }
  console.log("review is created by", user.name);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Review is successfully saved form this product.",
        review
      )
    );
});
