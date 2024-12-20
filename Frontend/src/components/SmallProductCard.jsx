import React, { useEffect, useState } from "react";
import { TbReceiptRupee, TbEdit, TbMessage2Bolt } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductServices from "../servicies/Product.services.js";
import Loading from "./Loading.jsx";
const SmallProductCard = ({ product }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error, setError] = useState("");
  const [load, setLoading] = useState(false)
  useEffect(() => {
    if (!product) {
      setError("Product not available");
    }
    if (!userData) {
      throw new Error("userData is not available!");
    }
  });
  function deleteHandler(productId) {
    if (!productId) {
      throw new Error("product id is not given to delete.");
    }
    setLoading(true)
    ProductServices.deleteProduct(productId)
      .then((res) => {
        if (res.success) {
          alert(res.message);
          console.log(res);
          console.log(res.message);
        }
      })
      .catch((err) => {
        throw new err;
      }).finally(()=>{
        setLoading(false)
      })
  }
  return !error ? (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      {userData.isOwner && (
        <span className=" flex flex-col-reverse gap-4 items-center justify-center absolute right-1 bottom-0 text-lg p-2 text-amber-800 bg-white/30 rounded backdrop-blur-sm">
         {!load ? <MdDeleteOutline title="Delete product"
            onClick={() => {
              const canDelete = confirm(
                "Are you really wanna delete this document"
              );
              if (canDelete) {
                console.log(
                  `${product.name}, ${product.model}/${product.price} is ready to delete.`
                );
                deleteHandler(product._id);
              }
            }}
          /> : <Loading/>}

          <TbEdit title="Edit product" onClick={() => navigate(`./edit/${product._id}`)} />
          <TbMessage2Bolt title="Review 📮" onClick={() => navigate(`./review/add/${product._id}`)} />
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 truncate">{product.desc}</p>
        <p className="text-xl font-bold text-amber-600">
          <TbReceiptRupee className={"mr-1 inline"} />
          {product.price.toFixed(2)}
        </p>
        <p className="text-gray-500">Quantity: {product.quantity}</p>
      </div>
    </div>
  ) : (
    <p
      role="alert"
      className="text-red-600 px-8 py-4 m-4 text-xl font-semibold bg-black/20 rounded-md"
    >
      {" "}
      {error}
    </p>
  );
};

export default SmallProductCard;
