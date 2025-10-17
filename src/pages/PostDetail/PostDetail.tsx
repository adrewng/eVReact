/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from 'framer-motion'
import {
  Battery,
  Calendar,
  Car,
  Gauge,
  Heart,
  Layers,
  MapPin,
  MessageCircle,
  Palette,
  Share2,
  ShieldCheck,
  Sparkles,
  X,
  Zap
} from 'lucide-react'
import { useMemo, useState, type JSX } from 'react'

/****************************
 * Domain types (from your app)
 ****************************/
export interface User {
  id: number
  name?: string
  phone?: string
  avatar?: string
}

export interface CategoryChild {
  id: number
  name: string
  icon?: string
  slug?: string
}

export interface VehicleType {
  id: number
  brand: string
  model: string
  power: string
  price: string
  address: string
  description: string
  category: CategoryChild
  mileage: string
  year: number
  seats: number
  image: string
  images: string[]
  warranty: string
  color: string
  previousOwners?: number | string // 👈 số đời chủ (mới thêm)
}

export interface BatteryType {
  id: number
  brand: string
  model: string
  capacity: string
  price: string
  address: string
  description: string
  category: CategoryChild
  voltage: string
  health: string
  year: number
  image: string
  images: string[]
  warranty: string
  previousOwners?: number | string // (tuỳ dùng)
}

export interface PostDetailType {
  id: number
  title: string
  priority: number
  created_at: string
  updated_at: string
  product: VehicleType | BatteryType
  end_date?: string
  seller?: User
  reviewer?: User
  reviewed_by?: string
}

/****************************
 * Utils
 ****************************/
const isVehicle = (p: VehicleType | BatteryType): p is VehicleType => (p as VehicleType).seats !== undefined

const formatCurrencyVND = (val: string | number | undefined | null) => {
  if (val === undefined || val === null) return ''
  if (typeof val === 'string' && /\d+[.,]\d{3}/.test(val)) return `${val} ₫`
  const n = typeof val === 'string' ? Number(val.replace(/[^0-9.-]/g, '')) : val
  if (Number.isNaN(n)) return String(val)
  return new Intl.NumberFormat('vi-VN').format(n) + ' ₫'
}

const formatOwners = (val?: number | string) => {
  if (val === undefined || val === null || val === '') return undefined
  const n = typeof val === 'string' ? Number(val) : val
  if (Number.isFinite(n)) return n === 1 ? '1 đời' : `${n} đời`
  return String(val) // ví dụ: "Không rõ"
}

/****************************
 * Spec row helper
 ****************************/
function SpecRow({ icon, label, value }: { icon: JSX.Element; label: string; value?: string | number }) {
  if (!value && value !== 0) return null
  return (
    <div className='group relative flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/80 px-3 py-2 shadow-sm transition hover:shadow-md'>
      <div className='rounded-lg bg-zinc-50 p-2 text-zinc-700 group-hover:bg-zinc-100'>{icon}</div>
      <div className='min-w-0'>
        <p className='text-xs text-zinc-500'>{label}</p>
        <p className='truncate font-medium text-zinc-900'>{value}</p>
      </div>
      <div className='pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-hover:ring-zinc-200' />
    </div>
  )
}

/****************************
 * Lightbox for gallery
 ****************************/
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [i, setI] = useState(index)
  const next = () => setI((v) => (v + 1) % images.length)
  const prev = () => setI((v) => (v - 1 + images.length) % images.length)
  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-[60] flex items-center justify-center bg-black/80'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          className='absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20'
          onClick={onClose}
        >
          <X className='h-6 w-6' />
        </button>
        <div className='mx-auto w-full max-w-5xl px-4'>
          <div className='relative overflow-hidden rounded-2xl'>
            <img src={images[i]} alt='preview' className='max-h-[80vh] w-full object-contain' />
            <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent' />
          </div>
          <div className='mt-3 flex items-center justify-between gap-3'>
            <button onClick={prev} className='rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20'>
              Trước
            </button>
            <div className='no-scrollbar flex gap-2 overflow-x-auto'>
              {images.map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setI(idx)}
                  className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border ${idx === i ? 'border-white' : 'border-white/30'}`}
                >
                  <img src={src} alt='thumb' className='h-full w-full object-cover' />
                </button>
              ))}
            </div>
            <button onClick={next} className='rounded-xl bg-white/10 px-3 py-2 text-white hover:bg-white/20'>
              Tiếp
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/****************************
 * Gallery with overlay actions
 ****************************/
function Gallery({ cover, images }: { cover?: string; images?: string[] }) {
  const list = useMemo(() => {
    const arr = [cover, ...(images || [])].filter(Boolean) as string[]
    return Array.from(new Set(arr))
  }, [cover, images])
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <div className='space-y-3'>
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-100 to-white'>
        <AnimatePresence mode='wait'>
          <motion.img
            key={list[active]}
            src={list[active]}
            alt='product'
            className='aspect-[16/10] w-full cursor-zoom-in object-cover'
            initial={{ opacity: 0.25, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={() => setOpen(true)}
          />
        </AnimatePresence>
        {/* hint */}
        <div className='pointer-events-none absolute inset-x-0 top-0 flex justify-between p-3'>
          <span className='rounded-full bg-black/5 px-3 py-1 text-xs text-black/70 backdrop-blur'>
            Ấn vào ảnh để phóng to
          </span>
        </div>
      </div>

      {list.length > 1 && (
        <div className='no-scrollbar -mx-1.5 flex gap-3 overflow-x-auto px-1.5'>
          {list.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-xl border transition ${
                i === active ? 'border-zinc-900 ring-2 ring-zinc-900/10' : 'border-zinc-200 hover:border-zinc-400'
              }`}
            >
              <img src={src} alt='thumb' className='h-full w-full object-cover' />
            </button>
          ))}
        </div>
      )}

      {open && <Lightbox images={list} index={active} onClose={() => setOpen(false)} />}
    </div>
  )
}

