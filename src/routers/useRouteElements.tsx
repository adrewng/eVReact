/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import MainLayout from '~/layouts/MainLayout'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import BatteryFilter from '~/pages/ProductList/components/BatteryFilter'
import FilterSidebar from '~/pages/ProductList/components/FilterSidebar'
import VehicleFilter from '~/pages/ProductList/components/VehicleFilter'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElements() {
  const element = useRoutes([
    {
      path: path.home,
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: <Profile />
        }
      ]
    },
    {
      path: path.home,
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        },
        {
          path: path.register,
          element: <Register />
        }
      ]
    },
    {
      path: path.home,
      element: <MainLayout />,
      children: [
        { path: path.vehicle, element: <ProductList Filter={VehicleFilter} /> },
        { path: path.battery, element: <ProductList Filter={BatteryFilter} /> },
        { path: path.home, index: true, element: <ProductList Filter={FilterSidebar} /> }
      ]
    }
  ])
  return element
}
