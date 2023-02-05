import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notify } from "./reducers/notificationReducer";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  selectAllBlogs,
  updateBlog,
} from "./reducers/blogsReducer";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(selectAllBlogs);

  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user);
        userService.setUser(user);
        dispatch(notify(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(notify("wrong username/password", "alert"));
      });
  };

  const logout = () => {
    setUser(null);
    userService.clearUser();
    dispatch(notify("good bye!"));
  };

  const onCreateBlog = async (blog) => {
    try {
      await dispatch(createBlog(blog)).unwrap();
      dispatch(notify(`a new blog '${blog.title}' by ${blog.author} added`));
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(notify("creating a blog failed: " + error.message, "alert"));
    }
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );
    if (!ok) {
      return;
    }
    dispatch(deleteBlog(toRemove));
    dispatch(notify(`blog '${toRemove.title}' by ${toRemove.author} removed`));
  };

  const likeBlog = (id) => {
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };
    dispatch(updateBlog(liked)).unwrap();
    dispatch(notify(`you liked '${liked.title}' by ${liked.author}`));
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm onCreate={onCreateBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
