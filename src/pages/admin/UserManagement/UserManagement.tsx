'use client'

import { useState } from 'react'
// import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import userApi from '~/apis/user.api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { UserBarChart } from './components/UserBarChart'
import UserStatCards from './components/UserStatCards'

// // Mock data
// const userStats = {
//   totalUsers: 3421,
//   activeUsers: 2847,
//   newUsersThisMonth: 342,
//   verifiedUsers: 2156
// }

// const userGrowthData = [
//   { month: 'Jan', total: 1200, verified: 800 },
//   { month: 'Feb', total: 1450, verified: 950 },
//   { month: 'Mar', total: 1680, verified: 1100 },
//   { month: 'Apr', total: 2100, verified: 1400 },
//   { month: 'May', total: 2650, verified: 1750 },
//   { month: 'Jun', total: 3421, verified: 2156 }
// ]

// const userTypeDistribution = [
//   { name: 'Buyers', value: 60, color: '#3b82f6' },
//   { name: 'Sellers', value: 30, color: '#10b981' },
//   { name: 'Dealers', value: 10, color: '#f59e0b' }
// ]

// const usersByRegion = [
//   { region: 'North', users: 680, active: 580 },
//   { region: 'South', users: 720, active: 620 },
//   { region: 'East', users: 890, active: 750 },
//   { region: 'West', users: 1131, active: 897 }
// ]

// const recentUsers = [
//   {
//     id: 1,
//     name: 'Nguyễn Văn A',
//     email: 'nguyena@example.com',
//     type: 'Buyer',
//     status: 'Verified',
//     joinDate: '2024-06-15'
//   },
//   { id: 2, name: 'Trần Thị B', email: 'tranb@example.com', type: 'Seller', status: 'Pending', joinDate: '2024-06-14' },
//   { id: 3, name: 'Phạm Văn C', email: 'phamc@example.com', type: 'Dealer', status: 'Verified', joinDate: '2024-06-13' },
//   { id: 4, name: 'Lê Thị D', email: 'led@example.com', type: 'Buyer', status: 'Verified', joinDate: '2024-06-12' },
//   {
//     id: 5,
//     name: 'Hoàng Văn E',
//     email: 'hoange@example.com',
//     type: 'Seller',
//     status: 'Suspended',
//     joinDate: '2024-06-11'
//   }
// ]

// const StatCard = ({
//   title,
//   value,
//   icon: Icon,
//   color
// }: {
//   title: string
//   value: string | number
//   icon: LucideIcon
//   color?: string
// }) => (
//   <Card>
//     <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
//       <CardTitle className='text-sm font-medium'>{title}</CardTitle>
//       <div className={`p-2 rounded-lg ${color}`}>
//         <Icon className='h-4 w-4 text-white' />
//       </div>
//     </CardHeader>
//     <CardContent>
//       <div className='text-2xl font-bold'>{value}</div>
//     </CardContent>
//   </Card>
// )

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  // const [selectedRegion, setSelectedRegion] = useState(null)

  // const filteredUsers = recentUsers.filter(
  //   (user) =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // )

  const { data: userData } = useQuery({
    queryKey: ['user-list'],
    queryFn: userApi.getAllUser
  })

  const userList = userData?.data.data
  console.log('user list -', userList)

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        <UserStatCards />

        <UserBarChart />

        {/* Recent Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations and activity</CardDescription>
            <div className='mt-4 flex items-center gap-2'>
              <Search className='h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search users...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='max-w-sm'
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-border'>
                    <th className='text-left py-3 px-4 font-semibold'>Name</th>
                    <th className='text-left py-3 px-4 font-semibold'>Email</th>
                    <th className='text-left py-3 px-4 font-semibold'>Phone</th>
                    <th className='text-left py-3 px-4 font-semibold'>Status</th>
                    <th className='text-left py-3 px-4 font-semibold'>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userList &&
                    userList.map((user) => (
                      <tr key={user.id} className='border-b border-border hover:bg-muted/50'>
                        <td className='py-3 px-4'>{user.full_name}</td>
                        <td className='py-3 px-4 text-muted-foreground'>{user.email}</td>
                        <td className='py-3 px-4'>
                          <span className='px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                            {user.phone}
                          </span>
                        </td>
                        <td className='py-3 px-4'>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : user.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className='py-3 px-4 text-muted-foreground'>
                          {new Date(user.created_at).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
