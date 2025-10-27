import { CheckCircle, ClipboardList, Loader2, RefreshCcw, Truck, X } from 'lucide-react'
import { ORDERSTATUS, type OrderStatus } from '~/constants/order'

const STATUS_ICON: Record<OrderStatus, React.ComponentType<{ className?: string }>> = {
  PENDING: ClipboardList,
  PROCESSING: Loader2,
  VERIFYING: ClipboardList,
  SUCCESS: CheckCircle,
  FAILED: X,
  CANCELLED: X,
  REFUND: RefreshCcw,
  AUCTION_PROCESSING: Truck,
  AUCTION_SUCCESS: CheckCircle,
  AUCTION_FAILED: X
}

export function StatusPill({ status }: { status: OrderStatus }) {
  const meta = ORDERSTATUS[status]
  const Icon = STATUS_ICON[status]

  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-medium ring-1',
        meta.className
      ].join(' ')}
      title={meta.label}
    >
      <Icon className={`h-3.5 w-3.5 ${status === 'PROCESSING' ? 'animate-spin-slow' : ''}`} />
      {meta.label}
    </span>
  )
}
