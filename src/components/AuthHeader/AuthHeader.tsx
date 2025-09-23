import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import logoUrl from '~/shared/logo.svg'
import NavPillLink from '../NavPillLink'

export default function AuthHeader() {
  return (
    <div className='grid grid-cols-3 items-center px-4 md:px-8 h-16'>
      {/* Logo bên trái */}
      <Link to={path.home} className='font-black tracking-wide text-xl md:text-2xl'>
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

      {/* Navigation giữa màn hình */}
      <div className='hidden md:flex justify-center gap-6 text-sm md:text-base font-medium'>
        <NavPillLink to={path.home}>Ecovolt</NavPillLink>
        <NavPillLink to={path.vehicle}>Vehicles</NavPillLink>
        <NavPillLink to={path.battery}>Battery</NavPillLink>
      </div>

      {/* Actions bên phải */}
      <div className='flex justify-end items-center gap-4 text-sm md:text-base'>
        {/* Chỗ này thêm nút, avatar, icon... */}
      </div>
    </div>
  )
}
