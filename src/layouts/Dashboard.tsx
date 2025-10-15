import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '~/components/Sidebar/Sidebar'

interface Props {
  children?: React.ReactNode
}

export default function Dashboard({ children }: Props) {
  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar />
      {children}
      <Outlet />
    </div>
  )
}
