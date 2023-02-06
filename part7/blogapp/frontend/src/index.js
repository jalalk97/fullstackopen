import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { fetchBlogs } from "./reducers/blogsReducer";
import { fetchUsers } from "./reducers/usersReducer";

import store from "./store";

store.dispatch(fetchUsers());
store.dispatch(fetchBlogs());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
