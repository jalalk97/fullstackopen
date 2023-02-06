import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, getAllUsers } from "../reducers/usersReducer";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const tableBody = users.map((user) => (
    <tr key={user.id}>
      <td>{user.name}</td>
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
