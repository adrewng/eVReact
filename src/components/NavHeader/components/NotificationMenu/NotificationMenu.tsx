import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check } from 'lucide-react'

import { Link, useNavigate } from 'react-router-dom'
import notificationApi from '~/apis/notification.api'
import { type ToneNotification, notificationConfig } from '~/constants/notification'
import { path } from '~/constants/path'
import type { NavNotificationsData } from '~/types/notification.type'
import { formatUTCDateString, getTimeAgo } from '~/utils/util'

const toneTwMenu: Record<ToneNotification, string> = {
  success: 'text-emerald-600',
  info: 'text-blue-600',
  warning: 'text-amber-600',
  danger: 'text-rose-600'
}

interface Props {
  notificationsData: NavNotificationsData
  // ... các props khác của NavHeader nếu có
}

export default function NotificationMenu({ notificationsData }: Props) {
  const navigate = useNavigate()

  const list = notificationsData?.items ?? []
  const allCount = notificationsData?.allCount ?? 0
  const unread = notificationsData?.unreadCount ?? 0

  const qc = useQueryClient()
  const readAllNotifictionMutation = useMutation({
    mutationKey: ['read-notifications'],
    mutationFn: () => notificationApi.readAllNotification(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notifications'] })
    }
  })
  const handleMarkAllRead = () => {
    readAllNotifictionMutation.mutate()
  }
  return (
    <div className='w-[360px] max-w-[92vw]'>
      <div className='px-4 pt-3 pb-2 border-b border-gray-200 flex items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-sm font-semibold text-gray-900'>Thông báo</span>
          <span className='text-xs text-gray-500'>
            Chưa đọc: <strong>{unread}</strong> · Tất cả: <strong>{allCount}</strong>
          </span>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={notificationsData.isLoading || unread === 0}
          className='inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 disabled:opacity-40'
          title='Đánh dấu tất cả đã đọc'
        >
          <Check size={14} />
          Đánh dấu đã đọc
        </button>
      </div>

      {/* Trạng thái tải */}
      {notificationsData.isLoading ? (
        <div className='px-4 py-6 text-center text-sm text-gray-600'>Đang tải dữ liệu…</div>
      ) : list.length === 0 ? (
        <div className='px-4 py-10 text-center'>
          <div className='text-sm text-gray-600 font-medium mb-1'>Không có thông báo</div>
          <div className='text-xs text-gray-400'>Bạn đã cập nhật đầy đủ mọi thứ.</div>
        </div>
      ) : (
        <>
          {/* Dòng báo refetch nền, không nháy UI */}
          {notificationsData.isFetching && (
            <div className='px-4 pt-2 text-[11px] text-gray-400 text-right'>Đang tải lại…</div>
          )}

          <ul className='max-h-[360px] overflow-auto py-1'>
            {list.map((n) => {
              const { icon: Icon, tone } = notificationConfig[n.type]
              const iconClass = n.isRead ? 'text-gray-500' : toneTwMenu[tone]
              return (
                <li key={n.id}>
                  <button
                    onClick={() => navigate(path.accountNotification)} // chỉnh path theo dự án của bạn
                    className={`w-full px-4 py-3 flex items-start gap-3 text-left hover:bg-gray-50 transition ${
                      n.isRead ? '' : 'bg-blue-50/40'
                    }`}
                  >
                    <div className='mt-0.5'>
                      <Icon size={18} className={iconClass} />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-sm font-medium text-gray-900 line-clamp-1'>{n.title}</span>
                        {!n.isRead && <span className='inline-block w-1.5 h-1.5 rounded-full bg-blue-500' />}
                      </div>
                      <p className='text-xs text-gray-600 mt-0.5 line-clamp-2'>{n.message}</p>
                      {n.postTitle && (
                        <p className='text-[11px] text-gray-500 italic mt-0.5 line-clamp-1'>Bài đăng: {n.postTitle}</p>
                      )}
                      <div className='text-[11px] text-gray-400 mt-1'>
                        {getTimeAgo(formatUTCDateString(n.createdAt))}
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}

      {/* Footer */}
      <div className='px-4 py-2 border-t border-gray-200 bg-white flex items-center justify-between'>
        <Link to={path.accountNotification} className='text-sm text-blue-600 hover:underline'>
          Xem tất cả
        </Link>
        <span className='text-xs text-gray-400'>
          Hiển thị {list.length}/{allCount}
        </span>
      </div>
    </div>
  )
}
