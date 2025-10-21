import type { PostFormValues, PostFormValuesFileOrUrl } from '~/schemas/post.schema'
import type { PostListTypeConfig } from '~/types/admin/post.type'
import type { PostListType, PostStatus, PostType, ProductListConfig } from '~/types/post.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = 'api/post/get-all-approved'
export const URL_ADD_POST = 'api/post/create-post'
export const URL_UPDATE_POST = 'api/post/update-post'
export const URL = 'api/post'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_GET_POSTS, { params: config })
  },
  addPost(data: PostFormValues) {
    return http.post(URL_ADD_POST, data)
  },
  getPostsByAdmin(params: PostListTypeConfig) {
    return http.get<SuccessResponse<PostListType>>('/api/post/get-all', { params })
  },
  getPostByMe(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>('/api/user/user-posts', { params: config })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<PostType>>(`${URL}/${id}`)
  },
  updatePostByAdmin(id: string | number, status: PostStatus, reason?: string) {
    return http.put(`/api/post/update-post-by-admin/${id}`, {
      status,
      ...(reason ? { reason } : {})
    })
  },
  updatePostRejected(data: PostFormValuesFileOrUrl) {
    return http.put(URL_UPDATE_POST, data)
  }
}

export default postApi
