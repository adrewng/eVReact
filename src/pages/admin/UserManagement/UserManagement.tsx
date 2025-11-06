'use client'

import { useState } from 'react'
// import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Search, UserRound } from 'lucide-react'
import userApi from '~/apis/user.api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: userData } = useQuery({
    queryKey: ['user-list'],
    queryFn: userApi.getAllUser
  })

  const userList = userData?.data.data.users
  console.log('user list -', userList)

  const totalUsers = userData?.data.data.totalUsers

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        {/* <UserStatCards />

        <UserBarChart /> */}

        {/* Recent Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations and activity</CardDescription>
            {/* Hiển thị tổng số người dùng */}
            <div className='flex items-center justify-between gap-4'>
              {/* Search Bar - Left */}
              <div className='relative flex-1 max-w-md'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Search users...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>

              {/* Total Users - Right */}
              <div className='flex items-center gap-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg px-4 py-2.5 border border-primary/20'>
                <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10'>
                  <UserRound className='h-4 w-4 text-primary' />
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs text-muted-foreground font-medium'>Total Users</span>
                  <span className='text-lg font-bold text-primary'>{totalUsers ?? 0}</span>
                </div>
              </div>
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
