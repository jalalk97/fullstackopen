import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../queries";

const Login = ({ setError, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("accessToken", token);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <button>login</button>
      </div>
    </form>
  );
};
export default Login;
