import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls event handler with correct details', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByLabelText('Title')
  const author = screen.getByLabelText('Author')
  const url = screen.getByLabelText('URL')
  const submit = screen.getByText('create')

  await user.type(title, 'BlogForm title is sent')
  await user.type(author, 'Bill Gates')
  await user.type(url, 'test.com')
  await user.click(submit)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('BlogForm title is sent')
  expect(createBlog.mock.calls[0][0].author).toBe('Bill Gates')
  expect(createBlog.mock.calls[0][0].url).toBe('test.com')
})