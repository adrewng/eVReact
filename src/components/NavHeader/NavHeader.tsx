import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import logoUrl from '~/shared/logo.svg'
import NavPillLink from '../NavPillLink'
import Popover from '../Popover'

export default function NavHeader() {
  const { isAuthenticated, profile, setIsAuthenticated } = useContext(AppContext)
  const [openMobile, setOpenMobile] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => setIsAuthenticated(false)
  })
  const handleLogout = () => logoutMutation.mutate()

  return (
    <div className='bg-white/80 border-b border-zinc-200'>
      <div className='mx-auto max-w-screen-2xl px-4 md:px-6'>
        {/* GRID: mobile = auto 1fr auto  |  >=md = 1fr auto 1fr */}
        <div
          className='
          grid items-center gap-3 h-16 md:h-20
          grid-cols-[auto_minmax(0,1fr)_auto]
          md:grid-cols-[1fr_auto_1fr]
        '
        >
          {/* LEFT: hamburger (mobile) + logo */}
          <div className='justify-self-start flex items-center gap-3'>
            <button
              onClick={() => setOpenMobile((v) => !v)}
              className='md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-zinc-100'
              aria-label='Open menu'
            >
              <svg viewBox='0 0 24 24' className='h-6 w-6'>
                <path stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' d='M4 7h16M4 12h16M4 17h16' />
              </svg>
            </button>

            <Link to={path.home} className='inline-flex items-center gap-2'>
              <img
                src={logoUrl}
                alt='EViest'
                className='
      block w-auto h-14 md:h-16 lg:h-20
      shrink-0 select-none
      [transform:scale(2.5)] [transform-origin:left_center]
    '
              />
            </Link>
          </div>

          {/* CENTER: main nav (luôn đúng giữa ở >=md) */}
          <div className='hidden md:flex min-w-0 justify-self-center gap-4 lg:gap-6 text-sm md:text-base font-medium'>
            <NavPillLink to={path.home}>EViest</NavPillLink>
            <NavPillLink to={path.vehicle}>Vehicle</NavPillLink>
            <NavPillLink to={path.battery}>Battery</NavPillLink>
          </div>

          {/* RIGHT: actions (ẩn dần khi hẹp) */}
          <div className='justify-self-end flex items-center gap-2 sm:gap-4'>
            <div className='hidden notification:block'>
              <Popover
                className='flex items-center py-1 cursor-pointer'
                renderProp={<div className='flex flex-col py-2 pr-28 pl-3 text-black'>…</div>}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
                  />
                </svg>
              </Popover>
            </div>

            {/* Tim: hiện từ lg trở lên */}
            <div className='hidden heart:block'>
              <Popover
                className='flex items-center py-1 cursor-pointer'
                renderProp={<div className='flex flex-col py-2 pr-28 pl-3 text-black'>…</div>}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
                  />
                </svg>
              </Popover>
            </div>

            {/* Quản lí tin: chỉ hiện từ 866 trở lên */}
            {isAuthenticated && (
              <Link
                to={path.post}
                className='hidden tablet:inline-block px-4 py-2 rounded-full text-sm border border-black text-black font-medium hover:bg-black/10 transition'
              >
                Quản lí tin
              </Link>
            )}

            {/* Đăng tin: luôn hiện */}
            <Link
              to={path.post}
              className='px-4 py-2 rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition'
            >
              Đăng tin
            </Link>

            {/* Avatar hoặc nút đăng nhập */}
            {isAuthenticated ? (
              <Popover
                className='flex items-center py-1 cursor-pointer'
                renderProp={
                  <div className='relative rounded-sm border border-gray-200 border-t-0 bg-white shadow-md'>
                    <Link to='/profile' className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-50'>
                      Tài khoản của tôi
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block w-full bg-white py-3 px-4 text-left hover:bg-slate-50'
                    >
                      Đăng xuất
                    </button>
                  </div>
                }
              >
                <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
                  <img
                    src={profile?.avatar || 'https://picsum.photos/32'}
                    alt='User'
                    className='size-full object-cover'
                  />
                </div>
              </Popover>
            ) : (
              <Link
                to='/login'
                className='px-4 py-2 rounded-full text-sm bg-black text-white font-medium hover:bg-black/80 transition'
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU (sheet đơn giản) */}
        {openMobile && (
          <div className='md:hidden border-t border-zinc-200'>
            <div className='py-3 flex flex-col gap-2'>
              <Link
                to={path.home}
                onClick={() => setOpenMobile(false)}
                className='px-2 py-2 rounded-lg hover:bg-slate-50'
              >
                Ecovolt
              </Link>

              <Link
                to={path.vehicle}
                onClick={() => setOpenMobile(false)}
                className='px-2 py-2 rounded-lg hover:bg-slate-50'
              >
                Vehicles
              </Link>
              <Link
                to={path.battery}
                onClick={() => setOpenMobile(false)}
                className='px-2 py-2 rounded-lg hover:bg-slate-50'
              >
                Battery
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
