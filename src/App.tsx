// src/App.tsx
import { useContext, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import PaymentResultModal from '~/components/PaymentResultModal'
import { cleanPayOSParams, isPayOSCallback } from '~/utils/payos'
import { path } from './constants/path'
import { AppContext } from './contexts/app.context'
import useRouteElements from './routers/useRouteElements'
import { LocalStorageEventTarget } from './utils/auth'

function App() {
  const routeElements = useRouteElements()
  const { reset } = useContext(AppContext)
  const { pathname, search } = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => LocalStorageEventTarget.removeEventListener('clearLS', reset)
  }, [reset])

  // ✅ Chỉ mở modal khi: đang ở /payment/result **và** đúng callback PayOS
  useEffect(() => {
    const onPaymentResultPage = pathname === '/payment/result'
    setOpen(onPaymentResultPage && isPayOSCallback(search))
  }, [pathname, search])

  // Cho modal nút Đóng → quay về trang next (nếu có) hoặc '/'
  const handleClose = () => {
    const sp = new URLSearchParams(search)
    const next = sp.get('next') || '/'
    cleanPayOSParams()
    navigate(next, { replace: true })
    setOpen(false)
  }

  // Bổ sung next mặc định nếu BE chưa set (để modal luôn biết về đâu)
  const patchedSearch = useMemo(() => {
    const sp = new URLSearchParams(search)
    if (!sp.get('next')) sp.set('next', path.home)
    return `?${sp.toString()}`
  }, [search])

  return (
    <div>
      {routeElements}
      <ToastContainer />
      <PaymentResultModal open={open} onClose={handleClose} search={patchedSearch} />
    </div>
  )
}

export default App
