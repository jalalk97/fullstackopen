import { useEffect, useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, showDelete }) => {
  const [isVisible, setVisible] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(prevVisible => !prevVisible)
  }

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const { title, author, url, likes, user } = blog
  // const loggedUsername = JSON.parse(window.localStorage.getItem("loggedBlogAppUser")).username

  return (
    <div style={blogStyle}>
      <div>
        {title} {author} <button onClick={toggleVisibility}>{isVisible ? "hide" : "view"}</button>
        <div style={{ display: isVisible ? "" : "None" }}>
          <div>{url}</div>
          <div>likes {likes} <button onClick={like}>like</button></div>
          <div>{user.name}</div>
        </div>
        <div>
          {showDelete && <button onClick={remove}>remove</button>}
        </div>
      </div >
    </div>
  )
}

export default Blog
