import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase())
    })
  })
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
  }


  return (
    <div style={style}>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList