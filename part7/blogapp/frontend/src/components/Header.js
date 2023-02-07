import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { getLoggedInUser } from "../reducers/userReducer";
import NavigationBar from "./NavigationBar";

import Notification from "./Notification";

const Header = () => {
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser === null) {
    return null;
  }

  return (
    <header>
      <Notification />
      <Typography variant="h1">Blog App</Typography>
    </header>
  );
};

export default Header;
