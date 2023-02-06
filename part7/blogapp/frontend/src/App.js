import { useSelector } from "react-redux";
import { getLoggedInUser } from "./reducers/userReducer";

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";

const App = () => {
  const loggedInUser = useSelector(getLoggedInUser);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={loggedInUser ? <Home /> : <LoginForm />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
};

export default App;
