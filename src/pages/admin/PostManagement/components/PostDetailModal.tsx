import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '~/components/ui/dialog'
import type { BatteryType, PostType, VehicleType } from '~/types/post.type'
import { formatUTCDateString } from '~/utils/util'

export default function PostDetailModal({
  open,
  onClose,
  post
}: {
  open: boolean
  onClose: () => void
  post: PostType | null
}) {
  if (!post) return null
  const isVehicle = (post.product as VehicleType).seats !== undefined

  // Thu hẹp kiểu
  const product = post.product
  const vehicleProduct = product as VehicleType
  const batteryProduct = product as BatteryType

  const placeholder = '—'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-6xl h-[85vh] w-full overflow-y-auto p-6 rounded-xl shadow-xl bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>Chi tiết bài đăng</DialogTitle>
        </DialogHeader>

        {/* Image */}
        {post.product.images?.length > 0 && (
          <div className='w-full my-3'>
            <img
              src={post.product.images[0]}
              alt={post.title}
              className='w-full h-56 object-cover rounded-xl shadow-md'
            />
          </div>
        )}

        {/* Main Info */}
        <div className='space-y-4 mt-4'>
          {/* Title */}
          <div>
            <h2 className='text-xl font-bold'>{post.title}</h2>
            <p className='text-gray-500'>{post.product.description}</p>
          </div>

          {/* Grid info section */}
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <Info label='ID' value={post.id} />

            <Info label='Hãng' value={post.product.brand} />
            <Info label='Mẫu' value={post.product.model} />
            <Info label='Đời chủ cũ' value={post.product.previousOwners} />
            <Info label='Năm sản xuất' value={post.product.year} />
            <Info label='Tình trạng' value={post.product.health} />
            <Info label='Địa chỉ' value={post.product.address} />
            {isVehicle ? (
              // HIỂN THỊ THÔNG TIN XE
              <>
                <Info label='Chỗ ngồi' value={vehicleProduct.seats ? vehicleProduct.seats + ' chỗ' : placeholder} />
                <Info
                  label='Quãng đường đã đi'
                  value={vehicleProduct.mileage ? vehicleProduct.mileage + 'km' : placeholder}
                />
                <Info label='Công suất' value={vehicleProduct.power ? vehicleProduct.power + 'kW' : placeholder} />
              </>
            ) : (
              // HIỂN THỊ THÔNG TIN PIN
              <>
                <Info label='Sức chứa' value={batteryProduct.capacity ? batteryProduct.capacity + 'Ah' : placeholder} />
                <Info label='Điện áp' value={batteryProduct.voltage ? batteryProduct.voltage : placeholder} />
              </>
            )}

            <Info
              label='Giá'
              value={Number(post.product.price).toLocaleString('vi-VN') + '₫'}
              valueClass='font-semibold text-emerald-600'
            />

            <Info label='Danh mục' value={post.product.category?.name} />
          </div>

          {/* Dates */}
          <div className='text-xs text-gray-500 mt-4'>
            <p>Ngày tạo: {formatUTCDateString(post.created_at)}</p>
            <p>Ngày cập nhật: {formatUTCDateString(post.updated_at)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end pt-4'>
          <Button onClick={onClose} className='px-5 rounded-lg'>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/* --------------------------------- Components -------------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Info({ label, value, valueClass = '' }: { label: string; value: any; valueClass?: string }) {
  return (
    <div className='flex flex-col'>
      <span className='text-gray-500'>{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  )
}

// function formatDate(date: string) {
//   return new Date(date).toLocaleString('vi-VN')
// }
