import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlicer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    IncrementLike(state, action) {
      const id = action.payload.id
      const blogTolike = { ...state.find((n) => n.id === id) }
      blogTolike.likes += 1
      return state.map((blog) => (blog.id !== id ? blog : blogTolike))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    updateBlog(state, action) {
      const id = action.payload.blog.id
      return state.map((blog) => (blog.id !== id ? blog : action.payload.blog))
    },
  },
})

export const { IncrementLike, appendBlog, setBlogs, removeBlog, updateBlog } =
  blogSlicer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification(error.message, 5, 'error'))
    }
  }
}
export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(
        setNotification(`Created new blog ${content.title}`, 5, 'notification'),
      )
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification(error.message, 5, 'error'))
    }
  }
}
export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.updateLike(id)
      dispatch(IncrementLike(blog))
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification(error.message, 5, 'error'))
    }
  }
}
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Blog ${blog.title} deleted`, 5, 'notification'))
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification(error.message, 5, 'error'))
    }
  }
}
export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.addComment(id, comment)
      dispatch(
        setNotification(`Created new comment ${comment}`, 5, 'notification'),
      )
      dispatch(updateBlog({ blog, comment }))
    } catch (error) {
      console.log(error.message)
      dispatch(setNotification(error.message, 5, 'error'))
    }
  }
}

export default blogSlicer.reducer
