/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { path } from '~/constants/path'
import Login from '~/pages/Login'
import ProductList from '~/pages/ProductList'
import Profile from '~/pages/Profile'
import Register from '~/pages/Register'

function ProtectedRoute() {
  const { isAuthenticated } = { isAuthenticated: false }
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = { isAuthenticated: false }
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
      index: true,
      element: <ProductList />
    }
  ])
  return element
}
