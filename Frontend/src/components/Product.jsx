import React, { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import { TbEdit, TbReceiptRupee } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Product = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (!product) {
      setError("Product not available!");
      setLoading(false);
    }
    setError("");
    setLoading(false);
    console.log("product: ", product);
  }, [product]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <div
        key={product._id}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl"
      >
        {/* Product Card */}
        {!error ? (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {product.isOwner && (
              <span
                className="absolute left-1 top-1"
                onClick={() => navigate(`../edit/${product._id}`)}
              >
                <TbEdit
                  className={
                    "p-2 text-amber-800 bg-white/20 rounded backdrop-blur-sm"
                  }
                />
              </span>
            )}
            {product.isOwner && (
              <span
                className="absolute right-1 top-1"
                onClick={() => {
                  const canDelete = confirm(
                    "Are you really wanna delete this document"
                  );
                  if (canDelete) {
                    console.log(
                      `${product.name}, ${product.model}/${product.price} is ready to delete.`
                    );
                  }
                }}
              >
                <MdDeleteOutline
                  className={
                    "p-2 text-amber-800 bg-white/20 rounded backdrop-blur-sm"
                  }
                />
              </span>
            )}
            {/* Cover Image */}
            <div className="h-48">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover bg-gradient-to-r from-amber-500 to-amber-800"
              />
            </div>

            {/* Product Section */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-gray-500 mb-4">
                Model: {product.model}
              </p>
              <p className="text-2xl font-bold text-amber-600 mb-2 ">
                <TbReceiptRupee className={"mr-1 inline"} />
                {product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.desc}</p>

              {/* Additional Information */}
              <div className="text-gray-700 mb-4">
                <span className="font-semibold text-black/70">Catagory:</span>{" "}
                {product.catagory.join(", ")}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Available Quantity:</span>{" "}
                {product.quantity}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mb-4">
              <button className="bg-amber-950 hover:bg-amber-800 text-white px-6 py-2 rounded-lg transition-colors duration-300 mr-4">
                Add to Cart
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors duration-300">
                Add to Wishlist
              </button>
            </div>
          </div>
        ) : (
          <p
            role="alert"
            className="text-red-600 text-base bg-white/20 p-4 rounded "
          >
            {error}
          </p>
        )}
      </div>
    </>
);
};

export default Product;
