import React, { useState } from 'react'
import { Bell, UserPen, Newspaper, ChevronRight, ChevronDown } from 'lucide-react'
import { path } from '~/constants/path'
import { NavLink } from 'react-router-dom'

const accountItems = [
  {
    label: 'Notifications',
    icon: Bell,
    path: path.accountNotification,
    children: []
  },
  {
    label: 'My Profile',
    icon: UserPen,
    path: path.accountProfile,
    children: [
      { label: 'Profile', path: path.accountProfile },
      { label: 'Payment', path: path.accountPayment },
      // { label: 'Address', path: path.accountAddress },
      // { label: 'Password Changing', path: path.accountChangePassword },
      { label: 'Privacy Setting', path: path.accountPrivacySetting }
    ]
  },
  {
    label: 'Posts',
    icon: Newspaper,
    path: path.accountPosts,
    children: []
  }
]
export default function SidebarAccount() {
  const [openMenu, setOpenMenu] = useState<string | null>('My Profile')

  const isActiveParent = (item: (typeof accountItems)[0]) => {
    if (item.children.length === 0) {
      return location.pathname === item.path
    }
    return item.children.some((child) => location.pathname === child.path)
  }
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
      {/* Navigation */}
      <nav className='flex-1 p-4 space-y-1'>
        {accountItems.map((item) => {
          const Icon = item.icon
          const isOpen = item.label === openMenu
          const isActive = isActiveParent(item)
          const hasChildren = item.children.length > 0

          return (
            <div key={item.path}>
              {/* Parent Item */}
              {hasChildren ? (
                <button
                  onClick={() => setOpenMenu(isOpen ? null : item.label)}
                  className={`
                    flex items-center justify-between w-full px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <div className='flex items-center gap-3'>
                    <Icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{item.label}</span>
                  </div>
                  <ChevronDown
                    className={`
                      w-4 h-4 transition-transform duration-200
                      ${isOpen ? 'rotate-180' : ''}
                    `}
                  />
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center justify-between w-full px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <div className='flex items-center gap-3'>
                    <Icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{item.label}</span>
                  </div>
                </NavLink>
              )}

              {/* Children Items */}
              {isOpen && hasChildren && (
                <div className='mt-1 ml-4 space-y-1'>
                  {item.children.map((child) => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      className={({ isActive }) => `
                        flex items-center gap-2 px-4 py-2.5 rounded-lg
                        text-sm transition-all duration-200
                        ${
                          isActive
                            ? 'text-gray-900 font-medium bg-gray-100'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }
                      `}
                    >
                      <ChevronRight className='w-3.   5 h-3.5' />
                      <span>{child.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
