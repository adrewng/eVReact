/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import MainLayout from '~/layouts/MainLayout'
import AllProductList from '~/pages/AllProductList'
import BatteryList from '~/pages/BatteryList'
import Login from '~/pages/Login'
import Post from '~/pages/Post'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'
import VehicleList from '~/pages/VehicleList'

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
        { path: path.vehicle, element: <VehicleList /> },
        { path: path.post, element: <Post /> },
        { path: path.battery, element: <BatteryList /> },
        { path: path.home, index: true, element: <AllProductList /> }
      ]
    }
  ])
  return element
}
