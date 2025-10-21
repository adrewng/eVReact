import type { BodyUpdateProfile, ProfileData, User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const accountApi = {
  getProfile() {
    return http.get<SuccessResponse<ProfileData>>('/api/user/user-detail')
  },
  updateProfile(body: BodyUpdateProfile) {
    const formData = new FormData()
    formData.append('full_name', body.full_name)
    formData.append('email', body.email)
    formData.append('gender', body.gender)
    formData.append('phone', body.phone)
    formData.append('address', body.address)
    if (body.avatar) {
      formData.append('avatar', body.avatar)
    }
    return http.put<SuccessResponse<User>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateAvatar(formData: FormData) {
    return http.put<SuccessResponse<User>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateNewPassword(newPassword: string) {
    return http.put('/api/user/change-password', { newPassword })
  }
}

export default accountApi
