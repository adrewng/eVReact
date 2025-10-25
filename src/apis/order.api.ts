import type { OrderList } from '~/types/order.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/user/order-by-user'

const orderApi = {
  getOrdersByUser() {
    return http.get<SuccessResponse<OrderList>>(URL_CREATE_AUCTION_REQUEST)
  }
}

export default orderApi
