import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Battery, Bell, Car, Edit, Eye, MoreVertical, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { createSearchParams, Link } from 'react-router-dom'
import postApi from '~/apis/post.api'
import PaginationAdmin from '~/components/Pagination/PaginationAdmin'
import { path } from '~/constants/path'
import { tabs } from '~/constants/post'
import useQueryConfig from '~/hooks/useQueryConfig'
import { CategoryType } from '~/types/category.type'
import type { BatteryType, PostStatus, ProductListConfig, VehicleType } from '~/types/post.type'
import { formatCurrencyVND } from '~/utils/util'

export default function AccountPost() {
  const [activeTab, setActiveTab] = useState('all')
  const queryConfig = useQueryConfig()
  const { data: postData } = useQuery({
    queryKey: ['post-me', queryConfig],
    queryFn: () => postApi.getPostByMe(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData
  })
  const accountPostData = postData?.data.data
  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Các bài đăng của bạn</h1>
            <p className='text-gray-600'>Quản lí danh sách các bài đăng về xe và pin của bạn</p>
          </div>
          <div className='flex items-center gap-3'>
            <button className='relative p-3 hover:bg-gray-100 rounded-xl transition-all'>
              <Bell className='w-5 h-5 text-gray-700' />
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>
            <Link
              to={path.post}
              className='flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all'
            >
              <Plus className='w-5 h-5' /> Tạo bài đăng mới
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white border border-gray-200 rounded-2xl p-2 grid grid-cols-7 gap-2'>
          {tabs.map((tab) => (
            <Link
              to={{
                pathname: path.accountPosts,
                search: createSearchParams({
                  [tab.param]: tab.statusQuery
                }).toString()
              }}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className='flex items-center justify-center gap-2'>
                <span>{tab.label}</span>
                <span
                  className={`ml-1 text-xs rounded-full px-2 py-0.5 font-semibold ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}
                >
                  {accountPostData?.count?.[tab.id as PostStatus | 'all'] ?? 0}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Posts List */}
        <div className='space-y-4'>
          {/* Empty State */}
          {(accountPostData === undefined || accountPostData.posts.length === 0) && (
            <div className='text-center py-20 bg-white border border-gray-200 rounded-2xl'>
              <div className='w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5'>
                <Search className='w-10 h-10 text-gray-400' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>Không tìm thấy bài đăng nào</h3>
              <p className='text-gray-600 mb-6'>Hãy điều chỉnh lại tìm kiếm của bạn hoặc tạo bài đăng mới</p>
              <Link
                to={path.post}
                className='px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all'
              >
                Tạo bài đăng mới
              </Link>
            </div>
          )}
          {accountPostData?.posts.map((post) => (
            <div
              key={post.id}
              className='bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300'
            >
              <div className='flex gap-4 p-5'>
                {/* Thumbnail */}
                <div className='relative w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100'>
                  <img src={post.product.image} alt={post.title} className='w-full h-full object-cover' />
                  <div className='absolute bottom-3 right-3'>
                    <div className='bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 font-medium'>
                      {post.product.category.typeSlug === CategoryType.vehicle ? (
                        <>
                          <Car className='w-3.5 h-3.5' /> Vehicle
                        </>
                      ) : (
                        <>
                          <Battery className='w-3.5 h-3.5' /> Battery
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className='flex-1 flex flex-col justify-between'>
                  <div>
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-xl text-gray-900 line-clamp-1 mb-2'>{post.title}</h3>
                        <div className='flex items-center gap-3 text-sm text-gray-600'>
                          <span className='flex items-center gap-1'>
                            <span className='font-medium'>ID:</span> {post.id}
                          </span>
                          <span>•</span>
                          <span>{post.product.category.name}</span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>📍 {post.product.address}</span>
                        </div>
                      </div>
                      <button className='p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors'>
                        <MoreVertical className='w-5 h-5' />
                      </button>
                    </div>

                    <div className='flex items-center gap-6 mt-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        {/* <DollarSign className='w-5 h-5 text-emerald-600' /> */}
                        <span className='font-bold text-emerald-600 text-xl'>
                          {formatCurrencyVND(post.product.price)}
                        </span>
                      </div>
                      {post.product.category.typeSlug === CategoryType.vehicle && (
                        <>
                          <span className='text-gray-300'>|</span>
                          <span className='text-gray-600'>
                            <span className='font-medium'>🚗</span> {(post.product as VehicleType).mileage}km
                          </span>
                        </>
                      )}
                      {post.product.category.typeSlug === CategoryType.battery && (
                        <>
                          <span className='text-gray-300'>|</span>
                          <span className='text-gray-600'>
                            <span className='font-medium'>⚡</span> {(post.product as BatteryType).capacity}
                          </span>
                        </>
                      )}
                      <span className='text-gray-300'>|</span>
                      <span className='text-gray-600 flex items-center gap-1'>
                        <span className='font-medium'>🔋</span>
                        <span
                          className={`font-semibold ${
                            post.product.health >= '90' ? 'text-emerald-600' : 'text-amber-600'
                          }`}
                        >
                          {post.product.health}
                        </span>
                        {/* {post.product.category.typeSlug === CategoryType.battery ? (
                          <span
                            className={`font-semibold ${
                              (post.product as BatteryType).health >= '90' ? 'text-emerald-600' : 'text-amber-600'
                            }`}
                          >
                            {(post.product as BatteryType).health}
                          </span>
                        ) : (
                          <span
                            className={`font-semibold ${
                              post.vehicle.battery_capacity >= 90
                                ? 'text-emerald-600'
                                : post.price >= 80
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                            }`}
                          >
                            {post.vehicle.battery_capacity}%
                          </span>
                        )} */}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center justify-between mt-4 pt-4 border-t border-gray-100'>
                    <div className='flex items-center gap-4 text-sm text-gray-500'>
                      {/* <span className='flex items-center gap-1.5'>
                        <Eye className='w-4 h-4' />
                        {post.views.toLocaleString()} views
                      </span> */}
                      <span>•</span>
                      <span>Posted {new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button className='flex items-center gap-1.5 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-sm font-medium transition-all'>
                        <Eye className='w-4 h-4' /> View
                      </button>
                      <button className='flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl text-sm font-medium transition-all'>
                        <Edit className='w-4 h-4' /> Edit
                      </button>
                      <button className='flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-sm font-medium transition-all'>
                        <Trash2 className='w-4 h-4' /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {accountPostData !== undefined && accountPostData.posts.length !== 0 && (
            <PaginationAdmin pageSize={accountPostData.pagination.page_size} queryConfig={queryConfig} />
          )}
        </div>
      </div>
    </div>
  )
}
