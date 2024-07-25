import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationSet(state, action) {
      return action.payload
    }
  } 
})


export const { notificationSet } = notificationSlice.actions

export const notificationData = (content, duration) => {
  return async dispatch => {
    dispatch(notificationSet(content))
    setTimeout(() => {
      dispatch(notificationSet(''))
    }, duration*1000)
  }
}

export default notificationSlice.reducer