import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
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

test('renders url and likes on button click', async () => {
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

  const user = userEvent.setup()
  const button = screen.getByText('view')
  const blogDiv = container.querySelector('.blog')
  await user.click(button)

  expect(blogDiv).toHaveTextContent(
    'https://www.theblog.com'
  )
  expect(blogDiv).toHaveTextContent(
    'likes'
  )
})

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'The blog title',
    author: 'The blog author',
    url: 'https://www.theblog.com',
    user: {
      name: 'User Name',
      username: 'username',
    },
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog
    blog={blog}
    likeBlog={mockHandler}
    removeBlog={() => console.log('remove')}
    showDelete={false}
  />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
