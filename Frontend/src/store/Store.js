import {configureStore} from "@reduxjs/toolkit"
import authReducer from './Auth.slice.js'
import productReducer from './Product.slice.js'
import reviewReducer from './Review.slice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        reviews: reviewReducer
    }
})
export default store;