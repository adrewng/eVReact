'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import auctionApi from '~/apis/auction.api'
import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import { isAxiosPaymentRequiredError } from '~/utils/util'

interface DepositModalProps {
  open: boolean
  onClose: () => void
  deposit?: string
  auction_id?: number
}

export default function DepositModal({ open, onClose, deposit, auction_id }: DepositModalProps) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const payDeposit = useMutation({
    mutationFn: (auction_id: number) => auctionApi.payDeposit(auction_id)
  })

  const handleConfirm = () => {
    payDeposit.mutate(auction_id as number, {
      onSuccess: () => {
        navigate(path.postDetail)
      },
      onError: (error) => {
        if (isAxiosPaymentRequiredError<{ checkoutUrl: string }>(error)) {
          const url = error.response?.data?.checkoutUrl
          if (url) {
            window.location.assign(url)
          } else {
            alert('Không thể chuyển đến trang thanh toán.')
          }
        } else {
          alert('Đã có lỗi xảy ra. Vui lòng thử lại.')
        }
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-bold text-xl'>Yêu cầu đặt cọc</DialogTitle>
          <DialogDescription className='space-y-1 text-sm text-zinc-600 leading-relaxed'>
            <p>
              Để đảm bảo <span className='font-semibold text-zinc-900'>tính minh bạch và nghiêm túc</span> trong mỗi
              phiên đấu giá, bạn cần đặt cọc{' '}
              <span className='font-semibold text-red-600'>{Number(deposit).toLocaleString('vi-VN')}₫</span> trước khi
              tham gia.
            </p>
            <p className='text-zinc-500 text-xs italic'>
              Việc đặt cọc giúp đảm bảo người tham gia thực sự quan tâm đến phiên đấu giá và bảo vệ quyền lợi của tất cả
              các bên.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex justify-end gap-2 mt-4'>
          <Button variant='outline' onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : 'Tiếp tục nạp tiền'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
