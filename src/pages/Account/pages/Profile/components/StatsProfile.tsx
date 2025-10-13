import { Car, ChevronRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StatsProfile() {
  const stats = [
    {
      label: 'Active Posts',
      value: 10,
      icon: Car,
      color: 'text-gray-900'
      // path: path.accountPosts
    },
    {
      label: 'Transactions',
      value: 22,
      icon: Zap,
      color: 'text-gray-900'
      //   path: path.accountPayment
    }
    // { label: 'Member Since', value: profileData.memberSince, icon: Calendar, color: 'text-gray-900' }
  ]
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {stats.map((stat, index) => (
        <Link
          to=''
          key={index}
          className='bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-900 transition-all group'
        >
          <div className='flex items-center justify-between mb-3'>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <ChevronRight className='w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors' />
          </div>
          <p className='text-sm text-gray-600 mb-1'>{stat.label}</p>
          <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
        </Link>
      ))}
    </div>
  )
}
