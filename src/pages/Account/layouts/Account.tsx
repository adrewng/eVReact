import React from 'react'
import AuthHeader from '~/components/AuthHeader'
import SidebarAccount from '../components/SidebarAccount'
import { Outlet } from 'react-router-dom'

export default function Account() {
  return (
    <div className='min-h-screen flex flex-col'>
      <AuthHeader />
      <div className='flex flex-1'>
        {/* {Sidebar} */}
        <div className='w-64 flex-shrink-0'>
          <div className='sticky top-0 h-screen overflow-y-auto'>
            <SidebarAccount />
          </div>
        </div>
        {/* {Content} */}
        <div className='flex flex-1 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
