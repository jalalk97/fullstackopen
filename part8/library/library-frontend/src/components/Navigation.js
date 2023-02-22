import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Navigation = () => {
  const navigate = useNavigate();

  const { userInfo, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/authors">authors</Link>
        </li>
        <li>
          <Link to="/books">books</Link>
        </li>
        {userInfo.token && (
          <li>
            <Link to="/books/recommend">recommend</Link>
          </li>
        )}
        {userInfo.token && (
          <li>
            <Link to="/books/new">add book</Link>
          </li>
        )}
        {userInfo.token && (
          <li>
            <Link to="/authors/edit">edit author</Link>
          </li>
        )}
        {!userInfo.token && (
          <li>
            <Link to="/login">login</Link>
          </li>
        )}
        {userInfo.token && (
          <li>
            <button onClick={handleLogout}>logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
