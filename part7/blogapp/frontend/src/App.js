import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { notify } from "./reducers/notificationReducer";
import {
  createBlog,
  deleteBlog,
  fetchBlogs,
  selectAllBlogs,
  updateBlog,
} from "./reducers/blogsReducer";
import {
  getLoggedInUser,
  userLoggedIn,
  userLoggedOut,
} from "./reducers/userReducer";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import loginService from "./services/login";

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(selectAllBlogs);
  const loggedInUser = useSelector(getLoggedInUser);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        dispatch(userLoggedIn(user));
        dispatch(notify(`${user.name} logged in!`));
      })
      .catch(() => {
        dispatch(notify("wrong username/password", "alert"));
      });
  };

  const logout = () => {
    dispatch(userLoggedOut());
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

  if (loggedInUser === null) {
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
        {loggedInUser.name} logged in
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
            user={loggedInUser}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
