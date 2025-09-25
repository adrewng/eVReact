import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REGISTER } from '~/apis/auth.api'
import type { AuthResponse } from '~/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './auth'
class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.instance = axios.create({
      baseURL: '/api/',
      timeout: 10 * 1000,
      headers: { 'Content-Type': 'application/json' }
    })
    this.accessToken = getAccessTokenFromLS()
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        if (response.config.url === URL_LOGIN || response.config.url === URL_REGISTER) {
          setAccessTokenToLS((response.data as AuthResponse).data.access_token)
          this.accessToken = (response.data as AuthResponse).data.access_token
          setProfileToLS((response.data as AuthResponse).data.user)
        } else if (response.config.url === URL_LOGOUT) {
          clearLS()
          this.accessToken = ''
        }
        return response
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          console.log(error)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
