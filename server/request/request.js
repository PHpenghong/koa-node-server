const axios = require('axios')

const request = axios.create({
  timeout: 1000 * 100,
  responseType: 'json'
})

request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    const { data, status } = response
    if (status === 200) {
      return data
    }
    return Promise.reject(response)
  },
  (error) => Promise.reject(error)
)
module.exports = request
