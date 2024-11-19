import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: {},
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            const productId = action.payload.product._id;
            state.products[productId] = action.payload.product;
        },
        removeProduct: (state, action) => {
            const productId = action.payload.product._id;
            delete state.products[productId];
        },
        clearProducts: (state) => {
            state.products = {};
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            if (state.products[productId]) {
                state.products[productId].quantity = quantity;
            }
        },
        incrementQuantity: (state, action) => {
            const productId = action.payload.productId;
            if (state.products[productId]) {
                state.products[productId].quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const productId = action.payload.productId;
            if (state.products[productId] && state.products[productId].quantity > 1) {
                state.products[productId].quantity -= 1;
            }
        }
    }
})
export const { setProduct, removeProduct, clearProducts, updateQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
