import React from 'react'
import ProductCard from "./Product.jsx"
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading, setError } from '../store/Product.slice.js';
import Loading from "./Loading.jsx"
import axios from 'axios';

const Products = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalPages, isLoading } = useSelector(state => state.product);
  
  const fetchProducts = async (page) => {
      try {        
          dispatch(setLoading(true));
          const response = await axios.get(`/api/products?page=${page}&limit=12`);
          dispatch(setProducts(response.data));
      } catch (error) {
          dispatch(setError(error.message));
      } finally {
          dispatch(setLoading(false));
      }
  };

  return isLoading ? <Loading/> : (
      <div>
          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                  <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button
                      key={i + 1}
                      onClick={() => fetchProducts(i + 1)}
                      className={`mx-1 px-4 py-2 ${
                          currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
      </div>
  );
}






//   return (
//     <>
//       <div className="body w-full font-semibold bg-gray-400 text-center text-4xl text-white border-b-2 h-[200px]">
//         <h2> Products list will come here! </h2>
//         <Product/>
//       </div>
//     </>
//   )
// }

export default Products
