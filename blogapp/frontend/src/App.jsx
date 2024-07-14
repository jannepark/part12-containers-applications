import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'

import Home from './routes/Home'
import UsersList from './routes/UsersList'
import UserBlogs from './routes/UserBlogs'
import BlogView from './routes/BlogView.jsx'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import {
  initializeLoggedInUser,
  loginUser,
  initializeAllUsers,
} from './reducers/userReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.user.loggedInUser)
  const blogs = useSelector((state) => state.blog)
  const users = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(initializeLoggedInUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(setNotification(`${error.response.data.error}`, 5))
      }
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.clear()
    window.location.reload()
  }

  if (loggedInUser === null) {
    return (
      <div className="container">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }
  return (
    <>
      <div className="container">
        <Navigation user={loggedInUser} handleLogout={handleLogout} />
        <div>
          <Container className="centered-heading">
            <h1>Blogs</h1>
          </Container>
          <Notification />
        </div>
        <Routes>
          <Route
            path="/"
            element={<Home user={loggedInUser} blogs={blogs} />}
          />
          <Route path="/users" element={<UsersList users={users} />} />
          <Route path="/users/:id" element={<UserBlogs users={users} />} />
          <Route
            path="/blogs/:id"
            element={<BlogView blogs={blogs} loggedInUser={loggedInUser} />}
          />
        </Routes>
      </div>
    </>
  )
}

export default App
