import axios from 'axios'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

let apiUrl
(process.env.REACT_APP_ENV === 'development')
  ? apiUrl = process.env.REACT_APP_DEV_API_URL
  : apiUrl = process.env.REACT_APP_API_URL

export default axios.create({
  baseURL: `${apiUrl}`,
})