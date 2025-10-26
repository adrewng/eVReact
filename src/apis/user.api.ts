import type { UserGetByAdmin } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const userApi = {
  getAllUser() {
    return http.get<SuccessResponse<UserGetByAdmin[]>>('/api/user/get-all-users')
  }
}

export default userApi
