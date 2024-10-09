import axios from "axios"
import queryString from "query-string"

const baseURL = import.meta.env.VITE_BASE_URL_SERVER

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: '',
    Accept: 'application/json',
    ...config.headers
  };

  config.data;

  return config
})

axios.interceptors.response.use((res) => {
  if (res.data && res.status >= 200 && res.status < 300) {
    return res.data
  } else {
    return Promise.reject(res.data)
  }
}, (error) => {
  console.log(':::ERROR: ', error)
  return Promise.reject(error.data)
})

export default axiosClient
