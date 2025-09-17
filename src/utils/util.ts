import axios, { AxiosError, HttpStatusCode } from 'axios'

export const isAxiosError = <T = unknown>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

export const isUnprocessableEntityError = <T = unknown>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
