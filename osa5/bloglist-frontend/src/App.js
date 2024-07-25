import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const doThings = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    doThings()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleRemove = (e) => {
    const id = e.target.value
    if (window.confirm(`are you sure you want to delete person ${id}`)) {
      blogService
        .rem(e.target.value)
        .then(() => {
          const filtered = blogs.filter((b) => b.id !== id)
          setBlogs(filtered)
        })
    }
  }

  const createBlog=(blogObj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObj)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
    setErrorMessage(`a new blog ${blogObj.title} by ${blogObj.author} added!`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLike = (likedBlog) => {
    blogService.update(likedBlog.id, likedBlog)
      .then(rBlog => {
        setBlogs(blogs.filter(b => b.id !== likedBlog.id ? b : rBlog))
      })
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user===null ?
        <>
          <LoginForm
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            password={password}
            username={username}
            handleSubmit={handleLogin}/>
        </>
        :
        <div>
          <h2>blogs</h2>
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          </div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          <BlogList blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} userID={user.id} />

        </div>
      }
    </div>
  )
}

export default App
