import type { ProfileData, User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

interface BodyUpdateProfile {
  email: string
  full_name: string
  phone: string
  gender: string
  date_of_birth: string
  address: string
}

const accountApi = {
  getProfile() {
    return http.get<SuccessResponse<ProfileData>>('/api/user/user-detail')
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>('/api/user/update-user/1', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }
}

export default accountApi
