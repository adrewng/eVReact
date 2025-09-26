import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import type { CategoryName } from '~/types/category.type'
import { CategoryName as CategoryLabel } from '~/types/category.type'
import type { ProductListConfig } from '~/types/post.type'
import type { QueryConfig } from './useQueryConfig'
import useQueryConfig from './useQueryConfig'

const STALE_TIME = 3 * 60 * 1000

type Props = { categoryName: CategoryName }

export function useListQueries({ categoryName }: Props) {
  console.log('QueryConfig:', useQueryConfig())
  const rawQueryConfig = useQueryConfig()
  const isAll = categoryName === CategoryLabel.all

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
    staleTime: STALE_TIME
  })

  const categoryID = useMemo(() => {
    if (isAll) return undefined
    return categories.data?.data?.data.find((c) => c.name === categoryName)?.id
  }, [isAll, categories.data?.data?.data, categoryName])

  const queryConfig = useMemo<QueryConfig>(() => {
    const base: QueryConfig = { ...rawQueryConfig }
    if (isAll) {
      delete (base as QueryConfig).category
      return base
    }
    return {
      ...base,
      category: typeof categoryID === 'number' ? String(categoryID) : undefined
    }
  }, [rawQueryConfig, isAll, categoryID])

  const keyPart = isAll ? 'all' : typeof categoryID === 'number' ? `category:${categoryID}` : 'pending'

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
