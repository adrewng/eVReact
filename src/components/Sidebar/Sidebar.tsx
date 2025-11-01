import { useMutation } from '@tanstack/react-query'
import { Bell, CreditCard, FileText, Gavel, Home, LogOutIcon, MessageSquare, Package, Users } from 'lucide-react'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import { cn } from '~/lib/utils'
import logoUrl from '~/shared/logo.svg'

const menuItems = [
  { label: 'Dashboard', icon: Home, path: path.adminDashboard },
  { label: 'Transaction', icon: CreditCard, path: path.adminTransactions },
  { label: 'Posts', icon: FileText, path: path.adminPosts },
  { label: 'User', icon: Users, path: path.adminUsers },
  { label: 'Auction', icon: Gavel, path: path.adminAuctions },
  { label: 'Package', icon: Package, path: path.adminPackages }
]

const generalItems = [
  { label: 'Notifications', icon: Bell, path: path.adminDashboard },
  { label: 'Feedback', icon: MessageSquare, path: path.adminDashboard }
]

export default function Sidebar() {
  // const [active, setActive] = useState('Dashboard')

  const location = useLocation()
  const currentPath = location.pathname
  console.log('location -', location)
  console.log('currentPath -', currentPath)

  const { setIsAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => setIsAuthenticated(false)
  })
  return (
    <div className='h-full flex flex-col p-4 bg-white shadow-md border-r border-gray-200'>
      {/* Logo */}
      <div className='flex-shrink-0 w-[120px] h-[60px] mx-2'>
        <Link to={path.adminDashboard} className='inline-flex items-center'>
          <img src={logoUrl} alt='EViest' className='block select-none object-contain w-full ' />
        </Link>
      </div>

      {/* mot o ve thong tin admin gom ava tron ben goc trai, ho ten chu bu va email o ben duoi */}
      <div className='flex items-center bg-gray-50 p-3 rounded-lg mb-6 mx-2 shadow-sm'>
        <img
          src='https://via.placeholder.com/40' // avatar placeholder
          alt='Admin Avatar'
          className='w-10 h-10 rounded-full object-cover'
        />
        <div className='ml-3'>
          <p className='text-sm font-semibold text-gray-800'>Nguyễn Văn A</p>
          <p className='text-xs text-gray-500'>admin@example.com</p>
        </div>
      </div>

      {/* Menu */}
      <nav className='flex flex-col flex-1'>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.path

          return (
            <Link to={item.path as string} key={item.label} className='mb-1'>
              <button
                // onClick={() => setActive(item.label)}
                className={cn(
                  'flex items-center justify-between w-full px-4 py-2 rounded-lg transition duration-200 font-medium text-gray-700',
                  isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                )}
              >
                <div className='flex items-center space-x-3'>
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>

                {/* {item.badge && (
                  <span
                    className={cn(
                      'text-xs font-semibold px-2 py-0.5 rounded-full',
                      isActive ? 'bg-green-700 text-white' : 'bg-green-100 text-green-700'
                    )}
                  >
                    {item.badge}
                  </span>
                )} */}
              </button>
            </Link>
          )
        })}

        {/* General Section */}
        <div className='mt-8'>
          <p className='text-xs uppercase text-gray-400 mb-2 px-4'>General</p>
          {generalItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.path

            return (
              <button
                key={item.label}
                // onClick={() => setActive(item.label)}
                className={cn(
                  'flex items-center space-x-3 w-full px-4 py-2 rounded-lg transition duration-200 font-medium text-gray-700 mb-1',
                  isActive ? 'bg-green-100 text-green-700' : 'hover:bg-gray-100'
                )}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
      {/* Bottom logout button */}
      <div className='mt-auto px-4 py-3 border-t border-gray-200'>
        <button
          onClick={() => {
            // TODO: thêm logic logout
            logoutMutation.mutate()
          }}
          className='flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200 font-medium'
        >
          <LogOutIcon size={18} /> {/* bạn có thể dùng icon thích hợp, ví dụ từ lucide-react */}
          <span className='ml-2'>Logout</span>
        </button>
      </div>
    </div>
  )
}
