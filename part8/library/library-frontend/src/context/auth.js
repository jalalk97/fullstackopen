import { createContext, useReducer } from "react";

const initialState = {
  token: localStorage.getItem("jwtToken"),
};

export const AuthContext = createContext({
  userInfo: null,
  login: (token) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (token) => {
    localStorage.setItem("jwtToken", token);
    dispatch({
      type: "LOGIN",
      payload: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      {...props}
      value={{ userInfo: state, login, logout }}
    />
  );
};
