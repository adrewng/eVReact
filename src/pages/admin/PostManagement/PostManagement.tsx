import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import postApi from '~/apis/post.api'
import useQueryParam from '~/hooks/useQueryParam'
import type { PostListTypeConfig } from '~/types/admin/post.type'
import PostFilters from './components/PostFilters'
import PostStats from './components/PostStats'
import PostTable from './components/PostTable'

export type QueryConfig = {
  [key in keyof PostListTypeConfig]: string
}

export default function PostManagement() {
  const queryParams: QueryConfig = useQueryParam()

  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || 1,
      limit: queryParams.limit,
      search: queryParams.search,
      year: queryParams.year,
      status: queryParams.status,
      priority: queryParams.priority
    },
    isUndefined
  )

  const { data } = useQuery({
    queryKey: ['posts', queryConfig],
    queryFn: () => postApi.getPostsByAdmin(queryConfig as PostListTypeConfig)
  })
  console.log('post -', data)

  return (
    <div className='p-6 space-y-6 flex-1 overflow-y-auto'>
      <PostStats />
      <PostFilters queryConfig={queryConfig} />
      <PostTable data={data} queryConfig={queryConfig} />
    </div>
  )
}
