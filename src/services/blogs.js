import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = userToken => {
  token = `Bearer ${userToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { authorization: token}, 
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async (id, likedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, likedBlog)
  return response.data
} 

const removeBlog = async (id) => {
  const config = {
    headers: { authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}

export default { getAll, create, like, setToken, removeBlog }