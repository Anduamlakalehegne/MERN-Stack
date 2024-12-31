import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  message: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogStart: (state) => {
      state.isLoading = true;
    },
    getBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    getBlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    createBlogStart: (state) => {
      state.isLoading = true;
    },
    createBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    createBlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    searchBlogStart: (state) => {
      state.isLoading = true;
    },
    searchBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    searchBlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    updateBlogStart: (state) => {
      state.isLoading = true;
    },
    updateBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    updateBlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    BlogStart: (state) => {
      state.isLoading = true;
    },
    BlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    BlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    deleteBlogStart: (state) => {
      state.isLoading = true;
    },
    deleteBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
      state.message = null;
    },
    deleteBlogFail: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const {
  getBlogStart,
  getBlogSuccess,
  getBlogFail,
  createBlogStart,
  createBlogSuccess,
  createBlogFail,
  searchBlogStart,
  searchBlogSuccess,
  searchBlogFail,
  updateBlogStart,
  updateBlogSuccess,
  updateBlogFail,
  BlogStart,
  BlogSuccess,
  BlogFail,
  deleteBlogStart,
  deleteBlogSuccess,
  deleteBlogFail,
} = blogSlice.actions;

export default blogSlice.reducer;
