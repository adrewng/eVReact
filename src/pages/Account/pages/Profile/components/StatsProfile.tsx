import { Car, ChevronRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import type { ProfileData } from '~/types/user.type'
type Props = {
  profile: ProfileData['user'] | undefined
}

export default function StatsProfile(props: Props) {
  const { profile } = props
  const stats = [
    {
      label: 'Active Posts',
      value: profile?.total_posts || 0,
      icon: Car,
      color: 'text-gray-900',
      path: path.accountPosts
    },
    {
      label: 'Transactions',
      value: profile?.total_transactions || 0,
      icon: Zap,
      color: 'text-gray-900',
      path: path.accountTransaction
    }
  ]
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {stats.map((stat, index) => (
        <Link
          to={stat.path}
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
