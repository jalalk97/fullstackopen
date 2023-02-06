import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";

const initialState = userService.getUser();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      userService.setUser(action.payload);
      return action.payload;
    },
    userLoggedOut(state, action) {
      userService.clearUser();
      return null;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export const getLoggedInUser = (state) => state.user;

export default userSlice.reducer;
