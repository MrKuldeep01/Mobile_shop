import {configureStore} from "@reduxjs/toolkit"
import authReducer from './Auth.slice.js'
import productReducer from './Product.slice.js'

const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer
    }
})
export default store;