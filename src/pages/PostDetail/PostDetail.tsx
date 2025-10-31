import {
  Armchair,
  Battery,
  BatteryFull,
  Calendar,
  Car,
  Factory,
  Gauge,
  Heart,
  HeartPulse,
  History,
  MapPin,
  Palette,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap
} from 'lucide-react'

import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import postApi from '~/apis/post.api'
import {
  BATTERY_HEALTH_OPTIONS,
  CAPACITY_OPTIONS,
  COLOR_OPTIONS,
  MILEAGE_OPTIONS,
  POWER_OPTIONS,
  SEATS_OPTIONS,
  VOLTAGE_OPTIONS,
  WARRANTY_OPTIONS
} from '~/constants/options'
import { nonEmpty, toNumber } from '~/utils/formater'
import { labelFromOptions } from '~/utils/option'
import { formatCurrencyVND, formatOwners, generateNameId, getIdFromNameId, isVehicle } from '~/utils/util'
import AuctionBox from './components/AuctionBox/AuctionBox'
import Gallery from './components/Gallery'
import MarketPriceRange from './components/MarketPriceRange'
import SpecRow from './components/SpecRow'

export default function PostDetail() {
  const { nameid } = useParams()
  const id = getIdFromNameId(nameid as string)
  const { data: postDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => postApi.getProductDetail(id as string)
  })
  const post = postDetailData?.data.data
  const product = post?.product

  const base = product
    ? isVehicle(product)
      ? [
          { icon: <Factory className='h-4 w-4' />, label: 'Thương hiệu', value: product.brand },
          { icon: <Car className='h-4 w-4' />, label: 'Tên', value: product.model }, // hoặc <Cube />
          {
            icon: <Zap className='h-4 w-4' />,
            label: 'Động cơ',
            value: labelFromOptions(POWER_OPTIONS, product.power)
          },
          {
            icon: <Gauge className='h-4 w-4' />,
            label: 'Số km đã đi',
            value: labelFromOptions(MILEAGE_OPTIONS, product.mileage)
          },
          { icon: <Calendar className='h-4 w-4' />, label: 'Năm sản xuất', value: product.year },
          {
            icon: <Armchair className='h-4 w-4' />,
            label: 'Số chỗ ngồi',
            value: labelFromOptions(SEATS_OPTIONS, product.seats)
          },
          {
            icon: <Palette className='h-4 w-4' />,
            label: 'Màu sắc',
            value: labelFromOptions(COLOR_OPTIONS, product.color)
          },
          {
            icon: <HeartPulse className='h-4 w-4' />,
            label: 'Sức khoẻ pin',
            value: labelFromOptions(BATTERY_HEALTH_OPTIONS, product.health)
          },
          {
            icon: <Shield className='h-4 w-4' />,
            label: 'Tình trạng bảo hành',
            value: labelFromOptions(WARRANTY_OPTIONS, product.warranty)
          },
          { icon: <History className='h-4 w-4' />, label: 'Số đời chủ', value: formatOwners(product.previousOwners) }
        ]
      : [
          { icon: <Factory className='h-4 w-4' />, label: 'Thương hiệu', value: product.brand },
          { icon: <Battery className='h-4 w-4' />, label: 'Model', value: product.model }, // hoặc <Cube />
          {
            icon: <Zap className='h-4 w-4' />,
            label: 'Điện áp',
            value: labelFromOptions(VOLTAGE_OPTIONS, product.voltage)
          },
          {
            icon: <BatteryFull className='h-4 w-4' />,
            label: 'Điện dung',
            value: labelFromOptions(CAPACITY_OPTIONS, product.capacity)
          },
          {
            icon: <HeartPulse className='h-4 w-4' />,
            label: 'Sức khoẻ pin',
            value: labelFromOptions(BATTERY_HEALTH_OPTIONS, product.health)
          },
          { icon: <Calendar className='h-4 w-4' />, label: 'Năm sản xuất', value: product.year },
          { icon: <History className='h-4 w-4' />, label: 'Số đời chủ', value: formatOwners(product.previousOwners) },
          {
            icon: <Shield className='h-4 w-4' />,
            label: 'Tình trạng bảo hành',
            value: labelFromOptions(WARRANTY_OPTIONS, product.warranty)
          },
          {
            icon: <Palette className='h-4 w-4' />,
            label: 'Màu sắc',
            value: labelFromOptions(COLOR_OPTIONS, product.color)
          }
        ]
    : []

  const specs = base.filter((s) => nonEmpty(s.value) || s.value === 0)

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 to-white text-zinc-900'>
      {product && post && (
        <div className='mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'>
          {/* Top meta */}
          <div className='mb-5 rounded-2xl border border-zinc-100 bg-white/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div className='min-w-0'>
                <div className='mb-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500'>
                  <span className='rounded-full bg-zinc-100 px-2 py-0.5'>{product.category.name}</span>
                  {/* {isFeatured && (
                  <span className='inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-amber-700'>
                    <Sparkles className='h-3.5 w-3.5' /> Nổi bật
                  </span>
                )} */}
                  <span>•</span>
                  <span className='inline-flex items-center gap-1'>
                    <Calendar className='h-4 w-4' />
                    {new Date(post.created_at).toLocaleDateString('vi-VN')}
                  </span>
                  <span>•</span>
                  {product.warranty && (
                    <span className='inline-flex items-center gap-1'>
                      <ShieldCheck className='h-4 w-4' />
                      {product.warranty}
                    </span>
                  )}
                  <span>•</span>
                  {product.address && (
                    <span className='inline-flex items-center gap-1'>
                      <MapPin className='h-4 w-4' />
                      {product.address}
                    </span>
                  )}
                </div>
                <h1 className='line-clamp-2 text-2xl font-bold sm:text-3xl'>{post.title}</h1>
              </div>
              <div className='flex shrink-0 items-center gap-2'>
                <button className='rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100'>
                  <Heart className='mr-2 inline h-4 w-4' />
                  Lưu
                </button>
              </div>
            </div>
          </div>

          <div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_25rem]'>
            {/* Left column */}
            <div className='min-w-0 space-y-6'>
              <Gallery images={product.images} />

              {/* Specs */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-4 flex items-center gap-2'>
                  <Gauge className='h-5 w-5' />
                  <h2 className='text-lg font-semibold'>Thông số</h2>
                </div>
                <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                  {specs.map((s, i) => (
                    <SpecRow key={i} icon={s.icon} label={s.label} value={s.value} />
                  ))}
                </div>
              </section>

              {/* Description */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-2 flex items-center gap-2'>
                  <Sparkles className='h-5 w-5' />
                  <h2 className='text-lg font-semibold'>Mô tả chi tiết</h2>
                </div>
                <p className='whitespace-pre-line leading-relaxed text-zinc-700'>{product.description}</p>
              </section>

              {/* Placeholder for Related */}
              <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <h2 className='text-lg font-semibold'>Tin đăng tương tự</h2>
                <p className='mt-1 text-sm text-zinc-500'>
                  Bạn có thể hiển thị danh sách các tin liên quan theo cùng danh mục, mức giá, hoặc vị trí.
                </p>
              </section>
            </div>

            {/* Right column */}
            <aside className='space-y-4 lg:sticky lg:top-24'>
              <AuctionBox product_id={id} />
              {/* Price & actions */}
              <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <div className='mb-1 text-xs uppercase tracking-wide text-zinc-500'>Giá bán</div>
                <div className='mb-3 text-3xl font-extrabold'>{formatCurrencyVND(product.price)}</div>
                <div className='mb-3 text-sm  flex items-center gap-2 justify-start'>
                  <MapPin className='h-4 w-4' />
                  {product.address}
                </div>

                <div className='my-3 text-sm text-zinc-500'>
                  Cập nhật: {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                </div>
                <div className='mb-4'>
                  <MarketPriceRange
                    min={toNumber(post.ai?.min_price)}
                    max={toNumber(post.ai?.max_price)}
                    listing={toNumber(product.price)}
                    windowText='Theo dữ liệu trong 3 tháng gần nhất'
                  />
                </div>
                {/* <div className='flex gap-2'>
                  <Button className='flex-1 flex justify-center items-center rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md'>
                    <MessageCircle className='mr-2 inline h-5 w-5' /> Gữi yêu cầu mua
                  </Button>
                </div> */}
              </div>

              {/* Seller card */}
              {post.seller && (
                <div className='flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                  <img
                    src={'https://api.iconify.design/solar:user-bold.svg?color=%23a1a1aa'}
                    alt='avatar'
                    className='h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm'
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-semibold'>
                      {post.seller.full_name || 'Người bán'}{' '}
                      {post.seller.phone && (
                        <span className='ml-1 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700'>
                          Đã xác minh
                        </span>
                      )}
                    </p>
                    {post.seller.phone && <p className='text-sm text-zinc-500'>{post.seller.phone}</p>}
                  </div>
                  <Link
                    to={`/profile-user/${generateNameId({ name: post.seller.full_name, id: post.seller.id })}`}
                    className='rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100'
                  >
                    Xem trang
                  </Link>
                </div>
              )}

              {/* Safety / Warranty */}
              <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 text-sm leading-relaxed text-zinc-600 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <p className='mb-2 font-medium'>Lưu ý an toàn</p>
                <ul className='list-disc space-y-1 pl-5'>
                  <li>Kiểm tra xe/pin trực tiếp trước khi giao dịch.</li>
                  <li>Không chuyển tiền cọc nếu chưa xác minh người bán.</li>
                  <li>Giao dịch tại nơi công cộng, giữ liên lạc với người thân.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  )
}
