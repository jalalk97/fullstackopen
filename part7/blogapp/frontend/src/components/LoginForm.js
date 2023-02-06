import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify } from "../reducers/notificationReducer";
import { userLoggedIn } from "../reducers/userReducer";
import loginService from "../services/login";

import Notification from "./Notification";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(userLoggedIn(user));
        navigate("/");
        dispatch(notify(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(notify("wrong username/password", "alert"));
      });
  };

  return (
    <div>
      <Notification />
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
