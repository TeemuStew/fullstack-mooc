import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const handlePost = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }
    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handlePost}>
        <div>title
          <input
            value={newTitle}
            onChange={(e) => {setNewTitle(e.target.value)}}
          />
        </div>
        <div> author
          <input
            value={newAuthor}
            onChange={(e) => {setNewAuthor(e.target.value)}}
          />
        </div>
        <div> url
          <input
            value={newUrl}
            onChange={(e) => {setNewUrl(e.target.value)}}/>
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm