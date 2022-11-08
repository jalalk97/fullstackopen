import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'The blog title',
    author: 'The blog author',
    url: 'https://www.theblog.com',
    user: {
      name: 'User Name',
      username: 'username',
    },
  }

  const { container } = render(<Blog
    blog={blog}
    likeBlog={() => console.log('like')}
    removeBlog={() => console.log('remove')}
    showDelete={false}
  />)

  screen.debug()

  const blogDiv = container.querySelector('.blog')

  expect(blogDiv).toHaveTextContent(
    'The blog title'
  )
  expect(blogDiv).toHaveTextContent(
    'The blog author'
  )
  expect(blogDiv).not.toHaveTextContent(
    'https://www.theblog.com'
  )
  expect(blogDiv).not.toHaveTextContent(
    'likes'
  )
})
