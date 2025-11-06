import { useMutation, type QueryObserverResult, type RefetchOptions } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { Check, Edit2, Loader2 } from 'lucide-react'
import { useContext, useEffect, useState } from 'react'
import accountApi from '~/apis/account.api'
import { AppContext } from '~/contexts/app.context'
import type { BodyUpdateProfile, User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import { setProfileToLS } from '~/utils/auth'
import { formatCurrencyVND } from '~/utils/util'

type Props = {
  profile?: User
  refetch: (
    options?: RefetchOptions
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<{ user: User; refresh_token: string }>, unknown, object>, Error>
  >
}

export default function ProfileOverview(props: Props) {
  const { profile, refetch } = props
  const [isEdit, setIsEdit] = useState(false)
  const initialFormData = {
    full_name: '',
    gender: '',
    phone: '',
    address: '',
    email: '',
    avatar: '',
    description: ''
  }
  const [formData, setFormData] = useState(initialFormData)
  const { setProfile } = useContext(AppContext)

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        gender: profile.gender || '',
        phone: profile.phone || '',
        address: profile.address || '',
        email: profile.email || '',
        avatar: profile.avatar || '',
        description: profile.description || ''
      })
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const updateProfileMutation = useMutation({
    mutationFn: (data: BodyUpdateProfile) => accountApi.updateProfile(data),
    onSuccess: async (res) => {
      const user = res.data.data.user

      // Cập nhật context + LS
      setProfile(user)
      setProfileToLS(user)

      // Đồng bộ lại formData theo snapshot từ server
      setFormData({
        full_name: user.full_name ?? '',
        gender: user.gender ?? '',
        phone: user.phone ?? '',
        address: user.address ?? '',
        email: user.email ?? '',
        avatar: user.avatar ?? '',
        description: user.description ?? ''
      })

      await refetch()
      setIsEdit(false)
    },
    onError: () => {}
  })

  const isMutating = updateProfileMutation.isPending ?? false

  const handleToggleEdit = () => {
    if (isMutating) return

    if (isEdit) {
      updateProfileMutation.mutate(formData as BodyUpdateProfile)
    } else {
      setIsEdit(true)
    }
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <div className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-bold text-gray-900'>Thông tin cá nhân</h2>
          <button
            onClick={handleToggleEdit}
            disabled={isMutating}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
              ${isMutating ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            aria-label={isEdit ? 'Lưu thông tin' : 'Chỉnh sửa thông tin'}
          >
            {isMutating ? (
              <Loader2 size={16} className='animate-spin text-gray-600' />
            ) : isEdit ? (
              <Check size={18} className='text-green-600' />
            ) : (
              <Edit2 size={16} className='text-gray-600' />
            )}
          </button>
        </div>

        {/* Khóa toàn bộ field khi submit để tránh sửa giữa chừng */}
        <fieldset disabled={isMutating} className='space-y-5 disabled:opacity-100'>
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Họ và tên</label>
              {isEdit ? (
                <input
                  type='text'
                  name='full_name'
                  value={formData.full_name}
                  onChange={handleChange}
                  className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
                />
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.full_name}</p>
              )}
            </div>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Giới tính</label>
              {isEdit ? (
                <input
                  type='text'
                  name='gender'
                  value={formData.gender}
                  onChange={handleChange}
                  className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
                />
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.gender || '_'}</p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5'>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>
                Số điện thoại
              </label>
              {isEdit ? (
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
                />
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.phone || '_'}</p>
              )}
            </div>
            <div>
              <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Email</label>
              {isEdit ? (
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
                />
              ) : (
                <p className='text-base font-semibold text-gray-900'>{profile?.email}</p>
              )}
            </div>
          </div>

          <div>
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>Địa chỉ</label>
            {isEdit ? (
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
              />
            ) : (
              <p className='text-base font-semibold text-gray-900'>{profile?.address || '_'}</p>
            )}
          </div>

          <div>
            <label className='text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2'>
              Mô tả bản thân
            </label>
            {isEdit ? (
              // Có thể đổi sang <textarea> nếu muốn multiline
              <input
                type='text'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed'
              />
            ) : (
              <p className='text-base font-semibold text-gray-900'>{profile?.description || '_'}</p>
            )}
          </div>
        </fieldset>
      </div>

      <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white flex flex-col justify-between'>
        <div>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <p className='text-sm text-gray-400 mb-2'>Số dư khả dụng</p>
              <h2 className='text-4xl font-bold'>{formatCurrencyVND(profile?.totalCredit)}</h2>
            </div>
            <div className='flex gap-3'>
              <button
                className='px-5 py-2.5 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                disabled={isMutating}
              >
                Rút tiền
              </button>
              <button
                className='px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed'
                disabled={isMutating}
              >
                Nạp tiền
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
