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
              to={path.auction}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Đấu giá
            </Link>

            <Link
              to={path.home}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Tin đăng
            </Link>
            <Link
              to={path.pricing}
              className={` py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Gói tin
            </Link>
          </nav>

          <div className='hidden md:flex items-center gap-3 flex-1 justify-end'>
            <Link
              to={path.login}
              className={`px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-neutral-800 hover:text-black' : 'text-white hover:text-yellow-400'
              }`}
            >
              Đăng nhập
            </Link>

            <Link
              to={path.post}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                scrolled
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
              }`}
            >
              Đăng tin ngay
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
