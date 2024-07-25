import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { notificationData } from "../reducers/notificationReducer";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})


export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(notificationData(`you created an anecdote: '${content}'`, 10))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    await anecdoteService.updateVotes(anecdote)
    const updatedAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(updatedAnecdotes))
    dispatch(notificationData(`you voted '${anecdote.content}'`, 10))
  }
}

export default anecdoteSlice.reducer