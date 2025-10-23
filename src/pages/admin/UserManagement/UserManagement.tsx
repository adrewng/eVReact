'use client'

import { useState } from 'react'
// import Link from 'next/link'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Users, TrendingUp, Shield, Search, ChevronLeft, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const userStats = {
  totalUsers: 3421,
  activeUsers: 2847,
  newUsersThisMonth: 342,
  verifiedUsers: 2156
}

const userGrowthData = [
  { month: 'Jan', total: 1200, verified: 800 },
  { month: 'Feb', total: 1450, verified: 950 },
  { month: 'Mar', total: 1680, verified: 1100 },
  { month: 'Apr', total: 2100, verified: 1400 },
  { month: 'May', total: 2650, verified: 1750 },
  { month: 'Jun', total: 3421, verified: 2156 }
]

const userTypeDistribution = [
  { name: 'Buyers', value: 60, color: '#3b82f6' },
  { name: 'Sellers', value: 30, color: '#10b981' },
  { name: 'Dealers', value: 10, color: '#f59e0b' }
]

const usersByRegion = [
  { region: 'North', users: 680, active: 580 },
  { region: 'South', users: 720, active: 620 },
  { region: 'East', users: 890, active: 750 },
  { region: 'West', users: 1131, active: 897 }
]

const recentUsers = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyena@example.com',
    type: 'Buyer',
    status: 'Verified',
    joinDate: '2024-06-15'
  },
  { id: 2, name: 'Trần Thị B', email: 'tranb@example.com', type: 'Seller', status: 'Pending', joinDate: '2024-06-14' },
  { id: 3, name: 'Phạm Văn C', email: 'phamc@example.com', type: 'Dealer', status: 'Verified', joinDate: '2024-06-13' },
  { id: 4, name: 'Lê Thị D', email: 'led@example.com', type: 'Buyer', status: 'Verified', joinDate: '2024-06-12' },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoange@example.com',
    type: 'Seller',
    status: 'Suspended',
    joinDate: '2024-06-11'
  }
]

const StatCard = ({
  title,
  value,
  icon: Icon,
  color
}: {
  title: string
  value: string | number
  icon: LucideIcon
  color?: string
}) => (
  <Card>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
      <CardTitle className='text-sm font-medium'>{title}</CardTitle>
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className='h-4 w-4 text-white' />
      </div>
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{value}</div>
    </CardContent>
  </Card>
)

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(null)

  const filteredUsers = recentUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {/* Header */}
      {/* <div className='border-b border-border bg-card'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center gap-4 mb-4'>
            <Link to='/'>
              <Button variant='ghost' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
            </Link>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>User Management</h1>
              <p className='text-muted-foreground mt-1'>Monitor and manage platform users</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard
            title='Total Users'
            value={userStats.totalUsers.toLocaleString()}
            icon={Users}
            color='bg-blue-500'
          />
          <StatCard
            title='Active Users'
            value={userStats.activeUsers.toLocaleString()}
            icon={TrendingUp}
            color='bg-green-500'
          />
          <StatCard title='New This Month' value={userStats.newUsersThisMonth} icon={Users} color='bg-purple-500' />
          <StatCard
            title='Verified Users'
            value={userStats.verifiedUsers.toLocaleString()}
            icon={Shield}
            color='bg-emerald-500'
          />
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* User Growth */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>User Growth Trend</CardTitle>
              <CardDescription>Total vs Verified users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='month' stroke='#6b7280' />
                  <YAxis stroke='#6b7280' />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Line type='monotone' dataKey='total' stroke='#3b82f6' strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  <Line type='monotone' dataKey='verified' stroke='#10b981' strokeWidth={2} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>User Types</CardTitle>
              <CardDescription>Distribution by role</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={userTypeDistribution}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {userTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Users by Region */}
        <Card className='mb-8'>
          <CardHeader>
            <CardTitle>Users by Region</CardTitle>
            <CardDescription>Click on a region to drill down</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={usersByRegion}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='region' stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey='users' fill='#3b82f6' radius={[8, 8, 0, 0]} />
                <Bar dataKey='active' fill='#10b981' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
                    <th className='text-left py-3 px-4 font-semibold'>Type</th>
                    <th className='text-left py-3 px-4 font-semibold'>Status</th>
                    <th className='text-left py-3 px-4 font-semibold'>Join Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className='border-b border-border hover:bg-muted/50'>
                      <td className='py-3 px-4'>{user.name}</td>
                      <td className='py-3 px-4 text-muted-foreground'>{user.email}</td>
                      <td className='py-3 px-4'>
                        <span className='px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                          {user.type}
                        </span>
                      </td>
                      <td className='py-3 px-4'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'Verified'
                              ? 'bg-green-100 text-green-800'
                              : user.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-muted-foreground'>{user.joinDate}</td>
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
