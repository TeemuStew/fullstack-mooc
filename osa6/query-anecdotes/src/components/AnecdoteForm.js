import { useQuery, useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({ type: 'ERROR', payload: 'anecdote too short, must have length of 5 or more'})
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT'})
      },5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    

    newAnecdoteMutation.mutate({ 
      content: content,
      id: Math.round(Math.random() * 10000),
      votes: 0
    })
    if (!newAnecdoteMutation.isError) {
      dispatch({ type: 'CREATE', payload: `anecdote '${content}' created`})
      setTimeout(() => {
        dispatch({ type: 'TIMEOUT' })
      }, 5000)
    }
    event.target.anecdote.value = ''
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
