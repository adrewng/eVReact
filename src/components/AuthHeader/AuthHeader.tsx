import { Link } from 'react-router-dom'
import { path } from '~/constants/path'

export default function AuthHeader() {
  return (
    <header className='sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 h-16'>
      <Link to={path.home} className='font-black tracking-wide text-lg'>
        OPTIMUM
      </Link>
      <nav className='hidden md:flex gap-6 text-sm'>
        <Link to={path.home} className='font-medium text-zinc-900'>
          Booking
        </Link>
        <a href='#' className='text-zinc-600 hover:text-zinc-900'>
          About Us
        </a>
        <a href='#' className='text-zinc-600 hover:text-zinc-900'>
          Support
        </a>
        <a href='#' className='text-zinc-600 hover:text-zinc-900'>
          Terms & Conditions
        </a>
      </nav>
      <div className='flex items-center gap-4'>
        <div className='size-8 rounded-full overflow-hidden ring-1 ring-zinc-200'>
          <img src='https://picsum.photos/32' alt='User' className='size-full object-cover' />
        </div>
      </div>
    </header>
  )
}
