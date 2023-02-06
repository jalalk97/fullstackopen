import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { getLoggedInUser, userLoggedOut } from "../reducers/userReducer";

import { Link } from "react-router-dom";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(getLoggedInUser);

  const logout = () => {
    dispatch(userLoggedOut());
    dispatch(notify("good bye!"));
  };

  const ulStyle = { listStyleType: "none", paddingLeft: 0, background: "grey" };
  const liStyle = { display: "inline-block", padding: 5 };

  return (
    <nav>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/blogs">blogs</Link>
        </li>
        <li style={liStyle}>
          <Link to="/users">users</Link>
        </li>
        <li style={liStyle}>
          {loggedInUser.name} logged in <button onClick={logout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
