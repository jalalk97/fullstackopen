import { useDispatch, useSelector } from "react-redux";

import { notify } from "../reducers/notificationReducer";
import { getLoggedInUser, userLoggedOut } from "../reducers/userReducer";

import Notification from "./Notification";

const Header = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  if (loggedInUser === null) {
    return null;
  }

  const logout = () => {
    dispatch(userLoggedOut());
    dispatch(notify("good bye!"));
  };

  return (
    <header>
      <h1>Blogs</h1>
      <Notification />
      <p>{loggedInUser.name} logged in</p>
      <p>
        <button onClick={logout}>logout</button>
      </p>
    </header>
  );
};

export default Header;
