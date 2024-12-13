import React from "react";
import { TbReceiptRupee } from "react-icons/tb";

const SmallProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
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
  );
};

export default SmallProductCard;
