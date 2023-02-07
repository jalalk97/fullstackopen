import { useSelector } from "react-redux";
import { selectAllBlogs } from "./reducers/blogsReducer";
import { getLoggedInUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import { Container } from "@mui/material";

import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import UserList from "./components/UserList";
import Blog from "./components/Blog";

const App = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const users = useSelector(getAllUsers);
  const blogs = useSelector(selectAllBlogs);

  const userMatch = useMatch("/users/:id");
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  return (
    <Container>
      <Header />
      <Routes>
        <Route
          path="/"
          element={loggedInUser ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/users"
          element={
            loggedInUser ? <UserList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/users/:id"
          element={
            loggedInUser ? (
              <User user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/blogs" element={<Navigate to="/" replace />} />
        <Route
          path="/blogs/:id"
          element={
            loggedInUser ? (
              <Blog blog={blog} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
