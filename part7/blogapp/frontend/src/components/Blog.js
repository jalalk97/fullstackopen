import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLoggedInUser } from "../reducers/userReducer";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import PropTypes from "prop-types";

const BlogDetails = ({ blog, visible }) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedInUser);

  if (!visible) return null;

  const removeBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`);
    if (!ok) {
      return;
    }
    dispatch(deleteBlog(blog));
    dispatch(notify(`blog '${blog.title}' by ${blog.author} removed`));
  };

  const likeBlog = () => {
    const liked = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id,
    };
    dispatch(updateBlog(liked));
    dispatch(notify(`you liked '${liked.title}' by ${liked.author}`));
  };

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";
  const own = blog.user && user.username === blog.user.username;

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={removeBlog}>remove</button>}
    </div>
  );
};

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <BlogDetails blog={blog} visible={visible} />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default Blog;
