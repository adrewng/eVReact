import http from '~/utils/http'

const userApi = {
  getPosts() {
    return http.get('/api/user/get-all-users')
  }
}

export default userApi
