import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_VERIFY_ORDER = 'api/order/verify'
export const paymentApi = {
  verify(orderCode: string, signal?: AbortSignal) {
    return http.post<SuccessResponse<{ id: number; status: string; code: string }>>(
      URL_VERIFY_ORDER,
      { orderCode },
      { signal }
    )
  }
}
