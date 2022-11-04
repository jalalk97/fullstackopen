import { useState } from 'react'

const Blog = ({ blog }) => {
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
    console.log("like")
  }

  const { title, author, url, likes, user } = blog

  return (
    <div style={blogStyle}>
      <div>
        {title} {author} <button onClick={toggleVisibility}>{isVisible ? "hide" : "view"}</button>
        <div style={{ display: isVisible ? "" : "None" }}>
          <div>{url}</div>
          <div>likes {likes} <button onClick={like}>like</button></div>
          <div>{user.name}</div>
        </div>
      </div >
    </div>
  )
}

export default Blog
