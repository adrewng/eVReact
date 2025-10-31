'use client'

import { useState } from 'react'
import {
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react'
import { Button } from '~/components/ui/button'

export default function SellerProfilePage() {
  const [activeTab, setActiveTab] = useState('reviews')
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock data với structure từ backend
  const seller = {
    id: 1,
    full_name: 'Nguyễn Văn A',
    avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23000000',
    phone: '0912345678',
    email: 'nguyenvana@example.com',
    address: 'Quận 1, TP. Hồ Chí Minh',
    gender: 'Nam',
    isVerify: true,
    verificationStatus: 'verified',
    reputation: 4.8,
    balance: 15000000,
    totalCredit: '50000000',
    total_posts: 42,
    total_transactions: 89,
    createdAt: '2023-03-15',
    status: 'active',
    role: 'seller',
    responseTime: '< 1 giờ',
    completionRate: 98,
    description:
      'Chuyên cung cấp xe ô tô chính hãng với 5 năm kinh nghiệm. Cam kết chất lượng, giá cả minh bạch và dịch vụ hậu mãi tốt nhất.'
  }

  const reviews = [
    {
      id: 1,
      author: 'Trần Thị B',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23666666',
      rating: 5,
      date: '2 ngày trước',
      title: 'Xe đẹp, giao dịch nhanh gọn',
      content:
        'Seller rất chuyên nghiệp, xe đúng như mô tả. Giao dịch nhanh chóng, không phiền phức. Sẽ mua lại lần nữa.',
      helpful: 24
    },
    {
      id: 2,
      author: 'Lê Văn C',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23444444',
      rating: 5,
      date: '1 tuần trước',
      title: 'Rất hài lòng với dịch vụ',
      content: 'Seller tư vấn rất kỹ, giúp tôi chọn được chiếc xe phù hợp. Giá cả hợp lý, chất lượng tốt.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Phạm Minh D',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23888888',
      rating: 4,
      date: '2 tuần trước',
      title: 'Tốt nhưng có thể tốt hơn',
      content: 'Xe chất lượng tốt, nhưng thời gian giao hàng hơi lâu. Nhân viên tư vấn rất tốt.',
      helpful: 12
    }
  ]

  const posts = [
    {
      id: 1,
      title: 'Toyota Camry 2020 - Màu Đen',
      price: '850 triệu',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Honda Civic 2021 - Màu Trắng',
      price: '720 triệu',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Mazda CX-5 2022 - Màu Xám',
      price: '950 triệu',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop'
    }
  ]

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  const getJoinDuration = (date) => {
    const join = new Date(date)
    const now = new Date()
    const months = Math.floor((now - join) / (1000 * 60 * 60 * 24 * 30))
    return months > 12 ? `${Math.floor(months / 12)} năm` : `${months} tháng`
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Minimalist Header */}
      <div className='h-48 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900' />

      <div className='mx-auto max-w-6xl px-4 pb-16'>
        {/* Profile Card */}
        <div className='-mt-24 mb-12'>
          <div className='rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm'>
            <div className='flex flex-col gap-8 lg:flex-row lg:items-start'>
              {/* Avatar & Basic Info */}
              <div className='flex flex-col items-center lg:items-start'>
                <div className='relative'>
                  <div className='h-32 w-32 rounded-full border-4 border-white bg-neutral-100 shadow-lg'>
                    <img
                      src={seller.avatar}
                      alt={seller.full_name}
                      className='h-full w-full rounded-full object-cover'
                    />
                  </div>
                  {seller.isVerify && (
                    <div className='absolute -bottom-2 -right-2 rounded-full bg-black p-2 shadow-lg'>
                      <ShieldCheck className='h-5 w-5 text-white' />
                    </div>
                  )}
                </div>

                <div className='mt-6 text-center lg:text-left'>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-3xl font-bold tracking-tight text-neutral-900'>{seller.full_name}</h1>
                  </div>
                  {seller.isVerify && (
                    <div className='mt-2 inline-flex items-center gap-1.5 rounded-full border border-neutral-900 bg-neutral-900 px-3 py-1 text-xs font-medium text-white'>
                      <CheckCircle2 className='h-3 w-3' />
                      Đã xác minh
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className='flex-1'>
                <div className='grid grid-cols-2 gap-4 lg:grid-cols-4'>
                  <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Star className='h-4 w-4' />
                      <span className='text-xs font-medium uppercase tracking-wide'>Đánh giá</span>
                    </div>
                    <p className='mt-2 text-2xl font-bold text-neutral-900'>{seller.reputation}</p>
                    <p className='text-xs text-neutral-500'>Xuất sắc</p>
                  </div>

                  <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <TrendingUp className='h-4 w-4' />
                      <span className='text-xs font-medium uppercase tracking-wide'>Giao dịch</span>
                    </div>
                    <p className='mt-2 text-2xl font-bold text-neutral-900'>{seller.total_transactions}</p>
                    <p className='text-xs text-neutral-500'>Hoàn thành</p>
                  </div>

                  <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Clock className='h-4 w-4' />
                      <span className='text-xs font-medium uppercase tracking-wide'>Phản hồi</span>
                    </div>
                    <p className='mt-2 text-2xl font-bold text-neutral-900'>{seller.responseTime}</p>
                    <p className='text-xs text-neutral-500'>Trung bình</p>
                  </div>

                  <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-4'>
                    <div className='flex items-center gap-2 text-neutral-600'>
                      <Users className='h-4 w-4' />
                      <span className='text-xs font-medium uppercase tracking-wide'>Bài đăng</span>
                    </div>
                    <p className='mt-2 text-2xl font-bold text-neutral-900'>{seller.total_posts}</p>
                    <p className='text-xs text-neutral-500'>Đang hoạt động</p>
                  </div>
                </div>

                {/* Description */}
                <div className='mt-6'>
                  <p className='text-sm leading-relaxed text-neutral-600'>{seller.description}</p>
                </div>

                {/* Action Buttons */}
                <div className='mt-6 flex flex-wrap gap-3'>
                  <Button className='rounded-full bg-neutral-900 px-6 hover:bg-neutral-800'>
                    <MessageCircle className='mr-2 h-4 w-4' />
                    Liên hệ ngay
                  </Button>
                  <Button
                    variant='outline'
                    className='rounded-full border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <Heart className={`mr-2 h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? 'Đã theo dõi' : 'Theo dõi'}
                  </Button>
                  <Button variant='ghost' className='rounded-full text-neutral-600 hover:text-neutral-900'>
                    <Share2 className='mr-2 h-4 w-4' />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className='mb-8 border-b border-neutral-200'>
          <div className='flex gap-8'>
            {[
              { key: 'reviews', label: 'Đánh giá', count: reviews.length },
              { key: 'posts', label: 'Bài đăng', count: seller.total_posts },
              { key: 'info', label: 'Thông tin' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && <span className='ml-1.5 text-xs'>({tab.count})</span>}
                {activeTab === tab.key && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900' />}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'reviews' && (
          <div className='space-y-8'>
            {/* Rating Overview */}
            <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-8'>
              <div className='grid gap-8 lg:grid-cols-2'>
                <div className='flex flex-col justify-center'>
                  <div className='mb-4'>
                    <div className='text-6xl font-bold text-neutral-900'>{seller.reputation}</div>
                    <div className='mt-3 flex gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.floor(seller.reputation)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-neutral-200 text-neutral-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className='mt-3 text-sm text-neutral-600'>
                      Dựa trên <span className='font-semibold text-neutral-900'>{reviews.length} đánh giá</span>
                    </p>
                  </div>
                </div>

                <div className='space-y-3'>
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const percentage = stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : 1
                    return (
                      <div key={stars} className='flex items-center gap-3'>
                        <div className='flex w-16 items-center gap-1'>
                          <span className='text-sm font-medium text-neutral-900'>{stars}</span>
                          <Star className='h-3.5 w-3.5 fill-amber-400 text-amber-400' />
                        </div>
                        <div className='h-2 flex-1 overflow-hidden rounded-full bg-neutral-200'>
                          <div
                            className='h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all'
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className='w-12 text-right text-sm font-medium text-neutral-600'>
                          {Math.round(percentage * 1.56)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className='space-y-4'>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className='rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-sm'
                >
                  <div className='flex gap-4'>
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className='h-12 w-12 rounded-full bg-neutral-100 object-cover'
                    />
                    <div className='flex-1'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='font-semibold text-neutral-900'>{review.author}</p>
                          <div className='mt-1.5 flex gap-0.5'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'fill-neutral-200 text-neutral-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className='text-xs text-neutral-500'>{review.date}</span>
                      </div>
                      <h4 className='mt-3 font-medium text-neutral-900'>{review.title}</h4>
                      <p className='mt-2 text-sm leading-relaxed text-neutral-600'>{review.content}</p>
                      <button className='mt-4 flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900'>
                        <Heart className='h-4 w-4' />
                        Hữu ích ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <div
                key={post.id}
                className='group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition hover:shadow-lg'
              >
                <div className='relative aspect-video overflow-hidden bg-neutral-100'>
                  <img
                    src={post.image}
                    alt={post.title}
                    className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='p-5'>
                  <h3 className='font-semibold text-neutral-900'>{post.title}</h3>
                  <p className='mt-2 text-xl font-bold text-neutral-900'>{post.price}</p>
                  <Button
                    className='mt-4 w-full rounded-full border border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white'
                    variant='outline'
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'info' && (
          <div className='grid gap-6 lg:grid-cols-2'>
            {/* Contact Information */}
            <div className='rounded-2xl border border-neutral-200 bg-white p-6'>
              <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Thông tin liên hệ</h3>
              <div className='space-y-5'>
                <div className='flex items-start gap-4'>
                  <div className='rounded-full bg-neutral-100 p-3'>
                    <Phone className='h-5 w-5 text-neutral-700' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-neutral-500'>Điện thoại</p>
                    <p className='mt-1 font-medium text-neutral-900'>{seller.phone}</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <div className='rounded-full bg-neutral-100 p-3'>
                    <MapPin className='h-5 w-5 text-neutral-700' />
                  </div>
                  <div>
                    <p className='text-sm font-medium text-neutral-500'>Địa chỉ</p>
                    <p className='mt-1 font-medium text-neutral-900'>{seller.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Stats */}
            <div className='rounded-2xl border border-neutral-200 bg-white p-6'>
              <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Thống kê kinh doanh</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between py-3 border-b border-neutral-100'>
                  <span className='text-sm text-neutral-600'>Tham gia từ</span>
                  <span className='font-semibold text-neutral-900'>{getJoinDuration(seller.createdAt)}</span>
                </div>
                <div className='flex items-center justify-between py-3 border-b border-neutral-100'>
                  <span className='text-sm text-neutral-600'>Tổng giao dịch</span>
                  <span className='font-semibold text-neutral-900'>{seller.total_transactions}</span>
                </div>
                <div className='flex items-center justify-between py-3 border-b border-neutral-100'>
                  <span className='text-sm text-neutral-600'>Tỷ lệ hoàn thành</span>
                  <span className='font-semibold text-neutral-900'>{seller.completionRate}%</span>
                </div>
                <div className='flex items-center justify-between py-3'>
                  <span className='text-sm text-neutral-600'>Uy tín</span>
                  <span className='font-semibold text-neutral-900'>{seller.reputation}/5.0</span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className='rounded-2xl border border-neutral-200 bg-neutral-50 p-6 lg:col-span-2'>
              <h3 className='mb-6 text-lg font-semibold text-neutral-900'>Trạng thái xác minh</h3>
              <div className='grid gap-4 sm:grid-cols-3'>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4'>
                  <CheckCircle2 className='h-5 w-5 text-neutral-900' />
                  <div>
                    <p className='text-sm font-medium text-neutral-900'>Email</p>
                    <p className='text-xs text-neutral-600'>Đã xác minh</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4'>
                  <CheckCircle2 className='h-5 w-5 text-neutral-900' />
                  <div>
                    <p className='text-sm font-medium text-neutral-900'>Số điện thoại</p>
                    <p className='text-xs text-neutral-600'>Đã xác minh</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4'>
                  <CheckCircle2 className='h-5 w-5 text-neutral-900' />
                  <div>
                    <p className='text-sm font-medium text-neutral-900'>CCCD</p>
                    <p className='text-xs text-neutral-600'>Đã xác minh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
