import Blog from './Blog'

const BlogList = ({ blogs, handleLike,handleRemove, userID }) => {
  const sortBlogs = () => {
    const compare = (x,y) => {
      if (x.likes < y.likes) {
        return -1
      }
      if (x.likes > y.likes) {
        return 1
      }
      return 0
    }
    return blogs.sort(compare)
  }
  const sortedBlogs = sortBlogs(blogs)
  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} userID={userID} />
      )}
    </div>
  )
}

export default BlogList