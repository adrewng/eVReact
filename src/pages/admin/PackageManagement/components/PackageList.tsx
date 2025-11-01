'use client'

import { Package } from 'lucide-react'
import { Card } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Edit2, Trash2 } from 'lucide-react'

interface PackageItem {
  id: number
  name: string
  type: string
  cost: number
  number_of_post: number
  number_of_push: number
  service_ref: string
  product_type: string
  description: string
  feature: string
}

interface PackageListProps {
  packages: PackageItem[]
  loading: boolean
  onEdit: (pkg: PackageItem) => void
  onDelete: (id: number) => void
}

export function PackageList({ packages, loading, onEdit, onDelete }: PackageListProps) {
  if (loading) {
    return (
      <Card className='p-8 text-center'>
        <p className='text-muted-foreground'>Đang tải dữ liệu...</p>
      </Card>
    )
  }

  if (packages.length === 0) {
    return (
      <Card className='p-8 text-center'>
        <Package className='w-12 h-12 mx-auto text-muted-foreground mb-4' />
        <p className='text-muted-foreground'>Chưa có gói tin nào. Hãy thêm gói mới!</p>
      </Card>
    )
  }

  return (
    <div className='grid gap-4'>
      {packages.map((pkg) => (
        <Card key={pkg.id} className='p-6 hover:shadow-lg transition-shadow'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Tên Gói</p>
              <p className='text-lg font-semibold text-foreground'>{pkg.name}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Loại Sản Phẩm</p>
              <p className='text-lg font-semibold text-foreground'>{pkg.product_type}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Giá</p>
              <p className='text-lg font-semibold text-foreground'>{pkg.cost.toLocaleString('vi-VN')} đ</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Loại</p>
              <p className='text-lg font-semibold text-foreground'>{pkg.type}</p>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 py-4 border-t border-border'>
            <div>
              <p className='text-sm text-muted-foreground'>Số Bài Đăng</p>
              <p className='font-semibold text-foreground'>{pkg.number_of_post}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Số Lần Đẩy Tin</p>
              <p className='font-semibold text-foreground'>{pkg.number_of_push}</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>Dịch Vụ Liên Quan</p>
              <p className='font-semibold text-foreground'>{pkg.service_ref}</p>
            </div>
          </div>

          <div className='mb-4 py-4 border-t border-border'>
            <p className='text-sm text-muted-foreground mb-2'>Mô Tả</p>
            <p className='text-foreground'>{pkg.description}</p>
          </div>

          <div className='mb-4 py-4 border-t border-border'>
            <p className='text-sm text-muted-foreground mb-2'>Tính Năng</p>
            <p className='text-foreground'>{pkg.feature}</p>
          </div>

          <div className='flex gap-2 justify-end pt-4 border-t border-border'>
            <Button variant='outline' size='sm' onClick={() => onEdit(pkg)} className='gap-2'>
              <Edit2 className='w-4 h-4' />
              Chỉnh Sửa
            </Button>
            <Button variant='destructive' size='sm' onClick={() => onDelete(pkg.id)} className='gap-2'>
              <Trash2 className='w-4 h-4' />
              Xóa
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
