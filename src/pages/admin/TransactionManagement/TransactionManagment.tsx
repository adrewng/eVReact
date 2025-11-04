import { useState } from 'react'
// import Link from 'next/link'
import { DollarSign, TrendingUp, type LucideIcon } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'

// Mock data
const transactionStats = {
  totalRevenue: 2847500,
  totalTransactions: 1847,
  avgTransactionValue: 1542,
  successRate: 98.5
}

const dailyRevenue = [
  { date: 'Jun 1', revenue: 45000, transactions: 28 },
  { date: 'Jun 2', revenue: 52000, transactions: 32 },
  { date: 'Jun 3', revenue: 48000, transactions: 30 },
  { date: 'Jun 4', revenue: 61000, transactions: 38 },
  { date: 'Jun 5', revenue: 55000, transactions: 35 },
  { date: 'Jun 6', revenue: 58000, transactions: 36 },
  { date: 'Jun 7', revenue: 64000, transactions: 40 }
]

// const transactionStatus = [
//   { status: 'Completed', count: 1820, color: '#10b981' },
//   { status: 'Pending', count: 18, color: '#f59e0b' },
//   { status: 'Failed', count: 9, color: '#ef4444' }
// ]

const recentTransactions = [
  {
    id: 'TXN001',
    buyer: 'Nguyễn Văn A',
    seller: 'Trần Thị B',
    amount: 2500000,
    status: 'Completed',
    date: '2024-06-15 14:30',
    product: 'Tesla Model 3'
  },
  {
    id: 'TXN002',
    buyer: 'Phạm Văn C',
    seller: 'Lê Thị D',
    amount: 1800000,
    status: 'Completed',
    date: '2024-06-15 13:15',
    product: 'EV Battery Pack'
  },
  {
    id: 'TXN003',
    buyer: 'Hoàng Văn E',
    seller: 'Nguyễn Thị F',
    amount: 500000,
    status: 'Pending',
    date: '2024-06-15 12:00',
    product: 'Charging Cable'
  },
  {
    id: 'TXN004',
    buyer: 'Trần Văn G',
    seller: 'Phạm Thị H',
    amount: 3200000,
    status: 'Completed',
    date: '2024-06-15 11:45',
    product: 'BMW i3'
  },
  {
    id: 'TXN005',
    buyer: 'Lê Văn I',
    seller: 'Hoàng Thị J',
    amount: 1200000,
    status: 'Failed',
    date: '2024-06-15 10:30',
    product: 'Battery Module'
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
const statusData = [
  { name: 'Tin đăng trả phí', value: 12000000, color: '#3b82f6' }, // Post
  { name: 'Mua gói', value: 8500000, color: '#f59e0b' }, // Package
  { name: 'Đấu giá', value: 23000000, color: '#10b981' }
]

export default function TransactionManagement() {
  const [searchTerm] = useState('')
  const [statusFilter] = useState('all')

  const filteredTransactions = recentTransactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8'>
          <StatCard
            title='Total Revenue'
            value={`$${(transactionStats.totalRevenue / 1000000).toFixed(2)}M`}
            icon={DollarSign}
            color='bg-blue-500'
          />
          <StatCard
            title='Total Transactions'
            value={transactionStats.totalTransactions.toLocaleString()}
            icon={TrendingUp}
            color='bg-green-500'
          />
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
          {/* Daily Revenue */}
          <Card className='col-span-1 lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
            <CardHeader>
              <CardTitle>Daily Revenue</CardTitle>
              <CardDescription>Revenue trend over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={dailyRevenue}>
                  <defs>
                    <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.3} />
                      <stop offset='95%' stopColor='#3b82f6' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                  <XAxis dataKey='date' stroke='#6b7280' />
                  <YAxis stroke='#6b7280' />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type='monotone' dataKey='revenue' stroke='#3b82f6' fillOpacity={1} fill='url(#colorRevenue)' />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
            <h3 className='mb-6 text-lg font-semibold text-slate-900'>Doanh thu</h3>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString('vi-VN')} ₫`}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0', // viền xám nhạt (slate-200)
                    borderRadius: '8px',
                    color: '#0f172a', // slate-900
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    padding: '8px 12px'
                  }}
                  itemStyle={{
                    color: '#0f172a',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                  labelStyle={{
                    color: '#64748b', // slate-500
                    fontSize: '13px',
                    marginBottom: '4px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className='mt-4 space-y-2'>
              {statusData.map((item) => (
                <div key={item.name} className='flex items-center justify-between text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='h-3 w-3 rounded-full' style={{ backgroundColor: item.color }} />
                    <span className='text-slate-600'>{item.name}</span>
                  </div>
                  <span className='font-semibold text-slate-900'>{item.value.toLocaleString('vi-VN')}đ</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest transactions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-border'>
                    <th className='text-left py-3 px-4 font-semibold'>ID</th>
                    <th className='text-left py-3 px-4 font-semibold'>Buyer</th>
                    <th className='text-left py-3 px-4 font-semibold'>Seller</th>
                    <th className='text-left py-3 px-4 font-semibold'>Product</th>
                    <th className='text-left py-3 px-4 font-semibold'>Amount</th>
                    <th className='text-left py-3 px-4 font-semibold'>Status</th>
                    <th className='text-left py-3 px-4 font-semibold'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className='border-b border-border hover:bg-muted/50'>
                      <td className='py-3 px-4 font-mono text-xs'>{txn.id}</td>
                      <td className='py-3 px-4'>{txn.buyer}</td>
                      <td className='py-3 px-4'>{txn.seller}</td>
                      <td className='py-3 px-4'>{txn.product}</td>
                      <td className='py-3 px-4 font-semibold'>${txn.amount.toLocaleString()}</td>
                      <td className='py-3 px-4'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            txn.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : txn.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className='py-3 px-4 text-muted-foreground'>{txn.date}</td>
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
