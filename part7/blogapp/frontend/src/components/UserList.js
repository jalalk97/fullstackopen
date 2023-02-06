import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllUsers } from "../reducers/usersReducer";

const UserList = () => {
  const users = useSelector(getAllUsers);

  const tableBody = users.map((user) => (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  ));

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
};

export default UserList;
