'use client'

import { useState } from 'react'
// import Link from 'next/link'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import {
  TrendingUp,
  Users,
  DollarSign,
  Zap,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Mock data
const dashboardData = {
  totalRevenue: 2847500,
  revenueChange: 12.5,
  activeUsers: 3421,
  usersChange: 8.2,
  totalTransactions: 1847,
  transactionsChange: -3.1,
  platformHealth: 98.5,
  healthChange: 2.1
}

const revenueByMonth = [
  { month: 'Jan', revenue: 180000, transactions: 120 },
  { month: 'Feb', revenue: 220000, transactions: 145 },
  { month: 'Mar', revenue: 195000, transactions: 130 },
  { month: 'Apr', revenue: 280000, transactions: 185 },
  { month: 'May', revenue: 320000, transactions: 210 },
  { month: 'Jun', revenue: 380000, transactions: 245 }
]

const categoryDistribution = [
  { name: 'EV Vehicles', value: 45, color: '#3b82f6' },
  { name: 'Batteries', value: 35, color: '#10b981' },
  { name: 'Parts', value: 15, color: '#f59e0b' },
  { name: 'Accessories', value: 5, color: '#8b5cf6' }
]

const userGrowth = [
  { month: 'Jan', buyers: 280, sellers: 120 },
  { month: 'Feb', buyers: 320, sellers: 145 },
  { month: 'Mar', buyers: 380, sellers: 160 },
  { month: 'Apr', buyers: 450, sellers: 185 },
  { month: 'May', buyers: 520, sellers: 210 },
  { month: 'Jun', buyers: 620, sellers: 245 }
]

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
          {Math.abs(change)}% from last month
        </p>
      </CardContent>
    </Card>
  </Link>
)

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null)

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
            <div className='text-right'>
              <p className='text-sm text-muted-foreground'>Last updated: Today at 2:30 PM</p>
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
            value={`$${(dashboardData.totalRevenue / 1000000).toFixed(2)}M`}
            change={dashboardData.revenueChange}
            icon={DollarSign}
            href='/transactions'
          />
          <StatCard
            title='Active Users'
            value={dashboardData.activeUsers.toLocaleString()}
            change={dashboardData.usersChange}
            icon={Users}
            href='/users'
          />
          <StatCard
            title='Transactions'
            value={dashboardData.totalTransactions.toLocaleString()}
            change={dashboardData.transactionsChange}
            icon={Zap}
            href='/transactions'
          />
          <StatCard
            title='Platform Health'
            value={`${dashboardData.platformHealth}%`}
            change={dashboardData.healthChange}
            icon={AlertCircle}
            href='/'
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
                <LineChart data={revenueByMonth}>
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
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Product distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Growth */}
        <Card className='mb-8'>
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
        </Card>

        {/* Quick Links */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
          <Link to='/users'>
            <Button
              variant='outline'
              className='w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent'
            >
              <Users className='h-5 w-5' />
              <span className='text-xs'>User Management</span>
            </Button>
          </Link>
          <Link to='/transactions'>
            <Button
              variant='outline'
              className='w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent'
            >
              <DollarSign className='h-5 w-5' />
              <span className='text-xs'>Transactions</span>
            </Button>
          </Link>
          <Link to='/posts'>
            <Button
              variant='outline'
              className='w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent'
            >
              <TrendingUp className='h-5 w-5' />
              <span className='text-xs'>Posts</span>
            </Button>
          </Link>
          <Link to='/packages'>
            <Button
              variant='outline'
              className='w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent'
            >
              <Zap className='h-5 w-5' />
              <span className='text-xs'>Packages</span>
            </Button>
          </Link>
          <Link to='/'>
            <Button
              variant='outline'
              className='w-full h-20 flex flex-col items-center justify-center gap-2 bg-transparent'
            >
              <AlertCircle className='h-5 w-5' />
              <span className='text-xs'>System Health</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
