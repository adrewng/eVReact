import { Outlet } from 'react-router-dom'
import Sidebar from '~/components/Sidebar/Sidebar'

export default function Dashboard() {
  return (
    <div className='flex flex-1 bg-gray-100'>
      <div className='w-64 flex-shrink-0'>
        <div className='sticky top-0 h-screen overflow-y-auto'>
          <Sidebar />
        </div>
      </div>

      <Outlet />
    </div>
  )
}
