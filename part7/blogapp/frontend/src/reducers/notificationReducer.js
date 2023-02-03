import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification(state, action) {
      return null;
    },
  },
});

const { showNotification, hideNotification } = notificationSlice.actions;

export const notify =
  (message, type = "info") =>
  (dispatch) => {
    dispatch(showNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

export default notificationSlice.reducer;
