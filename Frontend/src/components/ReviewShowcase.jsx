import React, { useEffect } from 'react'
import reviewService from "../servicies/Review.services"
function ReviewShowcase({productId}) {
    const [reviewList, setReviewList] = useState(null)
    
    useEffect(()=>{
        if(!productId){
            throw new Error("Product id is not given in review showcase component")
        }
        /*
        200, "Product's reviews list successfully found.", {
        reviews,
        totalReviews}
        */
        reviewService.getProductReviews(productId)
        .then((res)=>{
          if(res.success){
            console.log(res.message);
            console.log(res.data);
          }else{
            throw new Error(res.message || "response is not well")
          }
        })
        .catch((err)=>{
          throw new Error(err.message || "error in response!")
        })
    })
  return (
    <div className='w-full h-44 bg-green-500 p-20'>
      reviews will be here...
    </div>
  )
}

export default ReviewShowcase
