import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import { CategoryType } from '~/types/category.type'
import type { ProductListConfig } from '~/types/post.type'
import type { QueryConfig } from './useQueryConfig'
import useQueryConfig from './useQueryConfig'

type Props = { categoryType: CategoryType }

export function useListQueries({ categoryType }: Props) {
  const rawQueryConfig = useQueryConfig()
  const isAll = categoryType === CategoryType.all
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories
  })

  const categorySlug = useMemo(() => {
    if (isAll) return CategoryType.all
    return categories.data?.data?.data.find((c) => c.slug === categoryType)?.slug ?? CategoryType.notFound
  }, [isAll, categories.data?.data?.data, categoryType])

  const queryConfig = useMemo<QueryConfig>(() => {
    const base: QueryConfig = { ...rawQueryConfig }
    if (isAll) {
      delete (base as QueryConfig).category_type
      return base
    } else {
      return { ...base, category_type: categorySlug }
    }
  }, [rawQueryConfig, isAll, categorySlug])

  const keyPart = isAll ? 'all' : categorySlug ? `${categorySlug}` : 'pending'

  const posts = useQuery({
    queryKey: ['posts', keyPart, queryConfig],
    queryFn: () => postApi.getPosts(queryConfig as ProductListConfig),
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
    enabled: isAll || !!categorySlug
  })

  return {
    categorySlug: categorySlug as CategoryType,
    queryConfig: queryConfig as QueryConfig,
    categoriesData: categories,
    postsData: posts
  }
}
