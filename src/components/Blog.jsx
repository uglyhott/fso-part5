import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const [likes, setLikes] = useState(blog.likes)

  const isUser = blog.user.name === user.name

  const handleClick = () => {
    setButtonText(buttonText === 'view' ? 'hide' : 'view')
    setVisible(buttonText === 'view' ? true : false)
  }

  const handleLikes = () => {
    setLikes(likes + 1)
    const updatedBlog = {
      likes: likes + 1,
      url: blog.url,
      author: blog.author,
      title: blog.title,
      user: blog.user.id
    }
    updateLikes(blog.id, updatedBlog)
  }

  const onClickRemove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleClick}>{buttonText}</button>
      {visible && (
        <div>
          <div><a>{blog.url}</a></div>
          <div>likes {likes} <button onClick={handleLikes}>like</button></div>
          <div>{blog.user.name}</div>
          {isUser && (
            <div><button onClick={onClickRemove}>remove</button>
            </div>)
          }
        </div>
      )}
    </div>
  )
}

export default Blog