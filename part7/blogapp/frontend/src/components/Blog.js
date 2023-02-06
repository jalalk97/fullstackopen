import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteBlog, updateBlog } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";
import { getLoggedInUser } from "../reducers/userReducer";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(getLoggedInUser);
  const navigate = useNavigate();

  if (!blog) {
    return null;
  }

  const removeBlog = () => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`);
    if (!ok) {
      return;
    }
    dispatch(deleteBlog(blog));
    navigate("/");
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
    <article>
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <a href={blog.url}>blog.url</a>
      <div>
        {blog.likes} likes <button onClick={likeBlog}>like</button>
      </div>
      <div>
        added by {addedBy} {own && <button onClick={removeBlog}>delete</button>}
      </div>
    </article>
  );
};

export default Blog;
