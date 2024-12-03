import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  authStatus: false,
  userData: undefined,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
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
