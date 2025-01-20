import React, { useEffect, useState } from "react";
import SmallProductCard from "./SmallProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../store/Product.slice.js";
import Loading from "./Loading.jsx";
import ProductService from "../servicies/Product.services.js";
const SearchProducts = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  // const {totalPages } = useSelector(state=>state.product);
  const [products, setProductsCurrent] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [info, setInfo] = useState("");
  let [productsName, setProductsName] = useState("");
  useEffect(() => {
    setProductsName(prompt("Please enter product name : ", "product one"));
    fetchProducts(productsName);
  }, [productsName]);
  const fetchProducts = async (productName = "") => {
    try {
      setLoading(true);
      const response = await ProductService.searchProducts(productName);
      dispatch(setProducts(response?.data));
      setProductsCurrent(response.data);
      if (response.data.length == 0) {
        setInfo("No match found for your query");
      }
    } catch (error) {
      setError(error.message || "something wrong this side!");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    // <div>
    //   {/* Products grid */}
    //   <div className="w-full flex items-start justify-center gap-2 flex-wrap py-6">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!products && (
          <h1 className="text-xs text-amber-700/60 font-thin">
            Product will shown here...
          </h1>
        )}

        {/* <ProductCard key={1234512345} product={{ name: "demo One", quantity: 99, price: 999, model: "abc xyz", image:"security.png"}} /> */}
        {products &&
          products.map((product) => (
            <SmallProductCard product={product} key={product._id} />
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        {/* {Array.from({ length: totalPages }, (_, i) => (
                  <button
                      key={i + 1}
                      onClick={() => fetchProducts(i + 1)}
                      className={`mx-1 px-4 py-2 ${
                          currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                  >
                      {i + 1}
                  </button>
              ))} */}
        {info ? (
          <p
            role="alertdialog"
            className="text-black/40 font-semibold bg-white/20 py-4 px-8 rounded-md"
          >
            {info}
          </p>
        ) : (
          <button
            onClick={() => {
              setProductsName(
                prompt("Please enter product name : ", "product one")
              );

              fetchProducts(productsName);
            }}
            className={`mx-1 px-4 py-2 rounded-md text-black/60 font-semibold bg-gray-200`}
          >
            find again
          </button>
        )}
        {err && (
          <p role="alert" className="text-red-600 bg-white/20 p-4 rounded ">
            {err}
          </p>
        )}
      </div>
    </div>
  );
};
export default SearchProducts;
