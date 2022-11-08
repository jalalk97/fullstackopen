import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>title</label>
          <input
            className='titleField'
            type='text'
            name='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>author</label>
          <input
            className='authorField'
            type='text'
            name='author'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor='url'>url</label>
          <input
            className='urlField'
            type='text'
            name='url'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm
