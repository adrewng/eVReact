import type { UserListGetByAdmin } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const userApi = {
  getAllUser() {
    return http.get<SuccessResponse<UserListGetByAdmin>>('/api/user/get-all-users')
  }
}

export default userApi
