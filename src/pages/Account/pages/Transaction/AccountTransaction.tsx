import { useQuery } from '@tanstack/react-query'
import { CreditCard, DollarSign, Package, Wallet, TrendingUp, Plus, Zap } from 'lucide-react'
import { useState } from 'react'
import transactionApi from '~/apis/transaction.api'
import TransactionHistory from './components/TransactionHistory'
import TopupModal from './components/TopupModal'
import packageApi from '~/apis/package.api'
import type { PackageByMe } from '~/types/package.type'
import PackageCard from './components/PackageCard'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

// Main Component
export default function AccountTransaction() {
  const [activeTab, setActiveTab] = useState('history')
  const [showTopUp, setShowTopUp] = useState(false)

  const tabs = [
    { id: 'history', label: 'Payment History', icon: CreditCard },
    // { id: 'wallet', label: 'Wallet Balance', icon: Wallet },
    { id: 'packages', label: 'Active Packages', icon: Package }
  ]

  const { data: transactionsData } = useQuery({
    queryKey: ['transaction-me'],
    queryFn: transactionApi.getUserTransaction
  })
  const transactions = transactionsData?.data.data.data
  console.log('transaction -', transactionsData)

  const { data: packageByMeData } = useQuery({
    queryKey: ['package-me'],
    queryFn: packageApi.getPackageByMe
  })
  console.log('package -', packageByMeData)
  const packageByMe = packageByMeData?.data.data

  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Payment & Billing</h1>
            <p className='text-gray-600'>Manage your transactions, wallet balance and subscriptions</p>
          </div>
          <button
            onClick={() => setShowTopUp(true)}
            className='flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all'
          >
            <Plus className='w-5 h-5' /> Top Up Wallet
          </button>
        </div>
        {showTopUp && <TopupModal setShowTopup={() => setShowTopUp(false)} />}

        {/* Quick Stats */}
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center'>
                <Wallet className='w-6 h-6' />
              </div>
              <Zap className='w-5 h-5 text-white/60' />
            </div>
            <div className='text-3xl font-bold mb-1'>
              {transactionsData?.data.data.total_credit.toLocaleString('vi-VN')}đ
            </div>
            <div className='text-sm text-white/60'>Số dư ví (VND)</div>
          </div>

          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center'>
                <TrendingUp className='w-6 h-6 text-emerald-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {transactionsData?.data.data.total_topup.toLocaleString('vi-VN')}đ
            </div>
            <div className='text-sm text-gray-600'>Tổng nạp (VND)</div>
          </div>

          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-rose-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {transactionsData?.data.data.total_spend.toLocaleString('vi-VN')}đ
            </div>
            <div className='text-sm text-gray-600'>Tổng chi (VND)</div>
          </div>

          {/* <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center'>
                <Clock className='w-6 h-6 text-amber-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {mockWalletData.pendingAmount.toLocaleString('vi-VN')}
            </div>
            <div className='text-sm text-gray-600'>Pending Amount (VND)</div>
          </div> */}
        </div>

        {/* Navigation Tabs */}
        <div className='border-b border-gray-200'>
          <div className='flex gap-8'>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-medium transition-all relative flex items-center gap-2 ${
                    activeTab === tab.id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className='w-4 h-4' />
                  {tab.label}
                  {activeTab === tab.id && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900'></div>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content Section */}
        {activeTab === 'history' && <TransactionHistory transactions={transactions} />}

        {activeTab === 'packages' && (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>Gói tin của bạn</h2>
              <Link to={path.pricing}>
                <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl text-sm font-medium transition-all'>
                  <Plus className='w-4 h-4' /> Mua gói
                </button>
              </Link>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              {packageByMe?.map((pkg: PackageByMe) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
