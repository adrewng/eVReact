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
import { useQuery } from '@tanstack/react-query'
import transactionApi from '~/apis/transaction.api'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import useQueryParam from '~/hooks/useQueryParam'
import TransactionTable from './components/TransactionTable'

const dailyRevenue = [
  { date: 'Jun 1', revenue: 45000 },
  { date: 'Jun 2', revenue: 52000 },
  { date: 'Jun 3', revenue: 48000 },
  { date: 'Jun 4', revenue: 61000 },
  { date: 'Jun 5', revenue: 55000 },
  { date: 'Jun 6', revenue: 58000 },
  { date: 'Jun 7', revenue: 64000 }
]

const StatCard = ({
  title,
  value,
  icon: Icon,
  color
}: {
  title: string
  value: string | number | undefined
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

export default function TransactionManagement() {
  const queryParams = useQueryParam()
  console.log('qr-param', queryParams)

  const {
    data: transactionData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['transaction-admin', queryParams],
    queryFn: () => transactionApi.getTransactionByAdmin(queryParams)
  })
  console.log('transactionData -', transactionData)
  const transaction = transactionData?.data.data

  const { data: revenueByTypeData } = useQuery({
    queryKey: ['revenue-type'],
    queryFn: transactionApi.getRevenueByType
  })
  console.log('revenue-', revenueByTypeData)

  const revenueByType = revenueByTypeData?.data.revenue
  const statusData = [
    { name: 'Tin đăng trả phí', value: revenueByType?.revenue_post, color: '#3b82f6' }, // Post
    { name: 'Mua gói', value: revenueByType?.revenue_packages, color: '#f59e0b' }, // Package
    { name: 'Đấu giá', value: revenueByType?.revenue_auctions, color: '#10b981' }
  ]
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
  if (isError) return <div className='p-6 text-center text-red-500'>Lỗi tải dữ liệu.</div>

  return (
    <div className='min-h-screen flex-1 bg-background'>
      {transaction && (
        <>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            {/* KPI Cards */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8'>
              <StatCard
                title='Total Revenue'
                value={`${(transaction?.totalRevenue / 1000000).toFixed(2)}M`}
                icon={DollarSign}
                color='bg-blue-500'
              />
              <StatCard
                title='Total Transactions'
                value={transaction?.total.toLocaleString()}
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
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Area
                        type='monotone'
                        dataKey='revenue'
                        stroke='#3b82f6'
                        fillOpacity={1}
                        fill='url(#colorRevenue)'
                      />
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
                  {statusData &&
                    statusData.map((item) => (
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
            <TransactionTable transaction={transaction} />
          </div>
          <PaginationAdmin pageSize={transaction?.pagination.page_size} queryConfig={queryParams} />
        </>
      )}
    </div>
  )
}
