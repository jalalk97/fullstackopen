import { useSelector } from "react-redux";
import { getLoggedInUser } from "./reducers/userReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { Route, Routes, useMatch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import UserList from "./components/UserList";

const App = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const users = useSelector(getAllUsers);

  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  console.log(user);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={loggedInUser ? <Home /> : <LoginForm />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
