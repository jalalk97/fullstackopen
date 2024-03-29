import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      code
      success
      message
      token {
        value
      }
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [login] = useMutation(LOGIN, {
    variables: { username, password },
    update: (_, { data }) => {
      authContext.login(data.login.token.value);
    },
  });

  const authContext = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login();

    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </>
  );
};

export default Login;
