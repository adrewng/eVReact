// src/components/PaymentResultModal.tsx
import { CheckCircle, Clock, Loader2, XCircle } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { paymentApi } from '~/apis/payment.api'
import Modal from '~/components/Modal'
import { path } from '~/constants/path'

type Phase = 'verifying' | 'success' | 'cancelled' | 'pending' | 'error'

export default function PaymentResultModal({
  open,
  onClose,
  search
}: {
  open: boolean
  onClose: () => void
  search: string
}) {
  const sp = useMemo(() => new URLSearchParams(search), [search])
  const navigate = useNavigate()

  const [phase, setPhase] = useState<Phase>('verifying')
  const [note, setNote] = useState('Đang xác minh thanh toán…')
  const [isBusy, setIsBusy] = useState(false) // chặn spam retry

  const verifyCtrlRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAliveRef = useRef(true)

  const next = sp.get('next') || path.home
  const orderCode = sp.get('orderCode') ?? ''
  const statusFromPayOS = (sp.get('status') || '').toUpperCase()
  const isCancel = sp.get('cancel') === 'true'

  const cleanUrl = () => {
    const url = new URL(window.location.href)
    ;['orderCode', 'status', 'cancel', 'code', 'id'].forEach((k) => url.searchParams.delete(k))
    window.history.replaceState({}, '', url.pathname + url.search)
  }

  const finalize = (to: Phase, uiNote: string, toastFn?: () => void) => {
    setPhase(to)
    setNote(uiNote)
    // chờ chút cho user đọc rồi chuyển trang
    timerRef.current = setTimeout(() => {
      cleanUrl()
      navigate(next, { replace: true })
      if (isAliveRef.current && toastFn) toastFn()
      onClose()
    }, 1200)
  }

  const runVerify = async () => {
    if (!orderCode) {
      setPhase('error')
      setNote('Thiếu mã đơn thanh toán.')
      return
    }
    // hủy request cũ + clear timeout cũ trước khi chạy
    verifyCtrlRef.current?.abort()
    if (timerRef.current) clearTimeout(timerRef.current)

    const ctrl = new AbortController()
    verifyCtrlRef.current = ctrl
    setIsBusy(true)
    setPhase('verifying')
    setNote('Đang xác minh thanh toán…')

    try {
      const resp = await paymentApi.verify(orderCode, ctrl.signal)
      const real = String(resp?.data?.data?.status || '').toUpperCase()

      // Ưu tiên trạng thái từ PayOS thực tế
      if (real === 'PAID') {
        finalize('success', 'Thanh toán thành công. Đang chuyển trang…', () => toast.success('Thanh toán thành công'))
        return
      }
      if (real === 'CANCELLED' || isCancel || statusFromPayOS === 'CANCELLED') {
        finalize('cancelled', 'Bạn đã huỷ thanh toán.', () => toast.error('Thanh toán không thành công'))
        return
      }

      // các trạng thái khác coi là pending (PENDING/PROCESSING/UNKNOWN)
      setPhase('pending')
      setNote('Thanh toán chưa hoàn tất. Bạn có thể thử xác minh lại.')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') return
      setPhase('error')
      setNote('Không xác minh được trạng thái thanh toán.')
    } finally {
      setIsBusy(false)
    }
  }

  // chạy verify mỗi lần mở modal hoặc orderCode thay đổi
  useEffect(() => {
    isAliveRef.current = true
    if (open) void runVerify()
    return () => {
      isAliveRef.current = false
      verifyCtrlRef.current?.abort()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orderCode])

  const retry = async () => {
    if (isBusy) return
    await runVerify()
  }

  const closeManually = () => {
    verifyCtrlRef.current?.abort()
    if (timerRef.current) clearTimeout(timerRef.current)
    cleanUrl()
    onClose()
  }

  return (
    <Modal open={open} onClose={closeManually}>
      <Header phase={phase} />
      <p className='mt-2 text-sm text-zinc-600'>{note}</p>

      {orderCode && (
        <div className='mt-4 rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-xs text-zinc-700'>
          <div className='flex justify-between'>
            <span className='font-medium'>Mã đơn</span>
            <span className='font-mono'>{orderCode}</span>
          </div>
          <div className='mt-1 flex justify-between'>
            <span className='font-medium'>Trạng thái hiện tại</span>
            <span className='font-mono uppercase'>{phase}</span>
          </div>
        </div>
      )}

      <div className='mt-6 flex gap-3 justify-end'>
        {(phase === 'pending' || phase === 'error') && (
          <button
            onClick={retry}
            disabled={isBusy}
            className='px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {isBusy ? 'Đang xác minh…' : 'Thử xác minh lại'}
          </button>
        )}
        <button
          onClick={closeManually}
          className='px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition'
        >
          Đóng
        </button>
      </div>
    </Modal>
  )
}

function Header({ phase }: { phase: Phase }) {
  if (phase === 'verifying') {
    return (
      <div className='flex items-center gap-3'>
        <Loader2 className='size-6 animate-spin text-zinc-900' />
        <div>
          <h1 className='text-lg font-semibold'>Đang xác minh thanh toán</h1>
          <p className='text-xs text-zinc-500'>Vui lòng đợi trong giây lát…</p>
        </div>
      </div>
    )
  }
  if (phase === 'success') {
    return (
      <div className='flex items-center gap-3 text-green-600'>
        <CheckCircle className='size-6' />
        <h1 className='text-lg font-semibold'>Thanh toán thành công</h1>
      </div>
    )
  }
  if (phase === 'cancelled') {
    return (
      <div className='flex items-center gap-3 text-zinc-800'>
        <XCircle className='size-6' />
        <h1 className='text-lg font-semibold'>Đã huỷ thanh toán</h1>
      </div>
    )
  }
  if (phase === 'pending') {
    return (
      <div className='flex items-center gap-3 text-amber-600'>
        <Clock className='size-6' />
        <h1 className='text-lg font-semibold'>Thanh toán đang chờ xử lý</h1>
      </div>
    )
  }
  return (
    <div className='flex items-center gap-3 text-red-600'>
      <XCircle className='size-6' />
      <h1 className='text-lg font-semibold'>Có lỗi xảy ra</h1>
    </div>
  )
}

// import { CheckCircle, Clock, Loader2, XCircle } from 'lucide-react'
// import { useEffect, useMemo, useRef, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { paymentApi } from '~/apis/payment.api'

// import Modal from '~/components/Modal'
// import { path } from '~/constants/path'

// type Phase = 'verifying' | 'success' | 'cancelled' | 'pending' | 'error'

// export default function PaymentResultModal({
//   open,
//   onClose,
//   search
// }: {
//   open: boolean
//   onClose: () => void
//   search: string
// }) {
//   const sp = useMemo(() => new URLSearchParams(search), [search])
//   const navigate = useNavigate()

//   const [phase, setPhase] = useState<Phase>('verifying')
//   const [note, setNote] = useState('Đang xác minh thanh toán…')
//   const ran = useRef(false)

//   // controller cho request verify hiện tại
//   const verifyCtrlRef = useRef<AbortController | null>(null)

//   const next = sp.get('next') || path.home
//   const orderCode = sp.get('orderCode') ?? ''
//   const statusFromPayOS = sp.get('status')
//   const isCancel = sp.get('cancel') === 'true'

//   const cleanUrl = () => {
//     const url = new URL(window.location.href)
//     ;['orderCode', 'status', 'cancel', 'code', 'id'].forEach((k) => url.searchParams.delete(k))
//     window.history.replaceState({}, '', url.pathname + url.search)
//   }

//   // Hàm chạy verify với khả năng hủy request cũ
//   const runVerify = async () => {
//     if (!orderCode) {
//       setPhase('error')
//       setNote('Thiếu mã đơn thanh toán.')
//       return
//     }
//     verifyCtrlRef.current?.abort()
//     const ctrl = new AbortController()
//     verifyCtrlRef.current = ctrl
//     try {
//       const data = await paymentApi.verify(orderCode, ctrl.signal as AbortSignal)
//       const real = (data.data.data.status || '').toUpperCase()
//       if (real === 'PAID') {
//         setPhase('success')
//         setNote('Thanh toán thành công. Đang chuyển trang…')
//         setTimeout(() => {
//           cleanUrl()
//           navigate(next, { replace: true })
//           if (!ctrl.signal.aborted) {
//             toast.success('Thanh toán thành công')
//           }
//           onClose()
//         }, 1200)
//         return
//       }
//       if (real === 'CANCELLED' || isCancel || statusFromPayOS === 'CANCELLED') {
//         setPhase('cancelled')
//         setNote('Bạn đã huỷ thanh toán.')
//         setTimeout(() => {
//           cleanUrl()
//           navigate(next, { replace: true })
//           if (!ctrl.signal.aborted) {
//             toast.error('Thanh toán không thành công')
//           }
//           onClose()
//         }, 1200)
//         return
//       }
//       setPhase('pending')
//       setNote('Thanh toán chưa hoàn tất. Bạn có thể thử xác minh lại.')
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err: any) {
//       if (err?.code === 'ERR_CANCELED') return
//       setPhase('error')
//       setNote('Không xác minh được trạng thái thanh toán.')
//     }
//   }

//   useEffect(() => {
//     if (!open || ran.current) return
//     ran.current = true
//     void runVerify()
//     return () => {
//       verifyCtrlRef.current?.abort()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [open])

//   const retry = async () => {
//     setPhase('verifying')
//     setNote('Đang xác minh thanh toán…')
//     await runVerify()
//   }

//   const closeManually = () => {
//     // huỷ request verify đang chạy (nếu có) trước khi đóng
//     verifyCtrlRef.current?.abort()
//     cleanUrl()
//     onClose()
//   }

//   return (
//     <Modal open={open} onClose={closeManually}>
//       <Header phase={phase} />
//       <p className='mt-2 text-sm text-zinc-600'>{note}</p>

//       {orderCode && (
//         <div className='mt-4 rounded-xl bg-zinc-50 border border-zinc-200 p-3 text-xs text-zinc-700'>
//           <div className='flex justify-between'>
//             <span className='font-medium'>Mã đơn</span>
//             <span className='font-mono'>{orderCode}</span>
//           </div>

//           <div className='mt-1 flex justify-between'>
//             <span className='font-medium'>Trạng thái hiện tại</span>
//             <span className='font-mono uppercase'>{phase}</span>
//           </div>
//         </div>
//       )}

//       <div className='mt-6 flex gap-3 justify-end'>
//         {(phase === 'pending' || phase === 'error') && (
//           <button onClick={retry} className='px-4 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition'>
//             Thử xác minh lại
//           </button>
//         )}
//         <button
//           onClick={closeManually}
//           className='px-4 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-50 transition'
//         >
//           Đóng
//         </button>
//       </div>
//     </Modal>
//   )
// }

// function Header({ phase }: { phase: Phase }) {
//   if (phase === 'verifying') {
//     return (
//       <div className='flex items-center gap-3'>
//         <Loader2 className='size-6 animate-spin text-zinc-900' />
//         <div>
//           <h1 className='text-lg font-semibold'>Đang xác minh thanh toán</h1>
//           <p className='text-xs text-zinc-500'>Vui lòng đợi trong giây lát…</p>
//         </div>
//       </div>
//     )
//   }
//   if (phase === 'success') {
//     return (
//       <div className='flex items-center gap-3 text-green-600'>
//         <CheckCircle className='size-6' />
//         <h1 className='text-lg font-semibold'>Thanh toán thành công</h1>
//       </div>
//     )
//   }
//   if (phase === 'cancelled') {
//     return (
//       <div className='flex items-center gap-3 text-zinc-800'>
//         <XCircle className='size-6' />
//         <h1 className='text-lg font-semibold'>Đã huỷ thanh toán</h1>
//       </div>
//     )
//   }
//   if (phase === 'pending') {
//     return (
//       <div className='flex items-center gap-3 text-amber-600'>
//         <Clock className='size-6' />
//         <h1 className='text-lg font-semibold'>Thanh toán đang chờ xử lý</h1>
//       </div>
//     )
//   }
//   return (
//     <div className='flex items-center gap-3 text-red-600'>
//       <XCircle className='size-6' />
//       <h1 className='text-lg font-semibold'>Có lỗi xảy ra</h1>
//     </div>
//   )
// }
