import React from 'react'

export default function SidebarAccount() {
  return (
    <div className='h-full bg-white border-r border-gray-200 flex flex-col '>
      SidebarAccount
      {/* User Profile Section */}
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center gap-3'>
          <img
            src='https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-during-the-uefa-nations-news-photo-1748359673.pjpeg?crop=0.610xw:0.917xh;0.317xw,0.0829xh&resize=640:*'
            alt='User Avatar'
            className='w-12 h-12 rounded-xl object-cover ring-2 ring-gray-100'
          />
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-semibold text-gray-900 truncate'>Nguyễn Văn A</p>
            <p className='text-xs text-gray-500 truncate'>admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
