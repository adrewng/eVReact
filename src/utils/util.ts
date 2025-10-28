import axios, { AxiosError, HttpStatusCode } from 'axios'
import { CategoryType } from '~/types/category.type'
import type { BatteryType, VehicleType } from '~/types/post.type'
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
export const formatCurrencyVND = (val: string | number | undefined | null, unit?: string) => {
  // 1) Nếu không có giá trị → trả chuỗi rỗng
  if (val === undefined || val === null) return ''
  // 2) Nếu là string và *trông có vẻ đã có phân tách hàng nghìn*
  //    (có mẫu “...1.234” hoặc “...1,234”) → chỉ việc thêm " ₫" phía sau
  if (typeof val === 'string' && /\d+[.,]\d{3}/.test(val)) return `${val} ₫`
  // 3) Chuyển về số:
  //    - Nếu là string: loại bỏ mọi ký tự không phải số, dấu trừ, dấu chấm
  //      (ví dụ "12.345 đ" → "12.345" → Number(...) = 12345)
  //    - Nếu vốn là number thì dùng luôn
  const n = typeof val === 'string' ? Number(val.replace(/[^0-9.-]/g, '')) : val
  // 4) Nếu chuyển không ra số (NaN) → trả lại nguyên giá trị string ban đầu
  if (Number.isNaN(n)) return String(val)
  // 5) Dùng Intl với locale 'vi-VN' để nhóm hàng nghìn theo kiểu Việt Nam
  //    (dấu chấm) rồi thêm " ₫" phía sau
  return new Intl.NumberFormat('vi-VN').format(n) + ' ' + (unit ? unit : 'đ')
}
export const fmtDate = (s?: string) => (s ? new Date(s).toLocaleString('vi-VN') : '—')

export const formatOwners = (val?: number | string) => {
  if (val === undefined || val === null || val === '') return undefined
  const n = typeof val === 'string' ? Number(val) : val
  if (Number.isFinite(n)) return n === 1 ? '1 đời' : `${n} đời`
  return String(val)
}
export function sameFile(a: unknown, b: unknown): boolean {
  if (!(a instanceof File) || !(b instanceof File)) return false
  if (a === b) return true // cùng reference
  return a.name === b.name && a.size === b.size && a.lastModified === b.lastModified
}

export const isVehicle = (p: VehicleType | BatteryType): p is VehicleType =>
  p.category.typeSlug === CategoryType.vehicle

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string | number }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const time = new Date(timestamp)
  const diff = Math.floor((now.getTime() - time.getTime()) / 1000)
  if (diff < 60) return 'Vừa xong'
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`
  return `${Math.floor(diff / 86400)} ngày trước`
}
