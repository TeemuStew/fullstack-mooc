const dummy = (blogs) => {
  return 1
}
  
const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0) 
}

const fauvoriteBlog = blogs => {
  const reducer = (mostLikes, item) => {
    return mostLikes.likes > item.likes
      ? mostLikes
      : item
  }
  return blogs.length === 0
    ? null
    : blogs.reduce(reducer, blogs[0]) 
}

const mostLikes = blogs => {
  let mostLikesAuthor = blogs.reduce((current, {author, likes}) => {
    current[author] = current[author] || 0
    current[author] += likes
    return current
  },{})

  let res = Object.keys(mostLikesAuthor).sort((x,y)=> mostLikesAuthor[y] - mostLikesAuthor[x])[0]

  return {author: res, likes: mostLikesAuthor[res]}
}

module.exports = {
  dummy,
  totalLikes,
  fauvoriteBlog,
  mostLikes
}