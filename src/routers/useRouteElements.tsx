/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import PhoneRequiredModal from '~/components/PhoneRequiredModal'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import Dashboard from '~/layouts/Dashboard'
import MainLayout from '~/layouts/MainLayout'
import Account from '~/pages/Account/layouts/Account'
import AccountNotification from '~/pages/Account/pages/Notification/AccountNotification'
import AccountPost from '~/pages/Account/pages/Posts/AccountPost'
import AccountProfile from '~/pages/Account/pages/Profile/AccountProfile'
import AllProductList from '~/pages/AllProductList'
import BatteryList from '~/pages/BatteryList'
import Home from '~/pages/Home/Home'
import Login from '~/pages/Login'
import Post from '~/pages/Post'
import PostManagement from '~/pages/PostManagement/PostManagement'
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
function PhoneRequiredWrapper() {
  const { profile } = useContext(AppContext)
  return profile?.phone ? <Outlet /> : <PhoneRequiredModal isOpen={true} />
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
        },
        {
          path: path.post,
          element: <PhoneRequiredWrapper />,
          children: [
            {
              path: path.post,
              element: (
                <MainLayout>
                  <Post />
                </MainLayout>
              )
            }
          ]
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
        {
          path: path.vehicle,
          element: <VehicleList />
        },
        {
          path: path.battery,
          element: <BatteryList />
        },
        {
          path: path.home,
          index: true,
          element: <AllProductList />
        }
      ]
    },
    {
      path: path.account,
      element: <Account />,
      children: [
        { path: path.accountPosts, element: <AccountPost /> },
        { path: path.accountProfile, element: <AccountProfile /> },
        { path: path.accountNotification, element: <AccountNotification /> }
      ]
    },
    {
      path: path.admin,
      element: <Dashboard />,
      children: [
        { path: path.adminDashboard, element: <Home /> },
        { path: path.adminPosts, element: <PostManagement /> }
      ]
    }
  ])
  return element
}
