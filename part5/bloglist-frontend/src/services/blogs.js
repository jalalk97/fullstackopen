import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

export default { setToken, getAll, create }
