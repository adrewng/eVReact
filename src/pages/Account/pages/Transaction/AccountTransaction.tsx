import { useQuery } from '@tanstack/react-query'
import { CreditCard, DollarSign, Package, Wallet, CheckCircle, Clock, TrendingUp, Plus, Zap } from 'lucide-react'
import { useState } from 'react'
import transactionApi from '~/apis/transaction.api'
import TransactionHistory from './components/TransactionHistory'
import TopupModal from './components/TopupModal'

// Mock data for demonstration
// const mockTransactions = [
//   {
//     id: 'TXN-2024-001',
//     type: 'package',
//     description: 'Premium Package - 30 Days',
//     amount: 500000,
//     status: 'completed',
//     date: '2024-10-15T10:30:00',
//     method: 'Visa ****4532'
//   },

const mockWalletData = {
  balance: 2450000,
  totalSpent: 3500000,
  totalTopup: 5950000,
  pendingAmount: 200000
}

const mockPackages = [
  {
    id: 'PKG-001',
    name: 'Premium Package',
    type: 'premium',
    price: 500000,
    startDate: '2024-10-15',
    endDate: '2024-11-15',
    status: 'active',
    features: ['Featured Listings', 'Priority Support', 'Analytics Dashboard', 'Unlimited Posts']
  },
  {
    id: 'PKG-002',
    name: 'Certification Package',
    type: 'certification',
    price: 200000,
    startDate: '2024-09-20',
    endDate: '2024-12-20',
    status: 'active',
    features: ['Vehicle Verification', 'Trust Badge', 'Detailed Report']
  },
  {
    id: 'PKG-003',
    name: 'Basic Package',
    type: 'basic',
    price: 100000,
    startDate: '2024-08-01',
    endDate: '2024-10-01',
    status: 'expired',
    features: ['5 Posts/month', 'Basic Support']
  }
]

