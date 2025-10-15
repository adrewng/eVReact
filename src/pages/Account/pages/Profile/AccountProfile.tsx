import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, Edit2, Mail, MapPin, Shield } from 'lucide-react'
import { useContext, useMemo, useRef, useState } from 'react'
import accountApi from '~/apis/account.api'
import { AppContext } from '~/contexts/app.context'
import { setProfileToLS } from '~/utils/auth'
import ProfileOverview from './components/ProfileOverview'
import ProfileSecurity from './components/ProfileSecurity'
import StatsProfile from './components/StatsProfile'

export default function AccountProfile() {
  const [activeTab, setActiveTab] = useState('overview')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [isEditAvatar, setIsEditAvatar] = useState(false)
  const { setProfile } = useContext(AppContext)

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])

  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => accountApi.getProfile(),
    refetchOnMount: 'always', // mount lại là refetch
    refetchOnWindowFocus: true, // focus tab là refetch (nên bật)
    refetchOnReconnect: true
  })
  const profile = profileData?.data.data.user
  console.log('profile: ', profile)

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0]
    setFile(avatar)
  }
  const handleUpload = () => {
    fileInputRef.current?.click()
  }
  const handleEditClick = () => {
    setIsEditAvatar(!isEditAvatar)
  }

  const uploadAvatarMutation = useMutation({
    mutationFn: (data: FormData) => accountApi.updateAvatar(data),
    onSuccess: async (response) => {
      console.log('Cập nhật thành công!', response)
      setProfile(response.data.data)
      setProfileToLS(response.data.data)
      const { data: newData } = await refetch()
      console.log('data sau khi refetch', newData)
    },
    onError: (error) => {
      console.log('Cập nhật thất bại!', error)
      // const axiosError = error as AxiosError
      // console.error('❌ onError', axiosError.response?.data || axiosError.message)
      // console.log('Chi tiết lỗi:', (error.response?.data as any).data)
    }
  })
  const handleUploadAvatar = () => {
    if (!file) return

    const formData = new FormData()
    formData.append('avatar', file)
    // ----
    formData.append('full_name', profile.full_name)
    formData.append('email', profile.email)
    formData.append('gender', profile.gender)
    formData.append('phone', profile.phone)
    formData.append('address', profile.address)

    const uploadRes = uploadAvatarMutation.mutate(formData)
    console.log(uploadRes)
  }

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
                  <img
                    src={previewImage || profile.avatar || 'https://picsum.photos/32'}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>
                <input
                  type='file'
                  accept='.jpg, .png, .jpeg'
                  className='hidden'
                  ref={fileInputRef}
                  onChange={onFileChange}
                ></input>
                {!isEditAvatar ? (
                  <button
                    className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'
                    onClick={() => {
                      handleEditClick()
                      handleUpload()
                    }}
                  >
                    <Edit2 size={14} />
                  </button>
                ) : (
                  <button
                    className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'
                    onClick={() => {
                      handleEditClick()
                      handleUploadAvatar()
                    }}
                  >
                    <Check size={14} />
                  </button>
                )}
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
                  {profile.address && (
                    <span className='flex items-center gap-1.5'>
                      <MapPin className='w-4 h-4' />
                      {profile.address}
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
          {activeTab == 'overview' && <ProfileOverview profile={profile} refetch={refetch} />}
          {activeTab == 'security' && <ProfileSecurity />}
        </div>
      )}
    </div>
  )
}
