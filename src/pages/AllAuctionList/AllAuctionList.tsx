import { motion } from 'framer-motion'
import AuctionCard from './components/AuctionCard'
import { useQuery } from '@tanstack/react-query'
import auctionApi from '~/apis/auction.api'
import type { Auction } from '~/types/auction.type'

// ⚙️ Mock data đấu giá (có startDate & endDate)
const mockAuctions = [
  {
    id: 1,
    title: 'Xe điện VinFast VF e34 cũ - bản nâng cấp',
    image: 'https://images.unsplash.com/photo-1619106338289-3b74484b7a8d?auto=format&fit=crop&w=800&q=60',
    currentPrice: 425000000,
    stepPrice: 5000000,
    totalBids: 12,
    startTime: '2025-10-23T10:00:00',
    endTime: '2025-10-28T15:00:00',
    location: 'Hà Nội'
  },
  {
    id: 2,
    title: 'Pin xe điện CATL 60kWh - tình trạng tốt',
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60',
    currentPrice: 68000000,
    stepPrice: 2000000,
    totalBids: 7,
    startTime: '2025-10-25T20:00:00', // Chưa bắt đầu
    endTime: '2025-10-26T20:00:00',
    location: 'TP. Hồ Chí Minh'
  },
  {
    id: 3,
    title: 'Xe điện Tesla Model 3 cũ - nhập Mỹ',
    image: 'https://images.unsplash.com/photo-1617814076762-dc8190e97cd2?auto=format&fit=crop&w=800&q=60',
    currentPrice: 990000000,
    stepPrice: 10000000,
    totalBids: 23,
    startTime: '2025-10-20T08:00:00',
    endTime: '2025-10-27T22:00:00',
    location: 'Đà Nẵng'
  },
  {
    id: 4,
    title: 'Pin xe điện LG Chem 75kWh - hàng chính hãng',
    image: 'https://images.unsplash.com/photo-1617083970103-3c38b7e0b3e4?auto=format&fit=crop&w=800&q=60',
    currentPrice: 85000000,
    stepPrice: 3000000,
    totalBids: 5,
    startTime: '2024-10-29T18:00:00', // Chưa bắt đầu
    endTime: '2024-10-30T18:00:00',
    location: 'Cần Thơ'
  },
  {
    id: 1,
    title: 'Xe điện VinFast VF e34 cũ - bản nâng cấp',
    image: 'https://images.unsplash.com/photo-1619106338289-3b74484b7a8d?auto=format&fit=crop&w=800&q=60',
    currentPrice: 425000000,
    stepPrice: 5000000,
    totalBids: 12,
    startTime: '2025-10-23T10:00:00',
    endTime: '2025-10-28T15:00:00',
    location: 'Hà Nội'
  },
  {
    id: 2,
    title: 'Pin xe điện CATL 60kWh - tình trạng tốt',
    image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=60',
    currentPrice: 68000000,
    stepPrice: 2000000,
    totalBids: 7,
    startTime: '2025-10-25T20:00:00', // Chưa bắt đầu
    endTime: '2025-10-26T20:00:00',
    location: 'TP. Hồ Chí Minh'
  },
  {
    id: 3,
    title: 'Xe điện Tesla Model 3 cũ - nhập Mỹ',
    image: 'https://images.unsplash.com/photo-1617814076762-dc8190e97cd2?auto=format&fit=crop&w=800&q=60',
    currentPrice: 990000000,
    stepPrice: 10000000,
    totalBids: 23,
    startTime: '2025-10-20T08:00:00',
    endTime: '2025-10-27T22:00:00',
    location: 'Đà Nẵng'
  },
  {
    id: 4,
    title: 'Pin xe điện LG Chem 75kWh - hàng chính hãng',
    image: 'https://images.unsplash.com/photo-1617083970103-3c38b7e0b3e4?auto=format&fit=crop&w=800&q=60',
    currentPrice: 85000000,
    stepPrice: 3000000,
    totalBids: 5,
    startTime: '2024-10-29T18:00:00', // Chưa bắt đầu
    endTime: '2024-10-30T18:00:00',
    location: 'Cần Thơ'
  }
]

export default function AllAuctionList() {
  const { data: allAuctionData } = useQuery({
    queryKey: ['all-auction'],
    queryFn: auctionApi.getAllAuction
  })

  console.log('all-auction', allAuctionData)
  const allAuction = allAuctionData?.data.data
  const pageLoading = false
  const pageData = { auctions: mockAuctions }

  return (
    <div className='min-h-screen text-zinc-900 pb-8 pt-8 mx-auto max-w-7xl px-4 py-6'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=' mb-12 space-y-3'
      >
        <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900'>Phiên Đấu Giá Nổi Bật</h1>
        <p className='text-zinc-600 max-w-2xl  text-lg'>
          Khám phá những phiên đấu giá xe điện và pin năng lượng hấp dẫn nhất hôm nay. Đặt giá thầu của bạn để giành
          được sản phẩm ưa thích!
        </p>
        <hr className='my-4 border-zinc-900 ' />
      </motion.div>
      <motion.section
        initial={false}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        className='min-w-0'
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pr-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {pageLoading && !pageData
            ? Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`s-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className='group'
                >
                  <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white h-[300px]' />
                </motion.div>
              ))
            : (pageData?.auctions ?? []).map((auction: Auction) => (
                <motion.div
                  key={auction.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className='group'
                >
                  <div className='flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-lg'>
                    <AuctionCard auction={auction} />
                  </div>
                </motion.div>
              ))}
        </div>
      </motion.section>
    </div>
  )
}
