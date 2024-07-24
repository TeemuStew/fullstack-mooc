const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')


test('dummy returns one', () => {
  const result = listHelper.dummy(helper.blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has only many blogs equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('favorite blog when list has many blogs', () => {
    expect(listHelper.fauvoriteBlog(helper.blogs)).toEqual(helper.blogs[2])
  })
  test('favorite blog when list has one blog', () => {
    expect(listHelper.fauvoriteBlog(helper.listWithOneBlog)).toEqual(helper.listWithOneBlog[0])
  })
  test('favorite blog when list has no blog', () => {
    expect(listHelper.fauvoriteBlog([])).toEqual(null)
  })
})

describe('most blogs and likes', () => {
  test('author with most likes', () => {
    let res = {author: 'Edsger W. Dijkstra', likes: 17}
    expect(listHelper.mostLikes(helper.blogs)).toEqual(res)
  })
})
