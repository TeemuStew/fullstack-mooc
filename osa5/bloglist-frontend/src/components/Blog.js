import { useState, useEffect } from 'react'
const Blog = ({ blog, handleLike, handleRemove, userID }) => {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    setShowButton(userID !== blog.user)
  })

  const handleLikeButton = () => {
    const updatedBlog = { ...blog, likes : blog.likes + 1 }
    handleLike(updatedBlog)
  }
  return (
    <div className="blog_item">
      <div>{blog.title}</div>
      <div>likes {blog.likes}
        <button onClick={handleLikeButton}>like</button>
      </div>
      <div>{blog.author}</div>
      {showButton ?
        <div><button value={blog.id} onClick={handleRemove}>remove</button></div>
        : <></>
      }
    </div>
  )
}

export default Blog