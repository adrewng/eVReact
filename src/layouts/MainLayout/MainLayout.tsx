import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import NavHeader from '~/components/NavHeader'

interface Props {
  children?: React.ReactNode
}
function MainLayoutInner({ children }: Props) {
  return (
    <div>
      <NavHeader />
      {children}
      <Outlet />
    </div>
  )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
