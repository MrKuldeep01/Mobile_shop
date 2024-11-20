import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      // products = [], current page, total pages
      state.products = action.payload.products;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
    setProduct: (state, action) => {
      // product
      state.products.push(action.payload.product);
    },
    clearProducts: (state, action) => {
      state.products.length = 0;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setProducts, setProduct, clearProduct, setLoading, setError  } = productSlice.actions;
export default productSlice.reducer;
