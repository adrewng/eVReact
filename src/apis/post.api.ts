import type { PostFormValues } from '~/schemas/post.schema'
import type { CategoryType } from '~/types/category.type'
import type { PlanList } from '~/types/plan.type'
import type { PostListType, ProductListConfig } from '~/types/post.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = '/posts'
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
    return http.get<SuccessResponse<PlanList>>(URL_GET_PLANS, { params: { type } })
  }
}

export default postApi
