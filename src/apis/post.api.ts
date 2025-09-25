import type { PostListType, ProductListConfig } from '~/types/post.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>('/posts', { params: config })
  }
}

export default postApi
