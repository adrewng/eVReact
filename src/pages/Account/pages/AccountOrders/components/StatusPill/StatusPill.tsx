import { CheckCircle, ClipboardList, Loader2, RefreshCcw, Truck, X } from 'lucide-react'
import { ORDERSTATUS } from '~/constants/order'

export function StatusPill({ status }: { status: keyof typeof ORDERSTATUS }) {
  const m = ORDERSTATUS[status]
  return (
    <span className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-medium ring-1 ${m.className}`}>
      {status === 'awaiting_payment' && <ClipboardList className='h-3.5 w-3.5' />}
      {status === 'processing' && <Loader2 className='h-3.5 w-3.5 animate-spin-slow' />}
      {status === 'shipping' && <Truck className='h-3.5 w-3.5' />}
      {status === 'delivered' && <CheckCircle className='h-3.5 w-3.5' />}
      {status === 'cancelled' && <X className='h-3.5 w-3.5' />}
      {status === 'refund' && <RefreshCcw className='h-3.5 w-3.5' />}
      {m.label}
    </span>
  )
}
