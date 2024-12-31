import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
      state.message = null;
    },
    loginFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    registerStart: (state) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
      state.message = null;
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    deleteStart: (state) => {
      state.isLoading = true;
    },
    deleteSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.isError = false;
      state.message = null;
    },
    deleteFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    logOutSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isError = false;
      state.message = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  deleteStart,
  deleteSuccess,
  deleteFail,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
