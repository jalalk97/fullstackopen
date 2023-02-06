import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { createBlog, selectAllBlogs } from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";

import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const blogFormRef = useRef();

  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap();
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(notify("creating a blog failed: " + error.message, "alert"));
    }
  };

  const style = {
    padding: 7,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <main>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={onCreateBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <div key={blog.id} style={style}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
