import React, { useEffect } from "react";
import Loading from "./Loading.jsx"
const Product = ({key, product, ...rest}) => {
  return product ? (
    <div className="flex p-6 font-mono " {...rest}>
      <div className="flex-none w-48 mb-10 relative z-10 before:absolute before:top-1 before:left-1 before:w-full before:h-full before:bg-teal-400">
        <img
          src={product.image}
          alt={product.name}
          className="absolute z-10 inset-0 w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
      </div>
      <form className="flex-auto pl-6">
        <div className="relative flex flex-wrap items-baseline pb-6 before:bg-black before:absolute before:-top-6 before:bottom-0 before:-left-60 before:-right-6">
          <h1 className="relative w-full flex-none mb-2 text-2xl font-semibold text-white">
            {product.name}
          </h1>
          <div className="relative text-lg text-white">${product.price}</div>
          <div className="relative uppercase text-teal-400 ml-3">{(product.quantity > 1) ? "In stock" : "out of stock"}</div>
        </div>
        <div className="flex items-baseline my-6">
          <div className="space-x-3 flex text-sm font-medium">
            <label>
              <input
                className="sr-only peer"
                name="size"
                type="radio"
                value="xs"
                checked
              />
              <div className="relative w-10 h-10 flex items-center justify-center text-black peer-checked:bg-black peer-checked:text-white before:absolute before:z-[-1] before:top-0.5 before:left-0.5 before:w-full before:h-full peer-checked:before:bg-teal-400">
                {product.model}
              </div>
            </label>
           
          </div>
        </div>
        <div className="flex space-x-2 mb-4 text-sm font-medium">
          <div className="flex space-x-4">
            <button
              className="px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
              type="submit"
            >
              Buy now
            </button>
            <button
              className="px-6 h-12 uppercase font-semibold tracking-wider border border-slate-200 text-slate-900"
              type="button"
            >
              Add to bag
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-12 h-12 text-black"
            type="button"
            aria-label="Like"
          >
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs leading-6 text-slate-500">
          Free shipping on all continental orders.
        </p>
      </form>
    </div>
  ) : <Loading/>
};

export default Product;
