import { Badge } from '~/components/ui/badge'
import type { QueryConfig } from '~/pages/PostManagement/PostManagement'
import postApi from '~/apis/post.api'
// import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import { Button } from '~/components/ui/button'

type GetPostsResponse = Awaited<ReturnType<typeof postApi.getPostsByAdmin>>

type Props = {
  data?: GetPostsResponse
  queryConfig: QueryConfig
}
export default function PostTable(props: Props) {
  const { data, queryConfig } = props
  const isPendingTab = queryConfig.status === 'pending'
  console.log('data - ', data)

  const queryClient = useQueryClient()
  const acceptMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => postApi.updatePostByAdmin(id, status),
    onSuccess: () => {
      toast.success('Bài viết đã được duyệt!')
      // Gọi lại danh sách bài viết sau khi cập nhật
      queryClient.invalidateQueries({ queryKey: ['posts', queryConfig] })
    },
    onError: () => {
      toast.error('Lỗi khi duyệt bài!')
    }
  })

  const handleAction = ({ id, status }: { id: string; status: string }) => {
    acceptMutation.mutate({ id, status })
  }

  return (
    <div className='bg-white rounded-xl shadow overflow-hidden'>
      <div>
        {data && (
          <div>
            <table className='w-full text-left border-collapse'>
              <thead className='bg-gray-50 text-gray-600 text-sm'>
                <tr>
                  <th className='py-3 px-4'>Bài đăng</th>
                  <th>Tên sản phẩm</th>
                  <th>Hãng xe</th>
                  <th>Model</th>
                  <th>Giá</th>
                  <th>Ngày tạo</th>
                  <th>Trạng thái</th>
                  <th>Ưu tiên</th>
                  {isPendingTab && <th>Hành động</th>}
                </tr>
              </thead>
              <tbody className='text-sm'>
                {data.data.data.posts.map((p, i) => (
                  <tr key={i} className='border-t hover:bg-gray-50'>
                    <td className='py-3 px-4'>{p.title}</td>
                    <td>{p.title}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.product.model}</td>
                    <td>{p.product.price}</td>
                    <td>{new Date(p.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      {p.status === 'pending' ? (
                        <Badge className='bg-yellow-100 text-yellow-700'>{p.status}</Badge>
                      ) : p.status === 'approved' ? (
                        <Badge className='bg-green-100 text-green-700'>{p.status}</Badge>
                      ) : (
                        <Badge className='bg-red-100 text-red-700'>{p.status}</Badge>
                      )}
                    </td>
                    <td>
                      {p.priority ? (
                        <Badge className='bg-purple-100 text-purple-700'>Ưu tiên {p.priority}</Badge>
                      ) : (
                        <Badge className='bg-gray-100 text-gray-600'>Thường</Badge>
                      )}
                    </td>
                    {isPendingTab && (
                      <td className='text-center'>
                        <div className='flex gap-2'>
                          <Button
                            variant='outline'
                            className='text-green-600 border-green-600 hover:bg-green-50 h-8'
                            onClick={() => handleAction({ id: p.id, status: 'approved' })}
                          >
                            Accept
                          </Button>
                          <Button
                            variant='outline'
                            className='text-red-600 border-red-600 hover:bg-red-50 h-8 '
                            onClick={() => handleAction({ id: p.id, status: 'rejected' })}
                          >
                            Reject
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <PaginationAdmin pageSize={data.data.data.pagination.page_size} queryConfig={queryConfig} />
          </div>
        )}
      </div>
    </div>
  )
}
