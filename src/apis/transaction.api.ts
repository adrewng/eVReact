import type { Transactions } from '~/types/transaction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const transactionApi = {
  getUserTransaction() {
    return http.get<SuccessResponse<Transactions>>('/api/order/get-transaction-detail')
  },
  topUpWallet({ user_id, amount, description }: { user_id: number; amount: number; description: string }) {
    return http.post('/api/payment/topup', { user_id, amount, description })
  },
  
}

export default transactionApi
