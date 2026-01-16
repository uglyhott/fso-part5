import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

const blog = {
  title: 'only this title shows up',
  author: 'Myself',
  url: 'testurl.com',
  likes: '10',
  user: {
    name: 'supertester'
  }
}

const testUser = {
    name: 'supertester'
}

describe('Blog Component', () => {

  test('displays only blog title and author', () => {
    render(<Blog blog={blog} user={testUser}/>)

    const blogText = screen.getByText('only this title shows up Myself')
    const blogLikes = screen.queryByText('likes 10')
    const blogUser = screen.queryByText('supertester')

    expect(blogText).toBeDefined()
    expect(blogLikes).toBeNull()
    expect(blogUser).toBeNull()
  }),
  test('blog url and likes are shown after show-button is pressed', async () => {
    render(<Blog blog={blog} user={testUser}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const blogLikes = screen.queryByText('likes 10')
    const blogUser = screen.queryByText('supertester')

    expect(blogLikes).toBeDefined()
    expect(blogUser).toBeDefined()
  })
})