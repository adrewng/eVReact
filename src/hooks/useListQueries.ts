import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import { PageName } from '~/types/page.type'
import type { ProductListConfig } from '~/types/post.type'
import type { QueryConfig } from './useQueryConfig'
import useQueryConfig from './useQueryConfig'

const STALE_TIME = 3 * 60 * 1000

type Props = { page: PageName }

export function useListQueries({ page }: Props) {
  const rawQueryConfig = useQueryConfig()
  const isAll = page === PageName.all

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
    staleTime: STALE_TIME
  })

  const categoryID = useMemo(() => {
    if (isAll) return -1
    return categories.data?.data?.data.find((c) => c.code === page)?.id ?? -1
  }, [isAll, categories.data?.data?.data, page])

  const queryConfig = useMemo<QueryConfig>(() => {
    const base: QueryConfig = { ...rawQueryConfig }
    if (isAll) {
      delete (base as QueryConfig).category
      return base
    }
    return base
  }, [rawQueryConfig, isAll])

  const keyPart = isAll ? 'all' : typeof categoryID === 'number' ? `${page}` : 'pending'

  const posts = useQuery({
    queryKey: ['posts', keyPart, queryConfig],
    queryFn: () => postApi.getPosts(queryConfig as ProductListConfig),
    staleTime: STALE_TIME,
    placeholderData: keepPreviousData,
    enabled: isAll || typeof categoryID === 'number'
  })

  return {
    categoryID,
    queryConfig,
    categoriesData: categories,
    postsData: posts
  }
}
