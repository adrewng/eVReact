// components/MarketPriceRange.tsx
import { Info } from 'lucide-react'
import { formatVNDMillions } from '~/utils/formater'

type Props = {
  min: number // Giá thấp nhất của thị trường
  max: number // Giá cao nhất của thị trường
  listing: number // Giá đăng bán
  windowText?: string
}

export default function MarketPriceRange({
  min,
  max,
  listing,
  windowText = 'Theo dữ liệu trong 3 tháng gần nhất'
}: Props) {
  const hasRange = Number.isFinite(min) && Number.isFinite(max) && max >= min && min >= 0
  const hasListing = Number.isFinite(listing) && listing >= 0
  if (!hasRange || !hasListing) return null

  const spreadLeft = Math.max(0, listing - min)
  const spreadRight = Math.max(0, max - listing)
  const radius = Math.max(spreadLeft, spreadRight)
  const radiusPadded = radius * 1.4 || Math.max(listing * 0.4, (max - min) * 0.4)

  const domainMin = Math.max(0, listing - radiusPadded)
  const domainMax = listing + radiusPadded

  const clamp = (v: number) => Math.min(domainMax, Math.max(domainMin, v))
  const pct = (v: number) => ((clamp(v) - domainMin) / (domainMax - domainMin)) * 100

  const left = pct(min)
  const width = Math.max(0, pct(max) - pct(min))
  const markerLeft = pct(listing)

  const shouldMergeLabels = width < 15
  const isSameValue = min === max
  const hasNoMarketData = min === 0 && max === 0

  let adjustedLeft = left
  let adjustedWidth = width

  if (listing >= min && listing <= max && listing !== min && listing !== max) {
    const distanceToMin = markerLeft - left
    const distanceToMax = left + width - markerLeft
    const padding = 3
    if (distanceToMax < padding) {
      adjustedWidth = width + padding
    } else if (distanceToMin < padding) {
      adjustedLeft = Math.max(0, left - padding)
      adjustedWidth = width + padding
    }
  }

  return (
    <div className='rounded-2xl bg-zinc-100 p-4'>
      <div className='mb-1 flex items-center gap-2'>
        <span className='text-base font-semibold'>Khoảng giá thị trường</span>
        <Info className='h-4 w-4 text-zinc-400' aria-hidden />
      </div>
      <p className='mb-6 text-sm text-zinc-500'>{windowText}</p>

      {/* Track, Range Fill và Marker */}
      <div className='relative mb-2 h-6'>
        {/* Track - đường trắng */}
        <div
          className='absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white shadow-inner'
          aria-hidden
        />
        {/* Range Fill - thanh màu xanh */}
        <div
          className='absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-blue-600'
          style={{ left: `${adjustedLeft}%`, width: `${adjustedWidth}%` }}
          aria-hidden
        />
        {/* Marker - bubble hiển thị giá đăng */}
        <div
          className='absolute -top-5'
          style={{ left: `calc(${markerLeft}% - 14px)` }}
          aria-label={`Giá đăng: ${formatVNDMillions(listing)}`}
        >
          <div className='rounded-md bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white shadow whitespace-nowrap'>
            {formatVNDMillions(listing)}
          </div>
          <div className='mx-auto h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-blue-600' />
        </div>
      </div>

      {/* Labels */}
      <div className='relative mt-3 h-5 text-sm text-zinc-900'>
        {hasNoMarketData ? (
          <span className='text-zinc-500 italic'>Không có dữ liệu giá thị trường cho sản phẩm này</span>
        ) : isSameValue ? (
          // min = max, chỉ hiển thị 1 giá trị
          <span
            className='absolute whitespace-nowrap'
            style={{ left: `${left}%`, transform: 'translateX(calc(-50% + 9px))' }}
          >
            {formatVNDMillions(min)}
          </span>
        ) : shouldMergeLabels ? (
          // Labels quá gần, gộp thành "min max"
          <span className='absolute -translate-x-1/2 whitespace-nowrap' style={{ left: `${left + width / 2}%` }}>
            {formatVNDMillions(min)} {formatVNDMillions(max)}
          </span>
        ) : (
          // Labels đủ xa, hiển thị 2 label riêng biệt
          <>
            <span
              className='absolute whitespace-nowrap'
              style={{
                left: `${adjustedLeft}%`,
                transform: adjustedLeft < 5 ? 'translateX(0)' : 'translateX(-50%)'
              }}
            >
              {formatVNDMillions(min)}
            </span>
            <span
              className='absolute whitespace-nowrap'
              style={{
                left: `${adjustedLeft + adjustedWidth}%`,
                transform: adjustedLeft + adjustedWidth > 95 ? 'translateX(-100%)' : 'translateX(-50%)'
              }}
            >
              {formatVNDMillions(max)}
            </span>
          </>
        )}
      </div>
    </div>
  )
}
