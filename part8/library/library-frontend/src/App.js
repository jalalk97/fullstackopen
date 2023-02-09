import { Navigate, Route, Routes } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Layout from "./components/Layout";
import NewBook from "./components/NewBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/authors" />} />

        <Route path="authors">
          <Route index element={<Authors />} />
        </Route>

        <Route path="books">
          <Route index element={<Books />} />
          <Route path="new" element={<NewBook />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
