import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(true)
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setMessage(`New blog added: ${returnedBlog.title} by ${returnedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      setError(true)
      setMessage(error.message)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <form onSubmit={handleLogin}>
          <h3>Log in to application</h3>
          <div>
            username
            <input
              type="text"
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
  
  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog}/>
      </Togglable>
    )
  }

  const blogList = () => {
    return (
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    )
  }

  return (
      <div>
      <h2>blogs</h2>
      <Notification message={message} isError={error}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
          <button type='button' onClick={handleLogout}>Logout</button>
          </p>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )  
}

export default App