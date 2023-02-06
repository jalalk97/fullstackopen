const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <article>
      <h2>{user.name} </h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </article>
  );
};

export default User;
