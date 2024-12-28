import React, { useEffect } from 'react'

function ReviewCard({reviewData}) {
    useEffect(()=>{
        if(!reviewData){
            console.log("review data is not available this time.")
        }
        
    })
  return (
    <div className="w-full h-auto px-4 py-2 bg-white/30 backdrop-blur-sm flex flex-col gap-2 items-start justify-center">
      <div className="upper w-full px-2 py-1 flex items-center justify-start gap-2 ">
         {/* <img src="" alt="" className="image" /> */}
         <span>
            rating : {reviewData.rating}
         </span>
      </div>
    <div className="lower w-full p-2 font-mono text-sm font-semibold text-amber-800 rounded bg-black/10 ">
    {reviewData?.reviewText && reviewData?.reviewText}
    </div>      
    </div>
  )
}

export default ReviewCard
