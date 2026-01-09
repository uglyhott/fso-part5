import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  
  const handleClick = () => {
    setButtonText(buttonText === 'view' ? 'hide' : 'view')
    setVisible(buttonText === 'view' ? true : false)
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
         <div>likes {blog.likes} <button>like</button></div>
        </div>
      )}
    </div>  
  )
}

export default Blog