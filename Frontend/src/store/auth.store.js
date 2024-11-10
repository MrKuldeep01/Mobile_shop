import {configureStore} from "@reduxjs/toolkit"
import authReducer from './auth.slice'
const authStore = configureStore({
    reducer: {
        auth: authReducer
    }
})
export default authStore;