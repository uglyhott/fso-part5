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

export default { getAll, create, like, setToken }