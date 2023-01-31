import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showMessage(state, action) {
      const message = action.payload;
      return message;
    },
    hideMessage(state, action) {
      return null;
    },
  },
});

export const { showMessage, hideMessage } = notificationSlice.actions;

export const setNotification = (message, seconds) => (dispatch) => {
  dispatch(showMessage(message));
  setTimeout(() => {
    dispatch(hideMessage());
  }, 1000*seconds);
};

export default notificationSlice.reducer;
