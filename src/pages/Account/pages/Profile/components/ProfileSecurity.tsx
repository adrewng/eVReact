import { useMutation } from '@tanstack/react-query'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import accountApi from '~/apis/account.api'

export default function ProfileSecurity() {
  const [newPassword, setNewPassword] = useState('')
  const updateNewPassword = useMutation({
    mutationFn: (password: string) => accountApi.updateNewPassword(password),
    onSuccess: () => {},
    onError: () => {}
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewPassword(value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateNewPassword.mutate(newPassword)
    setNewPassword('')
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Đổi mật khẩu */}
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'
      >
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Đổi mật khẩu</h2>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Mật khẩu hiện tại</label>
            <input
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập mật khẩu hiện tại'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Mật khẩu mới</label>
            <input
              type='password'
              onChange={handleChange}
              value={newPassword}
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập mật khẩu mới'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Xác nhận mật khẩu mới</label>
            <input
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Nhập lại mật khẩu mới'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all'
          >
            Cập nhật mật khẩu
          </button>
        </div>
      </form>

      {/* Xác thực hai lớp */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Xác thực hai lớp</h2>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>Xác thực qua SMS</p>
              <p className='text-sm text-gray-600'>Nhận mã xác thực qua tin nhắn</p>
            </div>
            <button className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium'>Bật</button>
          </div>

          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>Xác thực qua Email</p>
              <p className='text-sm text-gray-600'>Nhận mã xác thực qua email</p>
            </div>
            <button className='px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium'>
              Đang bật
            </button>
          </div>

          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>Ứng dụng Authenticator</p>
              <p className='text-sm text-gray-600'>Sử dụng Google Authenticator</p>
            </div>
            <button className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium'>Thiết lập</button>
          </div>
        </div>
      </div>
    </div>
  )
}
