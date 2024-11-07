import React from 'react'
import Button from "./Button.jsx"

const ProductBanner = ({catagoryName="Lorem ipsum dolor sit.", categoryDescription="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem quidem voluptates eum.", productImgPath, stickerText="18%"}) => {
  return (
    <section className='w-full p-4 flex flex-col gap-6 h-[90vh]  '>
        <div className="top w-full min-h-[70%] flex items-center justify-center gap-12  bg-sky-300/10 rounded-md ">
        {/* px-12 sm:px-24 py-20 */}
            <div className="topLeft shrink-2 w-[70%] sm:w-[50%] min-h-[98%] flex flex-col items-start justify-center gap-4 pl-12 md:pl-24 py-20">
                <span className='catagoryName font-bold font-serif text-3xl sm:text-5xl w-[80%] '> {catagoryName} </span>
                <span className="categoryDescription font-semibold text-black/50 text-base"> {categoryDescription} </span>
                <Button text={'Check now '}/>
            </div>
            <div className="topRight shrink-0 w-[50%] md:w-[40%] h-[98%] relative flex items-end justify-end pr-8 md:pr-16 pt-14 pb-2 ">
                <div className="imageContainer mx-4 my-6 h-[95%] w-full sm:w-[75%] rounded-xl bg-transparent object-fill relative">
                    <img src={productImgPath} alt="product preview" className={" size-full bg-center rounded-xl "}/>
                    <span className="text-white font-bold text-3xl bg-gradient-to-tr from-rose-600 to-blue-600 size-24 rounded-full absolute -top-8 -right-8 flex items-center justify-center rotate-[25deg] shadow-md shadow-slate-100/50 " >{stickerText}</span>
                </div>
                
            </div>
        </div>
        <div className="down"></div>
    </section>
  )
}

export default ProductBanner