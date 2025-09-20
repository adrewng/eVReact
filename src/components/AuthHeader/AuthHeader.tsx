import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import NavPillLink from '../NavPillLink'

export default function AuthHeader() {
  return (
    <header className='flex items-center justify-between px-4 md:px-8 h-16'>
      <Link to={path.home} className='font-black tracking-wide text-lg'>
        ECOVOLT
      </Link>
      <div className='hidden md:flex gap-6 text-sm'>
        <NavPillLink to={path.home}>Ecovolt</NavPillLink>
        <NavPillLink to={path.vehicle}>Vehicles</NavPillLink>
        <NavPillLink to={path.battery}>Battery</NavPillLink>
      </div>

      <div className='flex items-center gap-4'></div>
    </header>
  )
}
