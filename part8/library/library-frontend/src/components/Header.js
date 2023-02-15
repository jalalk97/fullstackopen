import { Link } from "react-router-dom";
import Notification from "./Notification";

const Header = ({ error, token, onLogout }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/authors">authors</Link>
          </li>
          <li>
            <Link to="/books">books</Link>
          </li>
          {!token && (
            <li>
              <Link to="/login">login</Link>
            </li>
          )}
          {token && (
            <li>
              <button onClick={handleLogout}>logout</button>
            </li>
          )}
        </ul>
      </nav>
      <Notification error={error} />
    </>
  );
};
export default Header;