// Package Card Component
const PackageCard = ({ pkg }: { pkg: (typeof mockPackages)[0] }) => {
  const statusConfig = {
    active: { label: 'Active', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    expired: { label: 'Expired', color: 'text-gray-600 bg-gray-50 border-gray-200' }
  }

  const daysRemaining = Math.ceil((new Date(pkg.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div
      className={`bg-white border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ${pkg.status === 'active' ? 'border-gray-900' : 'border-gray-200'}`}
    >
      <div className='flex items-start justify-between mb-4'>
        <div>
          <div className='flex items-center gap-2 mb-2'>
            <h3 className='text-xl font-bold text-gray-900'>{pkg.name}</h3>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig[pkg.status as keyof typeof statusConfig].color}`}
            >
              {statusConfig[pkg.status as keyof typeof statusConfig].label}
            </span>
          </div>
          <p className='text-sm text-gray-600'>ID: {pkg.id}</p>
        </div>
        <div className='text-right'>
          <div className='text-2xl font-bold text-gray-900'>{pkg.price.toLocaleString('vi-VN')}</div>
          <div className='text-xs text-gray-600'>VND</div>
        </div>
      </div>

      <div className='space-y-2 mb-4'>
        {pkg.features.map((feature, index) => (
          <div key={index} className='flex items-center gap-2 text-sm text-gray-700'>
            <CheckCircle className='w-4 h-4 text-emerald-600 flex-shrink-0' />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className='pt-4 border-t border-gray-200'>
        <div className='flex items-center justify-between text-sm mb-2'>
          <span className='text-gray-600'>Start Date</span>
          <span className='font-medium text-gray-900'>{new Date(pkg.startDate).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>End Date</span>
          <span className='font-medium text-gray-900'>{new Date(pkg.endDate).toLocaleDateString('vi-VN')}</span>
        </div>
        {pkg.status === 'active' && daysRemaining > 0 && (
          <div className='mt-3 p-3 bg-gray-50 rounded-lg'>
            <div className='flex items-center justify-center gap-2 text-sm'>
              <Clock className='w-4 h-4 text-gray-600' />
              <span className='font-medium text-gray-900'>{daysRemaining} days remaining</span>
            </div>
          </div>
        )}
      </div>

      {pkg.status === 'active' && (
        <button className='w-full mt-4 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all'>
          Renew Package
        </button>
      )}
    </div>
  )
}

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
  const transactions = transactionsData?.data.data
  console.log('transaction -', transactionsData)

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
        <div className='grid grid-cols-4 gap-4'>
          <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center'>
                <Wallet className='w-6 h-6' />
              </div>
              <Zap className='w-5 h-5 text-white/60' />
            </div>
            <div className='text-3xl font-bold mb-1'>{mockWalletData.balance.toLocaleString('vi-VN')}</div>
            <div className='text-sm text-white/60'>Wallet Balance (VND)</div>
          </div>

          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center'>
                <TrendingUp className='w-6 h-6 text-emerald-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {mockWalletData.totalTopup.toLocaleString('vi-VN')}
            </div>
            <div className='text-sm text-gray-600'>Total Top-up (VND)</div>
          </div>

          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-rose-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {mockWalletData.totalSpent.toLocaleString('vi-VN')}
            </div>
            <div className='text-sm text-gray-600'>Total Spent (VND)</div>
          </div>

          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            <div className='flex items-start justify-between mb-4'>
              <div className='w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center'>
                <Clock className='w-6 h-6 text-amber-600' />
              </div>
            </div>
            <div className='text-3xl font-bold text-gray-900 mb-1'>
              {mockWalletData.pendingAmount.toLocaleString('vi-VN')}
            </div>
            <div className='text-sm text-gray-600'>Pending Amount (VND)</div>
          </div>
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

        {/* {activeTab === 'wallet' && (
          <div className='space-y-6'>
            <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white'>
              <div className='flex items-center justify-between mb-8'>
                <div>
                  <div className='text-sm text-white/60 mb-2'>Available Balance</div>
                  <div className='text-5xl font-bold'>{mockWalletData.balance.toLocaleString('vi-VN')} VND</div>
                </div>
                <div className='w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center'>
                  <Wallet className='w-8 h-8' />
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <button className='flex-1 px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-white/90 transition-all'>
                  Top Up Now
                </button>
                <button className='flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all'>
                  View History
                </button>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='bg-white border border-gray-200 rounded-2xl p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Wallet Statistics</h3>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                    <span className='text-gray-600'>Total Top-up</span>
                    <span className='font-semibold text-gray-900'>
                      {mockWalletData.totalTopup.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                  <div className='flex items-center justify-between py-3 border-b border-gray-100'>
                    <span className='text-gray-600'>Total Spent</span>
                    <span className='font-semibold text-gray-900'>
                      {mockWalletData.totalSpent.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                  <div className='flex items-center justify-between py-3'>
                    <span className='text-gray-600'>Pending Transactions</span>
                    <span className='font-semibold text-amber-600'>
                      {mockWalletData.pendingAmount.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </div>
              </div>

              <div className='bg-white border border-gray-200 rounded-2xl p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Top-up</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {[100000, 500000, 1000000, 2000000].map((amount) => (
                    <button
                      key={amount}
                      className='px-4 py-3 bg-gray-50 hover:bg-gray-900 hover:text-white text-gray-900 rounded-xl font-medium transition-all text-center'
                    >
                      {amount.toLocaleString('vi-VN')} VND
                    </button>
                  ))}
                </div>
                <div className='mt-4'>
                  <input
                    type='text'
                    placeholder='Enter custom amount'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-all'
                  />
                </div>
              </div>
            </div>
          </div>
        )} */}

        {activeTab === 'packages' && (
          <div className='space-y-6'>
            <div className='flex items-center justify-between'>
              <h2 className='text-2xl font-bold text-gray-900'>Your Packages</h2>
              <button className='flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl text-sm font-medium transition-all'>
                <Plus className='w-4 h-4' /> Browse Packages
              </button>
            </div>
            <div className='grid grid-cols-2 gap-6'>
              {mockPackages.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
