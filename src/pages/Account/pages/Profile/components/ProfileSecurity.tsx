import { useMutation } from '@tanstack/react-query'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import accountApi from '~/apis/account.api'

export default function ProfileSecurity() {
  const [newPassword, setNewPassword] = useState('')
  const updateNewPassword = useMutation({
    mutationFn: (password: string) => accountApi.updateNewPassword(password),
    onSuccess: () => {
      console.log('update password thanh cong')
    },
    onError: () => {
      console.log('update password that bai')
    }
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setNewPassword(value)
    console.log(value)
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateNewPassword.mutate(newPassword)
    setNewPassword('')
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      {/* Change Password */}
      <form
        onSubmit={handleSubmit}
        className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'
      >
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Change Password</h2>

        <div className='space-y-4'>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Current Password</label>
            <input
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Enter current password'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>New Password</label>
            <input
              type='password'
              onChange={handleChange}
              value={newPassword}
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Enter new password'
            />
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-2'>Confirm New Password</label>
            <input
              type='password'
              className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-900 transition-colors'
              placeholder='Confirm new password'
            />
          </div>
          <button
            type='submit'
            className='w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition-all'
          >
            Update Password
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-all'>
        <h2 className='text-xl font-bold text-gray-900 mb-6'>Two-Factor Authentication</h2>

        <div className='space-y-4'>
          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>SMS Authentication</p>
              <p className='text-sm text-gray-600'>Receive codes via SMS</p>
            </div>
            <button className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium'>Enable</button>
          </div>

          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>Email Authentication</p>
              <p className='text-sm text-gray-600'>Receive codes via email</p>
            </div>
            <button className='px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium'>
              Enabled
            </button>
          </div>

          <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
            <div>
              <p className='font-semibold text-gray-900 mb-1'>Authenticator App</p>
              <p className='text-sm text-gray-600'>Use Google Authenticator</p>
            </div>
            <button className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium'>Setup</button>
          </div>
        </div>
      </div>
    </div>
  )
}
