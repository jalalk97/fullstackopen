import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { notify } from "../reducers/notificationReducer";
import { userLoggedIn } from "../reducers/userReducer";
import loginService from "../services/login";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

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

  const items = [
    { label: "username", state: username, setState: setUsername },
    { label: "password", state: password, setState: setPassword },
  ];

  const loginForm = (
    <Box pt={15} maxWidth={500} m="auto">
      <Card>
        <Typography variant="h2" align="center">
          Blog App
        </Typography>
        <CardContent>
          <Grid container spacing={1}>
            {items.map((item) => (
              <Grid key={item.label} xs={12} item>
                <TextField
                  id={item.label}
                  value={item.state}
                  onChange={(event) => item.setState(event.target.value)}
                  label={item.label}
                  placeholder={`Enter blog ${item.label}`}
                  variant="outlined"
                  required
                  fullWidth
                  type={item.label === "password" ? "password" : "text"}
                />
              </Grid>
            ))}
            <Grid xs={12} item>
              <Button
                id="create-butto"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );

  return loginForm;
  // return (
  //   <div>
  //     <Notification />
  //     <h2>Log in to application</h2>

  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         username
  //         <input
  //           value={username}
  //           onChange={({ target }) => setUsername(target.value)}
  //           id="username"
  //         />
  //       </div>
  //       <div>
  //         password
  //         <input
  //           type="password"
  //           value={password}
  //           onChange={({ target }) => setPassword(target.value)}
  //           id="password"
  //         />
  //       </div>
  //       <button id="login-button" type="submit">
  //         login
  //       </button>
  //     </form>
  //   </div>
  // );
};

export default LoginForm;
