import React, { useEffect, useState } from "react";
import SmallProductCard from "./SmallProductCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "../store/Product.slice.js";
import Loading from "./Loading.jsx";
import ProductService from "./../servicies/Product.services.js";
const Products = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state) => state.product.products);
  // const {totalPages } = useSelector(state=>state.product);
  const [products, setProductsCurrent] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [info, setInfo] = useState("")
  let [page, setPage] = useState(0);
  useEffect(()=>{
    fetchProducts(page)
  },[])
  const fetchProducts = async (page, limit = 12) => {
    try {
      setPage(page += 1);
     
        console.log("fetching the data for page no. : ", page)
        /*products: []
      currentPage: 1
      totalPages: 1
      totalProducts: 2
{
    "statusCode": 200,
    "message": "Product list successfully found.",
    "data": {
        "products": [
            {
                "_id": "675a8e0f4f0677780827d553",
                "name": "product one",
                "price": 999,
                "model": "model one",
                "desc": "product one description is for demonsteration.",
                "image": "http://res.cloudinary.com/dngrrtwa9/image/upload/v1733987854/kiunfp5ufqgnsrk9z4qe.gif",
                "quantity": 99,
                "catagory": [
                    "test"
                ],
                "createdAt": "2024-12-12T07:17:35.760Z",
                "updatedAt": "2024-12-12T07:17:35.760Z",
                "__v": 0
            },
            {
                "_id": "67572cfcf3f5666b423b5562",
                "name": "Drake Best",
                "price": 865,
                "model": "Deserunt dolor sed q",
                "desc": "Adipisci nemo qui al",
                "image": "http://res.cloudinary.com/dngrrtwa9/image/upload/v1733766396/zngy4oijni3rb6z2w5z8.png",
                "quantity": 56,
                "catagory": [
                    "Voluptas vel ea amet"
                ],
                "createdAt": "2024-12-09T17:46:36.675Z",
                "updatedAt": "2024-12-09T17:46:36.675Z",
                "__v": 0
            }
        ],
        "currentPage": 1,
        "totalPages": 1,
        "totalProducts": 2
    },
    "success": true
}
      */
        setLoading(true);
      const response = await ProductService.getProductList(page, limit);
      console.log(response);
      dispatch(setProducts(response?.data));
      setProductsCurrent(response.data.products);
      if (response.data.totalPages < (page + 1)) {
        setPage(response.data.totalPages - 1);
        setInfo("you are on the last page buddy :)")
      }
      if (page < 1){
        setPage(1)
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
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
        {!products && <h1>Product will shown here</h1>}

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
        {info ? <p role="alertdialog" className="text-black/40 font-semibold bg-white/20 py-4 px-8 rounded-md">{info}</p> : <button
          onClick={() => fetchProducts(page)}
          className={`mx-1 px-4 py-2 rounded-md text-black/60 font-semibold bg-gray-200`}
        >
          see more...
        </button>}
        {err && (
          <p role="alert" className="text-red-600 bg-white/20 p-4 rounded ">
            {err}
          </p>
        )}
      </div>
    </div>
  );
};
export default Products;
