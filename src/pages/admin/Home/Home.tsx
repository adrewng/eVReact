// import Link from 'next/link'
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

import { AlertCircle, ArrowDownRight, ArrowUpRight, DollarSign, Users, Zap, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import dashboardApi from '~/apis/home.api'
import { path } from '~/constants/path'

// Mock data
// const dashboardData = {
//   totalRevenue: 2847500,
//   revenueChange: 12.5,
//   activeUsers: 3421,
//   usersChange: 8.2,
//   totalTransactions: 1847,
//   transactionsChange: -3.1,
//   totalPost: 98,
//   postChange: 2.1
// }

// const revenueByMonth = [
//   { month: 'Jan', revenue: 180000, transactions: 120 },
//   { month: 'Feb', revenue: 220000, transactions: 145 },
//   { month: 'Mar', revenue: 195000, transactions: 130 },
//   { month: 'Apr', revenue: 280000, transactions: 185 },
//   { month: 'May', revenue: 320000, transactions: 210 },
//   { month: 'Jun', revenue: 380000, transactions: 245 }
// ]

// 📢 Phân bố bài đăng theo danh mục

// const userGrowth = [
//   { month: 'Jan', buyers: 280, sellers: 120 },
//   { month: 'Feb', buyers: 320, sellers: 145 },
//   { month: 'Mar', buyers: 380, sellers: 160 },
//   { month: 'Apr', buyers: 450, sellers: 185 },
//   { month: 'May', buyers: 520, sellers: 210 },
//   { month: 'Jun', buyers: 620, sellers: 245 }
// ]

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  href
}: {
  title: string
  value: string | number
  change: number
  icon: LucideIcon
  color?: string
  href: string
}) => (
  <Link to={href}>
    <Card className='cursor-pointer hover:shadow-lg transition-shadow'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        <p className={`text-xs flex items-center gap-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <ArrowUpRight className='h-3 w-3' /> : <ArrowDownRight className='h-3 w-3' />}
          {typeof change === 'number' ? Math.abs(change) : change} from last month
        </p>
      </CardContent>
    </Card>
  </Link>
)

export default function Home() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardApi.getDashboardInfo
  })

  console.log('dashboard-', dashboardData)
  const dashboard = dashboardData?.data.data
  console.log('dashboard- summary', dashboard)

  const categoryDistribution = dashboard?.categoryDistribution ?? []
  const totalPosts = dashboard?.summary?.totalPost ?? 1 // tránh chia cho 0

  const categoryPercentData = categoryDistribution.map((item) => ({
    ...item,
    value: parseFloat(((item.posts / totalPosts) * 100).toFixed(1)),
    color:
      item.name === 'Electric Car'
        ? '#3b82f6'
        : item.name === 'Electric Motorcycle'
          ? '#10b981'
          : item.name === 'Car Battery'
            ? '#f59e0b'
            : item.name === 'Motorcycle Battery'
              ? '#ef4444'
              : '#6b7280'
  }))
  if (isLoading)
    return (
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='flex space-x-2'>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]'></span>
          <span className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'></span>
        </div>
      </div>
    )

  return (
    <div className='min-h-screen bg-background flex-1'>
      {/* Header */}
      <div className='border-b border-border bg-card'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-foreground'>Dashboard</h1>
              <p className='text-muted-foreground mt-1'>Welcome back! Here's your platform overview.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <StatCard
            title='Total Revenue'
            value={`${((dashboard?.summary.totalRevenue as number) / 1000000).toFixed(2)}M`}
            change={Number(((dashboard?.summary.revenueChange as number) / 1000000).toFixed(2))}
            icon={DollarSign}
            href={path.adminTransactions}
          />
          <StatCard
            title='Active Users'
            value={dashboard?.summary.activeUsers.toLocaleString() as string | number}
            change={dashboard?.summary.usersChange as number}
            icon={Users}
            href={path.adminUsers}
          />
          <StatCard
            title='Transactions'
            value={dashboard?.summary.totalTransactions.toLocaleString() as string | number}
            change={dashboard?.summary.transactionsChange as number}
            icon={Zap}
            href={path.adminTransactions}
          />
          <StatCard
            title='Total posts'
            value={`${dashboard?.summary.totalPost}`}
            change={dashboard?.summary.postChange as number}
            icon={AlertCircle}
            href={path.adminPosts}
          />
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Revenue Trend */}
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and transaction count</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={dashboard?.revenueByMonth}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='month' stroke='#6b7280' />
                  <YAxis stroke='#6b7280' />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Legend />
                  <Line type='monotone' dataKey='revenue' stroke='#3b82f6' strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Posts by Category</CardTitle>
              <CardDescription>Distribution of posts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={categoryPercentData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={90}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {categoryPercentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} labelFormatter={(label) => `${label}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Growth */}
        {/* <Card className='mb-8'>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Buyers vs Sellers growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart data={userGrowth}>
                <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                <XAxis dataKey='month' stroke='#6b7280' />
                <YAxis stroke='#6b7280' />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
                <Bar dataKey='buyers' fill='#3b82f6' radius={[8, 8, 0, 0]} />
                <Bar dataKey='sellers' fill='#10b981' radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card> */}
      </div>
    </div>
  )
}
