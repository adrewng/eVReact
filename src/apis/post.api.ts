import type { PostFormValues } from '~/schemas/post.schema'
import type { CategoryType } from '~/types/category.type'
import type { PostListType, ProductListConfig } from '~/types/post.type'
import type { ServiceList } from '~/types/service.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = 'api/post/get-all-approved'
export const URL_ADD_POST = 'api/post/create-post'
export const URL_GET_PLANS = '/plans'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_GET_POSTS, { params: config })
  },
  addPost(data: PostFormValues) {
    return http.post(URL_ADD_POST, data)
  },
  getPlans(type: Extract<CategoryType, 'vehicle' | 'battery'>) {
    return http.get<SuccessResponse<ServiceList>>(`${URL_GET_PLANS}/${type}`)
  }
}

export default postApi
