import { Navigate, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import EditAuthor from "./components/EditAuthor";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import RecommendedBooks from "./components/RecommendedBooks";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Authors />} />

        <Route path="login" element={<Login />} />

        <Route path="authors">
          <Route index element={<Navigate to="/" />} />
          <Route path="edit" element={<EditAuthor />} />
        </Route>

        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBook />} />
          <Route path="recommend" element={<RecommendedBooks />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
