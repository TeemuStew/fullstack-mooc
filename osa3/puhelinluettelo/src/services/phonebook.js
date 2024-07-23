import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(`${baseUrl}`)
}

const getSingle = (person) => {
  return axios.get(`${baseUrl}/${person.id}`)
}
  
const create = async (person) => {
  const request = axios.post(`${baseUrl}`, person)
  return request.then(response => response.data)
}

const update = (person) => {
  return axios.put(`${baseUrl}/${person.id}`, person)
}

const remove = (person) => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

export default {
  getAll: getAll,
  getSingle: getSingle,
  create: create,
  update: update,
  remove: remove
}