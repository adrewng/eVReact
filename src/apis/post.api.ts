import type { PostFormValues } from '~/schemas/post.schema'
import type { PostListType as PostListTypeAdmin, PostListTypeConfig } from '~/types/admin/post.type'
import type { PostListType, ProductListConfig } from '~/types/post.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = 'api/post/get-all-approved'
export const URL_ADD_POST = 'api/post/create-post'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_GET_POSTS, { params: config })
  },
  addPost(data: PostFormValues) {
    return http.post(URL_ADD_POST, data)
  },
  getPostsByAdmin(params: PostListTypeConfig) {
    return http.get<SuccessResponse<PostListTypeAdmin>>('/api/post/get-all', { params })
  },
  getPostByMe(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>('/api/user/user-posts', { params: config })
  },
  updatePostByAdmin(id: string, status: string) {
    return http.put(`/api/post/update-post-by-admin/${id}`, { status: status })
  }
}

export default postApi
