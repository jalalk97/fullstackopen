import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const blogs = await blogService.getAll();
  return blogs;
});

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog);
      return createdBlog;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (newBlog) => {
    const updatedBlog = await blogService.update(newBlog.id, newBlog);
    return updatedBlog;
  }
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (blog) => {
  const response = await blogService.remove(blog.id);
  return blog;
});

export const postComment = createAsyncThunk(
  "blogs/postComment",
  async (args) => {
    const { id, comment } = args;
    const response = await blogService.addComment(id, comment);
    return response;
  }
);

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
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const { id } = action.payload;
        return state
          .map((blog) => (blog.id === id ? action.payload : blog))
          .sort(byLikes);
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        return state.filter((blog) => blog.id !== action.payload.id);
      })
      .addCase(postComment.fulfilled, (state, action) => {
        return state.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        );
      });
  },
});

export const selectAllBlogs = (state) => state.blogs;

export default blogsSlice.reducer;
