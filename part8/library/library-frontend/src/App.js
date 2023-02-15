import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import useError from "./hooks/useError";

import Authors from "./components/Authors";
import Books from "./components/Books";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NewBook from "./components/NewBook";

const App = () => {
  const [error, setError] = useError(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const tkn = localStorage.getItem("accessToken");
    if (tkn) {
      setToken(tkn);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout error={error} token={token} onLogout={logout} />}
      >
        <Route index element={<Navigate to="/authors" />} />

        <Route path="authors">
          <Route index element={<Authors token={token} />} />
        </Route>

        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBook />} />
        </Route>

        <Route path="login">
          <Route
            index
            element={<Login setError={setError} setToken={setToken} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
