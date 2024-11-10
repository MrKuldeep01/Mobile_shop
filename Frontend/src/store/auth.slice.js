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

      state.userData = action.payload;
      state.authStatus = true;
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
