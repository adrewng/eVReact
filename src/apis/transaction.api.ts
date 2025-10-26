import type { Transactions } from '~/types/transaction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const transactionApi = {
  getUserTransaction() {
    return http.get<SuccessResponse<Transactions>>('/api/order/get-transaction-detail')
  },
  topUpWallet() {
    return http.post('/api/payment/topup')
  }
}

export default transactionApi
