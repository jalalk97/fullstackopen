import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogs = await blogService.getAll();
  return blogs;
});

export const createBlog = createAsyncThunk("blogs/createBlog", async (blog) => {
  try {
    const createdBlog = await blogService.create(blog);
    return createdBlog;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        return action.payload.sort(byLikes);
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.push(action.payload);
      });
  },
});

export const selectAllBlogs = (state) => state.blogs;

export default blogsSlice.reducer;
