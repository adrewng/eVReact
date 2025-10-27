import { useState } from 'react'
import AuctionCharts from './components/AuctionCharts'
import AuctionsTable from './components/AuctionsTable'
import FilterBar from './components/FilterBar'
import StatsOverview from './components/StatsOverview'

export default function AuctionManagement() {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'recent'
  })

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex-1'>
      {/* Header */}
      {/* <div className='border-b border-slate-200 bg-white'>
        <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          <div className='flex items-end justify-between'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-slate-900'>Quản Lý Đấu Giá</h1>
              <p className='mt-2 text-sm text-slate-600'>Theo dõi và quản lý tất cả các phiên đấu giá</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Content */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Stats Overview */}
        <StatsOverview />

        {/* Charts Section */}
        <div className='mt-8'>
          <AuctionCharts />
        </div>

        {/* Filter & Table Section */}
        <div className='mt-8 space-y-6'>
          <FilterBar filters={filters} setFilters={setFilters} />
          {/* <AuctionsTable filters={filters} /> */}
          <AuctionsTable />
        </div>
      </div>
    </main>
  )
}
