import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '~/components/Sidebar/Sidebar'

interface Props {
  children?: React.ReactNode
}

export default function Dashboard({ children }: Props) {
  return (
    <div className='flex flex-1 bg-gray-100'>
      <div className='w-64 flex-shrink-0'>
        <div className='sticky top-0 h-screen overflow-y-auto'>
          <Sidebar />
        </div>
      </div>

      {children}
      <Outlet />
    </div>
  )
}
