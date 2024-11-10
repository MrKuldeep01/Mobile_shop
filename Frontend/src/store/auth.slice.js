import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    auth: false,
    userData: null
}
export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        register: (state, action)=>{
           const {
            name,
            gmail,
            mobile,
            gender,
            password,
            isOwner,
            image } = action.payload; 
            
        },
        login: (state, action)=>{
           const {email, mobile, password} = action.payload; 
        },
        logout: (state, action)=>{
            // const userId = state.userData?._id
            state.auth = false;
        }
    }
})