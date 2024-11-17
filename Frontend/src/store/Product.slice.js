import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    error: null
}

export const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload.products;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})
export const { setProducts, setProduct, clearProduct } = productSlice.actions;
export default productSlice.reducer;

