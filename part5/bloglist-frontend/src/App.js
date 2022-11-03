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
    console.log("login")
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
    console.log("logout")
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    console.log("create blog")
    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog))
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, false)
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
      setBlogs(blogs)
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
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </>
  )
}

export default App
