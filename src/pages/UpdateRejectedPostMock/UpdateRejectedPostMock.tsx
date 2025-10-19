/* eslint-disable @typescript-eslint/no-explicit-any */
/* src/pages/UpdateRejectedPostPretty.tsx */
import classNames from 'classnames'
import { AlertTriangle, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import Button from '~/components/Button'
import Input from '~/components/Input'

import BatteryForm from '~/pages/Post/components/BatteryForm'
import VehicleForm from '~/pages/Post/components/VehicleForm'
import type { CategoryType } from '~/types/category.type'
import type { PostType } from '~/types/post.type'
import AddressModal from '../Post/components/AddressModal'

// const vehicleMock: PostType = {
//   id: 204,
//   title: 'VF3 2024 vàng, 12.4k km, pin 92%',
//   priority: 1,
//   created_at: '2025-10-19T04:51:12.000Z',
//   updated_at: '2025-10-19T07:49:11.000Z',
//   end_date: '2025-11-18T04:51:12.000Z',
//   product: {
//     id: 1,
//     brand: 'VinFast',
//     model: 'VF 3',
//     power: '200',
//     price: '320000000',
//     address: 'Phường Ba Đình, Thành phố Hà Nội',
//     description: 'Xe cá nhân, giữ gìn kỹ. Bảo dưỡng định kỳ, không ngập nước.',
//     category: { id: 1, name: 'Electric Car', typeSlug: 'vehicle' },
//     mileage: '20000',
//     year: 2024,
//     seats: 4,
//     image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
//     images: [
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/dpew2fxaixro1jufvzwo.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gifnbdoybefcjaea1rai.jpg',
//       'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849471/demo-node-ts/icncczogebbutplexp2r.jpg'
//     ],
//     warranty: '6',
//     color: 'yellow',
//     health: 'good',
//     previousOwners: 1,
//     rejected_reason: 'Mô tả thiếu thông tin bảo dưỡng và số km chưa khớp.'
//   },
//   ai: { min_price: 300_000_000, max_price: 330_000_000 }
// }
const batteryMock: PostType = {
  id: 301,
  title: 'PIN LFP 48V 50Ah – còn rất mới',
  priority: 1,
  created_at: '2025-10-10T02:20:12.000Z',
  updated_at: '2025-10-19T05:00:00.000Z',
  end_date: '2025-11-09T02:20:12.000Z',
  product: {
    id: 2,
    brand: 'CATL',
    model: 'LFP-48-50',
    capacity: '50',
    price: '8500000',
    address: 'Quận 7, TP.HCM',
    description: 'Pin tháo xe điện, tình trạng tốt, kèm BMS.',
    category: { id: 2, name: 'Car Battery', typeSlug: 'battery' },
    voltage: '48v',
    health: 'good',
    year: 2023,
    image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
    images: [
      'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gwbuszse1boyfine03yz.jpg',
      'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/dpew2fxaixro1jufvzwo.jpg',
      'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849470/demo-node-ts/gifnbdoybefcjaea1rai.jpg',
      'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760849471/demo-node-ts/icncczogebbutplexp2r.jpg'
    ],
    warranty: '6',
    color: 'black',
    previousOwners: 1,
    rejected_reason: 'Thiếu chứng từ nguồn gốc; vui lòng bổ sung trong mô tả.'
  },
  ai: { min_price: 7_500_000, max_price: 9_000_000 }
}

/** ===== FormValues để reuse VehicleForm/BatteryForm ===== */
type FormValues = {
  type?: CategoryType
  category_id?: number
  brand?: string
  model?: string
  title: string
  description: string
  price: number
  address: string
  images: File[] | string[]
  image?: File | string
  // vehicle
  power?: string
  mileage?: string
  year?: number
  seats?: number
  color?: string
  warranty?: string
  health?: string
  previousOwners?: number
  // battery
  capacity?: string
  voltage?: string
}

export default function UpdateRejectedPostPretty() {
  const [showAddressModal, setShowAddressModal] = useState(false)
  const post = batteryMock
  const category = post.product.category.typeSlug

  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      address: '',
      images: []
    },
    shouldUnregister: true
  })

  const {
    setValue,
    watch,
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors, isSubmitting }
  } = methods
  useEffect(() => {
    const p: any = post.product
    setValue('type', p.category.typeSlug)
    setValue('category_id', p.category.id)
    setValue('brand', p.brand)
    setValue('model', p.model)
    setValue('title', post.title)
    setValue('description', p.description)
    setValue('price', Number(String(p.price).replace(/_/g, '')))
    setValue('address', p.address)
    setValue('images', p.images ?? (p.image ? [p.image] : []))
    setValue('image', p.image ?? p.images?.[0])

    if (category === 'vehicle') {
      setValue('power', p.power)
      setValue('mileage', p.mileage)
      setValue('year', p.year)
      setValue('seats', p.seats)
      setValue('color', p.color)
      setValue('warranty', p.warranty)
      setValue('health', p.health)
      setValue('previousOwners', p.previousOwners)
    } else {
      setValue('capacity', p.capacity)
      setValue('voltage', p.voltage)
      setValue('year', p.year)
      setValue('color', p.color)
      setValue('warranty', p.warranty)
      setValue('health', p.health)
      setValue('previousOwners', p.previousOwners)
    }
  }, [post, category, setValue])

  // AI price
  const aiMin = post.ai?.min_price ?? 0
  const aiMax = post.ai?.max_price ?? 0
  const price = watch('price')
  const outOfAiRange = aiMin && aiMax && typeof price === 'number' && (price < aiMin || price > aiMax)

  // Handle address
  const handleAddressConfirm = (address: string) => {
    setValue('address', address, { shouldValidate: true, shouldDirty: true })
  }
  // Mock submit
  const onSave = handleSubmit((vals) => {
    if ((vals.images as any[])?.length < 1) {
      toast.error('Vui lòng thêm ít nhất 1 hình ảnh')
      return
    }
    toast.success('Đã lưu bản nháp (mock)')
  })
  const onResubmit = handleSubmit((vals) => {
    if ((vals.images as any[])?.length < 1) {
      toast.error('Vui lòng thêm ít nhất 1 hình ảnh')
      return
    }
    toast.success('Đã gửi lại kiểm duyệt (mock)')
  })
  console.log('watch: ', watch())
  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      <div className='max-w-7xl mx-auto p-6'>
        {/* Top bar */}
        <div className='mb-5 flex flex-wrap items-center justify-between gap-3'>
          <div>
            <div className='text-sm text-zinc-500'>Bài đăng #{post.id}</div>
            <h1 className='text-xl font-semibold'>Cập nhật bài đăng (bị từ chối)</h1>
          </div>
          {/* <div className='flex items-center gap-2'>
            <button className={tabCls(which === 'vehicle')} onClick={() => setWhich('vehicle')}>
              Vehicle
            </button>
            <button className={tabCls(which === 'battery')} onClick={() => setWhich('battery')}>
              Battery
            </button>
          </div> */}
        </div>

        {/* Reject banner */}
        {'rejected_reason' in post.product && post.product.rejected_reason && (
          <div className='mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4'>
            <div className='flex items-start gap-3'>
              <XCircle className='mt-0.5 h-5 w-5 text-rose-600' />
              <div>
                <div className='font-medium text-rose-700'>Tin của bạn bị từ chối</div>
                <div className='text-sm text-rose-700/90'>{post.product.rejected_reason}</div>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className='mb-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1'>
            <div className='rounded-2xl border border-zinc-200 p-3 bg-zinc-50'>
              <img
                src={(post.product as any).image || (post.product as any).images?.[0]}
                alt=''
                className='h-40 w-full rounded-xl object-cover'
              />
              <div className='mt-2 text-sm text-zinc-500'>{post.product.category.name}</div>
            </div>
          </div>
          <div className='lg:col-span-2 rounded-2xl border border-zinc-200 p-4'>
            <div className='mb-1 text-lg font-semibold'>{post.title}</div>
            <div className='text-sm text-zinc-600'>{(post.product as any).address}</div>

            <div className='mt-3 flex flex-wrap items-center gap-2'>
              <span className='rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700'>
                AI price: {aiMin && aiMax ? `${aiMin.toLocaleString()} – ${aiMax.toLocaleString()} đ` : '—'}
              </span>
              {outOfAiRange && (
                <span className='inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700'>
                  <AlertTriangle className='h-3.5 w-3.5' /> Giá của bạn nằm ngoài khoảng gợi ý
                </span>
              )}
            </div>

            {outOfAiRange && (
              <div className='mt-2'>
                <Button
                  type='button'
                  onClick={() => {
                    const mid = Math.round((aiMin + aiMax) / 2)
                    setValue('price', mid, { shouldDirty: true, shouldValidate: true })
                  }}
                  className='!px-3 !py-1 text-sm'
                >
                  Đặt giá = trung bình AI
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Body (giống PostPage) */}
        <FormProvider {...methods}>
          <form className='space-y-8' onSubmit={(e) => e.preventDefault()}>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Left – Images preview */}
              <div className='space-y-6 lg:col-span-1'>
                <div>
                  <h3 className='text-lg font-semibold mb-4'>Hình ảnh sản phẩm</h3>
                  <Controller
                    control={control}
                    name='images'
                    render={({ field }) => (
                      <>
                        <div className='grid grid-cols-3 gap-2'>
                          {Array.isArray(field.value) &&
                            field.value.map((src, idx) => (
                              <div key={`${src}-${idx}`} className='relative group'>
                                <div className='aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50'>
                                  <img
                                    src={typeof src === 'string' ? src : ''}
                                    className='w-full h-full object-cover'
                                  />
                                </div>
                                <div className='absolute top-1 left-1'>
                                  <span
                                    className={classNames(
                                      'px-1.5 py-0.5 rounded-full text-[11px] font-medium',
                                      idx === 0 ? 'bg-black/80 text-white' : 'bg-black/60 text-white'
                                    )}
                                  >
                                    {idx === 0 ? 'Ảnh bìa' : idx + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                        <p className='mt-2 text-xs text-zinc-500'>* Ở trang thật hãy reuse khối upload của PostPage.</p>
                      </>
                    )}
                  />
                </div>
              </div>

              {/* Right – Fields */}
              <div className='space-y-6 lg:col-span-2'>
                <div className='bg-zinc-50 p-4 rounded-2xl border border-zinc-200'>
                  <label className='block text-sm font-medium text-zinc-700 mb-2'>Loại sản phẩm - Cập nhật</label>
                  <div className='flex items-center gap-2'>
                    <span className='text-2xl'>{category === 'battery' ? '🔋' : '🚗'}</span>
                    <span className='font-medium'>{post.product.category.name}</span>
                  </div>
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-4'>Thông tin chi tiết</h3>
                  {category === 'vehicle' ? <VehicleForm /> : <BatteryForm />}

                  <div className='space-y-4 mt-4'>
                    <Input
                      label='Địa chỉ *'
                      name='address'
                      readOnly
                      placeholder='Chọn địa chỉ'
                      errorMsg={errors.address?.message as string}
                      inputClassName='cursor-pointer pr-10'
                      onClick={() => setShowAddressModal(true)}
                      register={register}
                    />
                  </div>
                </div>
                {/* AI gợi ý (màu theo range) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Giá bán *</label>
                    <Controller
                      control={control}
                      name='price'
                      render={({ field }) => (
                        <input
                          {...field}
                          type='number'
                          className='w-full rounded-2xl border border-zinc-300 px-3 py-2 outline-none focus:ring-2 focus:ring-black'
                          placeholder='Nhập giá bán'
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Gợi ý AI</label>
                    <div
                      className={classNames(
                        'h-[42px] rounded-2xl px-3 flex items-center border',
                        outOfAiRange
                          ? 'border-amber-300 bg-amber-50 text-amber-800'
                          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      )}
                    >
                      {aiMin && aiMax ? `${aiMin.toLocaleString()} – ${aiMax.toLocaleString()} đ` : '—'}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-4'>Tiêu đề tin đăng và Mô tả chi tiết</h3>
                  <div className='space-y-4'>
                    <Input
                      label='Tiêu đề tin đăng *'
                      name='title'
                      placeholder='Nhập tiêu đề tin đăng'
                      errorMsg={errors.title?.message as string}
                      register={register}
                    />
                    <div>
                      <label className='block text-sm font-medium text-zinc-700 mb-2'>Mô tả chi tiết *</label>
                      <Controller
                        control={control}
                        name='description'
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={6}
                            className='w-full px-3 py-2 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black'
                            placeholder='Nhập mô tả chi tiết về sản phẩm...'
                          />
                        )}
                      />
                      {errors.description && (
                        <p className='text-xs text-red-600 mt-1'>{String(errors.description.message)}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className='flex flex-wrap items-center gap-3 pt-2'>
                  <Button onClick={onSave} disabled={isSubmitting} className='px-6'>
                    Lưu nháp
                  </Button>
                  <Button
                    onClick={onResubmit}
                    disabled={isSubmitting}
                    className='px-6 bg-black text-white hover:bg-zinc-800'
                  >
                    Gửi lại duyệt
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      {showAddressModal && (
        <AddressModal
          onClose={() => setShowAddressModal(false)}
          onConfirm={handleAddressConfirm}
          defaultAddress={getValues('address')}
        />
      )}
    </div>
  )
}

/** ===== utils ===== */
// function tabCls(active: boolean) {
//   return classNames(
//     'px-3 py-1.5 rounded-full text-sm border',
//     active ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-zinc-700 border-zinc-200'
//   )
// }
