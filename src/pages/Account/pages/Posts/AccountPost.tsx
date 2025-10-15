import { useState } from 'react'
import { Bell, Search, Plus, Eye, Edit, Trash2, Battery, Car, MoreVertical } from 'lucide-react'
import { createSearchParams, Link } from 'react-router-dom'
import { path } from '~/constants/path'
import { useQuery } from '@tanstack/react-query'
import postApi from '~/apis/post.api'
import useQueryParam from '~/hooks/useQueryParam'
import type { PostListStatus } from '~/types/admin/post.type'

// const statusConfig = {
//   pending: { label: 'Pending Review', color: 'text-amber-700 bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
//   accepted: { label: 'Published', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
//   rejected: { label: 'Rejected', color: 'text-rose-700 bg-rose-50 border-rose-200', dot: 'bg-rose-500' },
//   certified: { label: 'Certified', color: 'text-blue-700 bg-blue-50 border-blue-200', dot: 'bg-blue-500' },
//   certifying: {
//     label: 'Under Certification',
//     color: 'text-purple-700 bg-purple-50 border-purple-200',
//     dot: 'bg-purple-500'
//   }
// }

const tabs = [
  { id: 'all', label: 'All', statusQuery: '' },
  { id: 'pending', label: 'Pending', statusQuery: 'pending' },
  { id: 'approved', label: 'Published', statusQuery: 'approved' },
  { id: 'rejected', label: 'Rejected', statusQuery: 'rejected' },
  { id: 'certified', label: 'Certified', statusQuery: 'certified' },
  { id: 'certifying', label: 'Certifying', statusQuery: 'certifying' }
]

type QueryConfigStatus = {
  [key in keyof PostListStatus]?: string
}
export default function AccountPost() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const statusParams: QueryConfigStatus = useQueryParam()
  const queryConfigStatus: QueryConfigStatus = {
    status: statusParams.status
  }
  const { data } = useQuery({
    queryKey: ['status', queryConfigStatus],
    queryFn: () => postApi.getPostByMe(queryConfigStatus as PostListStatus)
  })

  // console.log(data)
  console.log('data-', data)
  const accountPostData = data?.data.data
  console.log(accountPostData)

  // const getFilteredPosts = () => {
  //   if (accountPostData) {
  //     let filtered = activeTab === 'all' ? accountPostData : accountPostData.filter((post) => post.status === activeTab)
  //     if (searchQuery) {
  //       filtered = filtered.filter(
  //         (post) =>
  //           post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           post.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           post.location.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //     }
  //     return filtered
  //   }
  // }

  const getTabCount = (status: string) =>
    status === 'all' ? accountPostData?.length : accountPostData?.filter((p) => p.status === status).length

  // const filteredPosts = getFilteredPosts()

  // const filteredPosts = accountPostData

  // const mockPosts = data?.data.data

  return (
    <div className='flex-1 bg-white min-h-screen'>
      <div className='max-w-7xl mx-auto p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>My Posts</h1>
            <p className='text-gray-600'>Manage your electric vehicle and battery listings</p>
          </div>
          <div className='flex items-center gap-3'>
            <button className='relative p-3 hover:bg-gray-100 rounded-xl transition-all'>
              <Bell className='w-5 h-5 text-gray-700' />
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>
            <button className='flex items-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium shadow-lg transition-all'>
              <Plus className='w-5 h-5' /> Create New Post
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className='bg-white border border-gray-200 rounded-2xl p-2 grid grid-cols-6 gap-2'>
          {tabs.map((tab) => (
            <Link
              to={{
                pathname: path.accountPosts,
                search: createSearchParams({
                  status: tab.statusQuery
                }).toString()
              }}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all ${
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
                  {getTabCount(tab.id)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Posts List */}
        <div className='space-y-4'>
          {accountPostData?.map((post) => (
            <div
              key={post.id}
              className='bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300'
            >
              <div className='flex gap-4 p-5'>
                {/* Thumbnail */}
                <div className='relative w-56 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100'>
                  <img src={post.image} alt={post.title} className='w-full h-full object-cover' />
                  <div className='absolute top-3 left-3'>
                    {/* <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm ${statusConfig[post.status as keyof typeof statusConfig].color}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusConfig[post.status as keyof typeof statusConfig].dot}`}
                      ></span>
                      {statusConfig[post.status as keyof typeof statusConfig].label}
                    </span> */}
                  </div>
                  <div className='absolute bottom-3 right-3'>
                    <div className='bg-gray-900/80 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 font-medium'>
                      {post.category.name === 'Electric Car' ? (
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
                          <span>{post.category.type}</span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>📍 {post.address}</span>
                        </div>
                      </div>
                      <button className='p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors'>
                        <MoreVertical className='w-5 h-5' />
                      </button>
                    </div>

                    <div className='flex items-center gap-6 mt-4 text-sm'>
                      <div className='flex items-center gap-2'>
                        {/* <DollarSign className='w-5 h-5 text-emerald-600' /> */}
                        <span className='font-bold text-emerald-600 text-xl'>{post.price}VND</span>
                      </div>
                      {post.vehicle && (
                        <>
                          <span className='text-gray-300'>|</span>
                          <span className='text-gray-600'>
                            <span className='font-medium'>🚗</span> {post.vehicle.mileage_km}km
                          </span>
                        </>
                      )}
                      {post.battery && (
                        <>
                          <span className='text-gray-300'>|</span>
                          <span className='text-gray-600'>
                            <span className='font-medium'>⚡</span> {post.battery.capacity}
                          </span>
                        </>
                      )}
                      <span className='text-gray-300'>|</span>
                      <span className='text-gray-600 flex items-center gap-1'>
                        <span className='font-medium'>🔋</span>
                        {post.battery ? (
                          <span
                            className={`font-semibold ${
                              post.battery.health >= 90
                                ? 'text-emerald-600'
                                : post.price >= 80
                                  ? 'text-amber-600'
                                  : 'text-rose-600'
                            }`}
                          >
                            {post.battery.health}
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
                        )}
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

          {/* Empty State */}
          {accountPostData?.length === 0 && (
            <div className='text-center py-20 bg-white border border-gray-200 rounded-2xl'>
              <div className='w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-5'>
                <Search className='w-10 h-10 text-gray-400' />
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>No posts found</h3>
              <p className='text-gray-600 mb-6'>Try adjusting your filters or create a new post</p>
              <button className='px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all'>
                Create New Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
