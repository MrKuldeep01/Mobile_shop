import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authStatus: false,
  userData: null,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      console.log(action.payload)
      state.userData = action.payload.data;
    },
    logout: (state, action) => {
      // const userId = state.userData?._id
      state.authStatus = false;
      state.userData = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
