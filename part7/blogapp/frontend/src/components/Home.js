import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createBlog,
  fetchBlogs,
  selectAllBlogs,
} from "../reducers/blogsReducer";
import { notify } from "../reducers/notificationReducer";

import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Togglable from "./Togglable";

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap();
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(notify("creating a blog failed: " + error.message, "alert"));
    }
  };

  return (
    <main>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={onCreateBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
};

export default Home;
