/* eslint-disable react-refresh/only-export-components */
import { Fragment, useContext } from 'react'
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
import LandingPage from '~/pages/LandingPage/LandingPage'
import Login from '~/pages/Login'
import PageNotFound from '~/pages/PageNotFound'
import Post from '~/pages/Post'
import PostManagement from '~/pages/PostManagement/PostManagement'
import PricingPage from '~/pages/PricingPage/PricingPage'
import Register from '~/pages/Register'
import VehicleList from '~/pages/VehicleList'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} replace />
}

function RejectedRoute() {
  const { isAuthenticated, profile } = useContext(AppContext)
  if (!isAuthenticated) return <Outlet />
  const next = profile?.role === 'admin' ? path.adminDashboard : path.home
  return <Navigate to={next} replace />
}

//Chặn Admin
function RedirectAdminFromPublic() {
  const { profile } = useContext(AppContext)
  return profile?.role === 'admin' ? <Navigate to={path.adminDashboard} replace /> : <Outlet />
}

function PhoneRequiredWrapper() {
  const { profile } = useContext(AppContext)
  return profile?.phone ? <Outlet /> : <PhoneRequiredModal isOpen />
}

function RoleGuard({ role }: { role: 'customer' | 'admin' | 'staff' }) {
  const { profile } = useContext(AppContext)
  if (!profile || profile.role !== role) return <Navigate to={path.home} replace />
  return <Outlet />
}

export default function useRouteElements() {
  const element = useRoutes([
    {
      path: path.home,
      // Chặn admin
      element: <RedirectAdminFromPublic />,
      children: [
        {
          path: path.home,
          element: <MainLayout />,
          children: [
            { index: true, element: <AllProductList /> },
            { path: path.vehicle, element: <VehicleList /> },
            { path: path.battery, element: <BatteryList /> },
            { path: path.pricing, element: <PricingPage /> }
          ]
        }
      ]
    },
    {
      path: path.landingPage,
      // Chặn admin
      element: <RedirectAdminFromPublic />,
      children: [
        {
          path: path.landingPage,
          element: <LandingPage />
        }
      ]
    },
    {
      path: path.home,
      element: <RejectedRoute />,
      children: [
        { path: path.login, element: <Login /> },
        { path: path.register, element: <Register /> }
      ]
    },
    {
      path: path.home,
      element: <ProtectedRoute />,
      children: [
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
        },
        {
          path: path.admin,
          element: <RoleGuard role='admin' />,
          children: [
            {
              element: <Dashboard />, // layout
              children: [
                { index: true, element: <Home /> }, // vào /admin là Home luôn
                { path: 'dashboard', element: <Home /> },
                { path: 'posts', element: <PostManagement /> }
              ]
            }
          ]
        },
        {
          path: path.payment,
          element: <Fragment />
        }
      ]
    },
    {
      path: '*',
      element: <PageNotFound />
    }
  ])
  return element
}
