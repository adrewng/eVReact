import axios, { AxiosError, HttpStatusCode } from 'axios'
import type { ErrorResponse } from '~/types/util.type'

export const isAxiosError = <T = unknown>(error: unknown): error is AxiosError<T> => axios.isAxiosError(error)

export const isUnprocessableEntityError = <T = unknown>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export function isAxiosPaymentRequiredError<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.PaymentRequired
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function sameFile(a: unknown, b: unknown): boolean {
  if (!(a instanceof File) || !(b instanceof File)) return false
  if (a === b) return true // cùng reference
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
}
