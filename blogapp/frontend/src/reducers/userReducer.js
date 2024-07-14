import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
// import userService from '../services/users'
import { setNotification } from './notificationReducer'
import userService from '../services/usersBlogs'

const userSlice = createSlice({
  name: 'user',
  initialState: { loggedInUser: null, users: [] },
  reducers: {
    setUser(state, action) {
      return { ...state, loggedInUser: action.payload }
    },
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
  },
})

export const { setUser, setUsers } = userSlice.actions

export const initializeLoggedInUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const loginUser = (loginUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginUser)
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`${user.name} logged in`, 5))
    } catch (error) {
      dispatch(setNotification('Invalid credentials', 5, 'error'))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(null))
  }
}
export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer
