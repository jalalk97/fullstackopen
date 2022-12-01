import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "Nofification",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        message: action.payload,
        isVisible: true,
      };
    },
    hideNotification(state, action) {
      return {
        ...state,
        isVisible: false,
      };
    },
  },
});

export const { showNotification, hideNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
