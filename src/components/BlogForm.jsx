import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }

    createBlog(newBlog)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label>
          Title
            <input
              type="text"
              name='Title'
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
          Author
            <input
              type="text"
              name='Author'
              value={author}
              onChange={event => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
          URL
            <input
              type="text"
              name='Url'
              value={url}
              onChange={event => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm