import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      const { msg, type } = action.payload
      return { msg, type }
    },
    hideNotification(state, action) {
      return ''
    },
  },
})

export const setNotification = (msg, time, type) => {
  return (dispatch) => {
    dispatch(showNotification({ msg, type }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
