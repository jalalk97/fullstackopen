import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Authors from "./components/Authors";
import Books from "./components/Books";
import EditAuthor from "./components/EditAuthor";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/RecommendedBooks";
import { AuthContext } from "./context/auth";

const App = () => {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Authors />} />

        <Route path="login" element={<Login />} />

        <Route path="authors">
          <Route index element={<Navigate to="/" />} />
          <Route
            path="edit"
            element={
              userInfo.token ? (
                <EditAuthor />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
        </Route>

        <Route path="books">
          <Route index element={<Books />} />
          <Route
            path="new"
            element={
              userInfo.token ? (
                <NewBook />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
          <Route
            path="recommend"
            element={
              userInfo.token ? (
                <RecommendedBooks />
              ) : (
                <Navigate to="/login" state={{ from: location }} replace />
              )
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
