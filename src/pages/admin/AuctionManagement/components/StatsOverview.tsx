'use client'

import { TrendingUp, Gavel, Users, DollarSign } from 'lucide-react'

const stats = [
  {
    label: 'Tổng Phiên Đấu Giá',
    value: '48',
    change: '+12%',
    icon: Gavel,
    color: 'from-blue-500 to-blue-600'
  },
  {
    label: 'Tổng Lượt Đấu Giá',
    value: '1,247',
    change: '+23%',
    icon: TrendingUp,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    label: 'Người Tham Gia',
    value: '342',
    change: '+8%',
    icon: Users,
    color: 'from-purple-500 to-purple-600'
  },
  {
    label: 'Doanh Thu',
    value: '2.4B',
    change: '+18%',
    icon: DollarSign,
    color: 'from-orange-500 to-orange-600'
  }
]

export default function StatsOverview() {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className='group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md'
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`}
            />

            <div className='relative'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-slate-600'>{stat.label}</p>
                  <p className='mt-2 text-3xl font-bold text-slate-900'>{stat.value}</p>
                </div>
                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3`}>
                  <Icon className='h-6 w-6 text-white' />
                </div>
              </div>
              <p className='mt-4 text-xs font-semibold text-emerald-600'>{stat.change} từ tháng trước</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
