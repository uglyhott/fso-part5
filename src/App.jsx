import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user))
      debugger
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      alert('Wrong Credentials')
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    debugger
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
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

  const blogForm = () => {
    return (
      <div>
        <form onSubmit={handleCreateBlog}>
          <div>
          Title
          <input 
            type="text"
            name='Title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
          Author
          <input 
            type="text"
            name='Author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
          URL
          <input 
            type="text"
            name='Url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type='submit'>create</button>
        </form>
      </div>
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