/****************************
 * Main Page (Deluxe)
 ****************************/
export function ProductDetailPage({ post }: { post: PostDetailType }) {
  const p = post.product
  const isFeatured = (post.priority ?? 0) > 0

  const specs = isVehicle(p)
    ? [
        { icon: <Car className='h-4 w-4' />, label: 'Model', value: `${p.brand} ${p.model}` },
        { icon: <Zap className='h-4 w-4' />, label: 'Power', value: p.power },
        { icon: <Gauge className='h-4 w-4' />, label: 'Mileage', value: p.mileage },
        { icon: <Calendar className='h-4 w-4' />, label: 'Year', value: p.year },
        { icon: <Layers className='h-4 w-4' />, label: 'Seats', value: p.seats },
        { icon: <Palette className='h-4 w-4' />, label: 'Color', value: p.color },
        {
          icon: <Sparkles className='h-4 w-4' />,
          label: 'Số đời chủ',
          value: formatOwners((p as VehicleType).previousOwners)
        } // 👈 thêm
      ]
    : [
        { icon: <Battery className='h-4 w-4' />, label: 'Model', value: `${p.brand} ${p.model}` },
        { icon: <Zap className='h-4 w-4' />, label: 'Voltage', value: (p as BatteryType).voltage },
        { icon: <Gauge className='h-4 w-4' />, label: 'Capacity', value: (p as BatteryType).capacity },
        { icon: <Layers className='h-4 w-4' />, label: 'Health', value: (p as BatteryType).health },
        { icon: <Calendar className='h-4 w-4' />, label: 'Year', value: p.year },
        {
          icon: <Sparkles className='h-4 w-4' />,
          label: 'Số đời chủ',
          value: formatOwners((p as BatteryType).previousOwners)
        }
      ]

  const price = formatCurrencyVND((p as any).price)

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-50 to-white text-zinc-900'>
      {/* Breadcrumb */}
      <div className='border-b border-zinc-100 bg-white/70 backdrop-blur'>
        <div className='mx-auto max-w-7xl px-4 py-3 text-sm text-zinc-500'>
          <span className='text-zinc-900'>Trang chủ</span> / <span>{p.category?.name || 'Danh mục'}</span> /{' '}
          <span className='text-zinc-900'>Chi tiết</span>
        </div>
      </div>

      <div className='mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-10'>
        {/* Top meta */}
        <div className='mb-5 rounded-2xl border border-zinc-100 bg-white/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='min-w-0'>
              <div className='mb-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500'>
                <span className='rounded-full bg-zinc-100 px-2 py-0.5'>{p.category?.name}</span>
                {isFeatured && (
                  <span className='inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-amber-700'>
                    <Sparkles className='h-3.5 w-3.5' /> Nổi bật
                  </span>
                )}
                <span>•</span>
                <span className='inline-flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  {new Date(post.created_at).toLocaleDateString('vi-VN')}
                </span>
                {(p as any).warranty && (
                  <span className='inline-flex items-center gap-1'>
                    <ShieldCheck className='h-4 w-4' />
                    {(p as any).warranty}
                  </span>
                )}
                {(p as any).address && (
                  <span className='inline-flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    {(p as any).address}
                  </span>
                )}
              </div>
              <h1 className='line-clamp-2 text-2xl font-bold sm:text-3xl'>{post.title}</h1>
            </div>
            <div className='flex shrink-0 items-center gap-2'>
              <button className='rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100'>
                <Share2 className='mr-2 inline h-4 w-4' />
                Chia sẻ
              </button>
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
            <Gallery cover={(p as any).image} images={(p as any).images} />

            {/* Specs */}
            <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
              <div className='mb-4 flex items-center gap-2'>
                <Gauge className='h-5 w-5' />
                <h2 className='text-lg font-semibold'>Thông số</h2>
              </div>
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {specs.map((s, i) => (
                  <SpecRow key={i} icon={s.icon} label={s.label} value={s.value as any} />
                ))}
                <SpecRow icon={<MapPin className='h-4 w-4' />} label='Địa chỉ' value={(p as any).address} />
              </div>
            </section>

            {/* Description */}
            <section className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
              <div className='mb-2 flex items-center gap-2'>
                <Sparkles className='h-5 w-5' />
                <h2 className='text-lg font-semibold'>Mô tả chi tiết</h2>
              </div>
              <p className='whitespace-pre-line leading-relaxed text-zinc-700'>{(p as any).description}</p>
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
            {/* Price & actions */}
            <div className='rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
              <div className='mb-1 text-xs uppercase tracking-wide text-zinc-500'>Giá bán</div>
              <div className='mb-3 text-3xl font-extrabold'>{price}</div>
              <div className='flex gap-2'>
                <button className='flex-1 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white shadow-sm transition hover:translate-y-[-1px] hover:shadow-md'>
                  <MessageCircle className='mr-2 inline h-5 w-5' /> Liên hệ người bán
                </button>
                <button className='rounded-xl border border-zinc-300 px-4 py-3 font-medium shadow-sm transition hover:bg-zinc-100'>
                  <Heart className='mr-2 inline h-5 w-5' /> Lưu
                </button>
              </div>
              <div className='mt-3 text-sm text-zinc-500'>
                Cập nhật: {new Date(post.updated_at).toLocaleDateString('vi-VN')}
              </div>
            </div>

            {/* Seller card */}
            {post.seller && (
              <div className='flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white/90 p-5 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/70'>
                <img
                  src={post.seller.avatar || 'https://api.iconify.design/solar:user-bold.svg?color=%23a1a1aa'}
                  alt='avatar'
                  className='h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-sm'
                />
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-semibold'>
                    {post.seller.name || 'Người bán'}{' '}
                    {post.seller.phone && (
                      <span className='ml-1 rounded bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700'>
                        Đã xác minh
                      </span>
                    )}
                  </p>
                  {post.seller.phone && <p className='text-sm text-zinc-500'>{post.seller.phone}</p>}
                </div>
                <button className='rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium shadow-sm transition hover:bg-zinc-100'>
                  Xem trang
                </button>
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

      {/* Sticky mobile CTA */}
      <div className='fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/80 p-3 backdrop-blur lg:hidden'>
        <div className='mx-auto flex max-w-7xl items-center gap-3'>
          <div className='font-semibold'>{price}</div>
          <button className='flex-1 rounded-xl bg-zinc-900 px-4 py-3 font-medium text-white'>Liên hệ</button>
          <button className='rounded-xl border border-zinc-300 px-3 py-3'>
            <Heart className='h-5 w-5' />
          </button>
        </div>
      </div>
    </div>
  )
}

/****************************
 * Example (remove later)
 ****************************/
export default function PostDetail() {
  const demo: PostDetailType = {
    id: 1,
    title: 'Xe điện VinFast VF e34 chạy 20.000km, bảo hành 12 tháng',
    priority: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    product: {
      id: 1,
      brand: 'VinFast',
      model: 'VF e34',
      power: '110 kW',
      price: '500000000',
      address: 'Quận Ba Đình, Hà Nội',
      description: 'Xe chính chủ, bảo dưỡng định kỳ. Trang bị đầy đủ tính năng an toàn, hỗ trợ lái.',
      category: { id: 1, name: 'Electric Car' },
      mileage: '20.000 km',
      year: 2022,
      seats: 5,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop',
        'https://plus.unsplash.com/premium_photo-1760496808689-7bb84539bb65?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1771'
      ],
      warranty: '12 tháng',
      color: 'Trắng',
      previousOwners: 1 // 👈 data mẫu
    } as VehicleType,
    seller: { id: 1, name: 'Nguyễn Văn A', phone: '0901 234 567' }
  }
  return <ProductDetailPage post={demo} />
}
