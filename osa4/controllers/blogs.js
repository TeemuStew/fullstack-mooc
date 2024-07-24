const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if (typeof blog === 'undefined') {
    res.status(401).json({error: 'something went wrong'})
  }
  if (blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(req.params.id)
    user.blogs = user.blogs.filter(b =>b.id !== blog.id)
    await user.save()
    res.status(204).end()
  }
  else {
    res.status(401).json({error: 'user does not have permission to delete this blog'})
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  if (!body.url || !body.title) {
    response.status(400).send('Bad request')
  }
  else {
    const blog = new Blog({
      title : body.title,
      author : body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog)
      
  }
})

blogsRouter.put('/:id', (req, res) => {
  const body = req.body

  const blog = {
    title : body.title,
    author : body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(req.params.id, blog, {new : true})
    .then(updatedBlog => {
      res.json(updatedBlog)
    })
    .catch(error => console.error(error))

})

module.exports = blogsRouter
