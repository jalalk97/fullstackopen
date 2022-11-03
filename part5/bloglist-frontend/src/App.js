import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState(null)

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
      console.log(error)
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    console.log("create blog")
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog))
      notify(`a new blog ${title} by ${author} added`, false)
      setTitle("")
      setAuthor("")
      setUrl("")
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
    <div>
      {user == null
        ? <>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <LoginForm
            handleSubmit={handleLogin}
            handleUsernameChange={(event) => setUsername(event.target.value)}
            handlePasswordChange={(event) => setPassword(event.target.value)}
            username={username}
            password={password}
          />
        </>
        : <>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            handleSubmit={handleCreateBlog}
            handleTitleChange={(event) => setTitle(event.target.value)}
            handleAuthorChange={(event) => setAuthor(event.target.value)}
            handleUrlChange={(event) => setUrl(event.target.value)}
            title={title}
            author={author}
            url={url}
          />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </>
      }
    </div>
  )
}

export default App
