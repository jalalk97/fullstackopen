import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const notify = (message, isError) => {
    setNotification({ message, isError })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const submission = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(submission))
      blogService.setToken(submission.token)
      setUser(submission)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.log(error.message)
      console.log(error.response.data.error)
      notify(error.response.data.error, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs((prevBlogs) => prevBlogs
        .concat(createdBlog)
        .sort((blog1, blog2) => blog2.likes - blog1.likes))
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, false)
    } catch (error) {
      console.log(error.message)
      console.log(error.response.data.error)
      notify(error.response.data.error, true)
    }
  }

  const likeBlog = async (blogObject) => {
    try {
      await blogService.update(blogObject.id,
        {
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
          likes: blogObject.likes + 1,
          user: blogObject.user.id,
        }
      );
      setBlogs(prevBlogs => prevBlogs
        .map((blog) => blog.id === blogObject.id ? { ...blog, likes: blog.likes + 1 } : blog)
        .sort((blog1, blog2) => blog2.likes - blog1.likes))
    } catch (error) {
      console.log(error.message)
      console.log(error.response.data.error)
      notify(error.response.data.error, true)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON != null) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((blog1, blog2) => blog2.likes - blog1.likes))
    )
  }, [])

  return (
    <>
      {user == null
        ? <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            username={username}
            password={password}
          />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          )}
        </div>
      }
    </>
  )
}

export default App
