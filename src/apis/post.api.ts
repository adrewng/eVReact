import type { PostFormValues } from '~/schemas/post.schema'
import type { PostListTypeConfig, PostListType as PostListTypeAdmin, PostListStatus } from '~/types/admin/post.type'
import type { CategoryType } from '~/types/category.type'
import type { PostListType, ProductListConfig } from '~/types/post.type'
import type { PlanList } from '~/types/service.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = 'api/post/get-all'
export const URL_ADD_POST = '/create-post'
export const URL_GET_PLANS = '/plans'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_GET_POSTS, { params: config })
  },
  addPost(data: PostFormValues) {
    return http.post(URL_ADD_POST, data)
  },
  getPlans(type: Extract<CategoryType, 'vehicle' | 'battery'>) {
    return http.get<SuccessResponse<PlanList>>(`${URL_GET_PLANS}/${type}`)
  },
  getPostsByAdmin(params: PostListTypeConfig) {
    return http.get<SuccessResponse<PostListTypeAdmin>>('/api/post/get-all', { params })
  },
  getPostByMe(params: PostListStatus) {
    return http.get<SuccessResponse<PostListType>>('/api/post/user-posts', { params })
  },
  updatePostByAdmin(id: string, status: string) {
    return http.put(`/api/post/update-post-by-admin/${id}`, { status: status })
  }
}

export default postApi
