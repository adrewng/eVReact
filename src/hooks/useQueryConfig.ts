import { isUndefined, omitBy } from 'lodash'
import type { ProductListConfig } from '~/types/post.type'
import useQueryParam from './useQueryParam'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function useQueryConfig() {
  const queryParam: QueryConfig = useQueryParam()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '20',
      sort_by: queryParam.sort_by,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      category: queryParam.category,
      category_detail_id: queryParam.category_detail_id
    },
    isUndefined
  )
  return queryConfig
}
