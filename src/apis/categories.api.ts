import type { CategoryDetail, CategoryParent } from '~/types/category.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<CategoryParent[]>>(URL)
  },
  getCategoryById(id: number) {
    return http.get<SuccessResponse<CategoryDetail>>(`${URL}/${id}`)
  }
}

export default categoryApi
