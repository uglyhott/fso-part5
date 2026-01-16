import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

describe('Blog Component', () => {
  
  test('displays only blog title and author', () => {
    const blog = {
      title: 'only this title shows up',
      author: 'Myself',
      url: 'testurl.com',
      likes: '10',
      user: {
        name: 'supertester'
      }
    }
    
    const user = {
      name: 'supertester'
    }
    
    const mockLikes = vi.fn()
    const mockRemove = vi.fn()

    const { container } = render(<Blog blog={blog} user={user}/>)

    const blogText = screen.getByText('only this title shows up Myself')
    const blogLikes = container.querySelector('.blog-likes')
    const blogUser = container.querySelector('.blog-user-name')

    expect(blogText).toBeDefined()
    expect(blogLikes).toBeNull()
    expect(blogUser).toBeNull()
  })
})