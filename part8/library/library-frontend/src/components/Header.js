import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/authors">authors</Link>
        </li>
        <li>
          <Link to="/books">books</Link>
        </li>
        <li>
          <Link to="/books/new">add book</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Header;