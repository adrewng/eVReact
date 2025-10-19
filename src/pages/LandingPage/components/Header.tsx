import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import logoUrl from '~/shared/logo.svg'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          {/* <div className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <span className='text-2xl font-semibold text-neutral-900'>EVTrade</span>
          </div> */}
          <div className='flex-shrink-0 justify-self-start w-[120px] h-[60px] flex-1'>
            <Link to={path.landingPage} className='inline-flex items-center gap-2'>
              <img
                src={logoUrl}
                alt='EViest'
                className='block select-none object-contain'
                style={{ width: '120px', height: '60px' }}
              />
            </Link>
          </div>

          <nav className='hidden md:flex items-center gap-8 flex-1 justify-center'>
            <Link
              to={path.landingPage}
              className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'
            >
              Tính năng
            </Link>

            <Link to={path.home} className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Tin đăng
            </Link>
            <Link to={path.pricing} className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Gói tin
            </Link>
            <Link
              to={path.landingPage}
              className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'
            >
              Liên hệ
            </Link>
          </nav>

          <div className='hidden md:flex items-center gap-3 flex-1 justify-center'>
            <button className='px-5 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Đăng nhập
            </button>
            <button className='px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-all duration-300'>
              Đăng tin ngay
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
