import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
}
const addComment = async (id, comment) => {
  const commentObject = { comment: comment }
  const response = await axios.post(`${baseUrl}/${id}/comments`, commentObject)
  return response.data
}
const updateLike = async (id) => {
  const blogToChange = await axios.get(`${baseUrl}/${id}`)
  const blog = blogToChange.data
  blog.likes += 1
  const response = await axios.put(`${baseUrl}/${id}`, blog)

  return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  updateLike,
  addComment,
}
