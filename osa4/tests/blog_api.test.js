const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})

describe('Blog api tests', () => {
  test('0 likes is default', async () => {
    await api.post('/api/blogs')
      .send(helper.blogWithoutLikes)
      .expect(201)
    const response = await helper.blogsInDb()

    response.map(blog => {
      if(blog.id === helper.blogWithoutLikes.id) {
        expect(blog.likes).toEqual(0)
      }
    })
      
  }, 10000)

  test('all blogs are returned', async () => {
    const response = await helper.blogsInDb()
    
    expect(response).toHaveLength(helper.blogs.length)
  })
  
  test('ID exists', async () => {
    const response = await helper.blogsInDb() 
    expect(response[0].id).toBeDefined()
  })
  
  test('Adding a blog increases blog count by one', async () => {
    const oddBlog2 = [
      {
        _id: '5a422aa71b54a676234d1aaa',
        title: 'Testiblogi',
        author: 'Teemu',
        url: 'www.blogi.fi',
        likes: 123,
      }
    ]
    const initialResponse = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(oddBlog2)
      .expect(201)

    const afterResponse = await helper.blogsInDb()
    expect(initialResponse).toHaveLength(afterResponse.length - 1)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('If url or title is not defined, expect post request to fail', async () => {
    await api.post('/api/blogs')
      .send(helper.blogWithoutUrlOrTitle)
      .expect(400)
      .expect('Bad request')
  })

  test('Deletion of a blog decreases blog count by one', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete = initialBlogs[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const afterDeletion = await helper.blogsInDb()
    expect(initialBlogs).toHaveLength(afterDeletion.length + 1 )
  })

  test('Blog modification', async () => {
    const initial = await helper.blogsInDb()
    const notModified = initial[0]
    const newBlog = { ...notModified, likes : notModified.likes - 1}

    const modified = await api.put(`/api/blogs/${notModified.id}`)
      .send(newBlog)
    expect(modified.body.likes).toEqual(notModified.likes-1)

    const initialmod = await helper.blogsInDb()
    const likesModified = initialmod[0]
    expect(likesModified.likes).toEqual(notModified.likes-1)
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails with a proper statuscode if password length is under 3 characters', async () => {
    const newUser = {
      username: 'var',
      name: 'tee',
      password: '12'
    }
    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(res.body.error).toContain('password must be atleast 3 characters long')
  })

  test('creation fails with a proper statuscode if password is undefined', async () => {
    const newUser = {
      username: 'var',
      name: 'tee',
    }
    const res = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    expect(res.body.error).toContain('password must be atleast 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})