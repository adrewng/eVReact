// import { useState } from 'react'
// import AuctionCharts from './components/AuctionCharts'
import AuctionsTable from './components/AuctionsTable'
// import FilterBar from './components/FilterBar'
import StatsOverview from './components/StatsOverview'

export default function AuctionManagement() {
  // const [filters, setFilters] = useState({
  //   status: 'all',
  //   search: '',
  //   sortBy: 'recent'
  // })

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex-1'>
      {/* Content */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Stats Overview */}
        <StatsOverview />

        {/* Charts Section */}
        <div className='mt-8'>{/* <AuctionCharts /> */}</div>

        {/* Filter & Table Section */}
        <div className='mt-8 space-y-6'>
          {/* <FilterBar filters={filters} setFilters={setFilters} /> */}
          {/* <AuctionsTable filters={filters} /> */}
          <AuctionsTable />
        </div>
      </div>
    </main>
  )
}
