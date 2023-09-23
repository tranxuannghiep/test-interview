import axios, { AxiosInstance } from 'axios'
import { APP_CONSTANT } from '../constants'

const BASE_URL = APP_CONSTANT.BASE_URL
const baseConfig = (baseURL?: string, contentType = 'application/json') => {
  return {
    baseURL,
    headers: {
      'Accept-Language': 'en-US',
      'Content-Type': contentType,
    },
  }
}

const createServiceNoLogin = (
  baseURL?: string,
  contentType = 'application/json'
): AxiosInstance => {
  const instance = axios.create(baseConfig(baseURL, contentType))
  return instance
}

const createService = (
  baseURL?: string,
  contentType = 'application/json',
  authToken?: string
): AxiosInstance => {
  const instance = axios.create(baseConfig(baseURL, contentType))
  instance.interceptors.request.use((cf) => {
    //get token
    // const cookieToken = CookieHelper.getValue(COOKIE_CONSTANT.ACCESS_TOKEN)
    // const token = authToken || cookieToken
    const token = authToken
    if (token && cf?.headers) {
      cf.headers['Authorization'] = 'Bearer ' + token
    }
    return cf
  })

  function createAxiosResponseInterceptor() {
    const interceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        axios.interceptors.response.eject(interceptor)
        return Promise.reject(error)
      }
    )
  }
  createAxiosResponseInterceptor()
  return instance
}

export const instanceServerSide = (token?: string) => {
  const result = createService(BASE_URL, 'application/json', token)
  return result
}

export const noLoginInstance = createServiceNoLogin(BASE_URL)
