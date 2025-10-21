import postApi from '~/apis/post.api'
import { Badge } from '~/components/ui/badge'
import type { QueryConfig } from '~/pages/PostManagement/PostManagement'
// import Button from '../Button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import { Button } from '~/components/ui/button'
import type { PostStatus } from '~/types/post.type'
import RejectReasonModal from './RejectReasonModal/RejectReasomModal'

type GetPostsResponse = Awaited<ReturnType<typeof postApi.getPostsByAdmin>>

type Props = {
  data?: GetPostsResponse
  queryConfig: QueryConfig
}
export default function PostTable(props: Props) {
  const { data, queryConfig } = props
  const isPendingTab = queryConfig.status === 'pending'

  const queryClient = useQueryClient()
  const [rejectingPost, setRejectingPost] = useState<{ id: string | number; title?: string } | null>(null)
  const updateMutation = useMutation({
    mutationFn: ({ id, status, reason }: { id: string | number; status: PostStatus; reason?: string }) =>
      postApi.updatePostByAdmin(id, status, reason),
    onSuccess: (_, variables) => {
      if (variables.status === 'approved') {
        toast.success('Bài viết đã được duyệt!')
      } else if (variables.status === 'rejected') {
        toast.success('Đã từ chối bài viết!')
      }
      queryClient.invalidateQueries({ queryKey: ['posts', queryConfig] })
      setRejectingPost(null)
    },
    onError: (err: unknown) => {
      console.error(err)
      toast.error('Cập nhật trạng thái thất bại!')
    }
  })

  const handleApprove = (id: string | number) => {
    updateMutation.mutate({ id, status: 'approved' })
  }

  const handleOpenReject = (id: string | number, title?: string) => {
    setRejectingPost({ id, title })
  }

  const handleSubmitReject = (reason: string) => {
    if (!rejectingPost) return
    updateMutation.mutate({ id: rejectingPost.id, status: 'rejected', reason })
  }

  return (
    <div className='bg-white rounded-xl shadow overflow-hidden'>
      {data && (
        <div>
          <table className='w-full text-left border-collapse'>
            <thead className='bg-gray-50 text-gray-600 text-sm'>
              <tr>
                <th className='py-3 px-4'>Bài đăng</th>
                <th>Tiêu đề</th>
                <th>Hãng xe</th>
                <th>Tên sản phẩm</th>
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
                  <td className='py-3 px-4'>{p.id}</td>
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
                          onClick={() => handleApprove(p.id)}
                          disabled={updateMutation.isPending}
                        >
                          Accept
                        </Button>
                        <Button
                          variant='outline'
                          className='text-red-600 border-red-600 hover:bg-red-50 h-8 '
                          onClick={() => handleOpenReject(p.id, p.title)}
                          disabled={updateMutation.isPending}
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

      <RejectReasonModal
        open={!!rejectingPost}
        onClose={() => setRejectingPost(null)}
        onSubmit={handleSubmitReject}
        submitting={updateMutation.isPending}
      />
    </div>
  )
}
