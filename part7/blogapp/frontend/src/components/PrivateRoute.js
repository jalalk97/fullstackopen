import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { getLoggedInUser } from "../reducers/userReducer";
import LoginForm from "./LoginForm";

const PrivateRoute = (props) => {
  const loggedInUser = useSelector(getLoggedInUser);

  return loggedInUser ? <Route {...props} /> : <Navigate to="/login" replace />;
};

export default 
