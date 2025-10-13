import { Edit2, Mail, MapPin, Shield } from 'lucide-react'
import StatsProfile from './components/StatsProfile'
import { useState } from 'react'
import ProfileOverview from './components/ProfileOverview'
import ProfileSecurity from './components/ProfileSecurity'
import { useQuery } from '@tanstack/react-query'
import accountApi from '~/apis/account.api'

export default function AccountProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => accountApi.getProfile()
  })

  const profile = profileData?.data.data.user
  console.log('profile: ', profile)

  return (
    <div className='min-h-screen bg-white flex-1'>
      {profile && (
        <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
          <div>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>My profile</h1>
            <p className='text-gray-600'>Manage your profile information, security and payment.</p>
          </div>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <div className='flex items-start gap-6'>
              {/* Profile Image */}
              <div className='relative group'>
                <div className='w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-gray-200'>
                  <img src={profile.avatar} alt='Profile' className='w-full h-full object-cover' />
                </div>
                <button className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'>
                  <Edit2 size={14} />
                </button>
              </div>

              {/* Name & Status */}
              <div>
                <div className='flex items-center gap-3 mb-2'>
                  <h1 className='text-3xl font-bold text-gray-900'>{profile.full_name}</h1>
                  {profile.verificationStatus && (
                    <div className='flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full'>
                      <Shield className='w-4 h-4 text-gray-900' />
                      <span className='text-xs font-medium text-gray-900'>Verified</span>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-6 text-sm text-gray-600'>
                  {profile.location && (
                    <span className='flex items-center gap-1.5'>
                      <MapPin className='w-4 h-4' />
                      {profile.location}
                    </span>
                  )}
                  {profile.email && (
                    <span className='flex items-center gap-1.5'>
                      <Mail className='w-4 h-4' />
                      {profile.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsProfile profile={profile} />

          {/* Navigation Tabs */}
          <div className='border-b border-gray-200'>
            <div className='flex gap-8'>
              {['overview', 'security'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium transition-all relative ${
                    activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900'></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          {activeTab == 'overview' && <ProfileOverview profile={profile} />}
          {activeTab == 'security' && <ProfileSecurity />}
        </div>
      )}
    </div>
  )
}
