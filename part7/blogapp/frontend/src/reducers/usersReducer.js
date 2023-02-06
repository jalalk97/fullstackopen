import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

export const fetchUsers = createAsyncThunk("users/getUsers", async () => {
  const users = await usersService.getAll();
  return users;
});

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const getAllUsers = (state) => state.users;

export default usersSlice.reducer;
