import { useState } from 'react'
import {
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Heart,
  Shield,
  Trash2,
  Clock,
  Check
} from 'lucide-react'

type NotificationCategory =
  | 'post_published'
  | 'post_certified'
  | 'post_rejected'
  | 'post_deleted'
  | 'interest'
  | 'message'
  | 'system'

interface Notification {
  id: string
  category: NotificationCategory
  title: string
  message: string
  postTitle?: string
  timestamp: string
  read: boolean
}

const notificationConfig = {
  post_published: { icon: CheckCircle },
  post_certified: { icon: Shield },
  post_rejected: { icon: AlertCircle },
  post_deleted: { icon: XCircle },
  interest: { icon: Heart },
  message: { icon: MessageSquare },
  system: { icon: Bell }
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    category: 'post_published',
    title: 'Post Published',
    message: 'Your listing "Tesla Model 3" has been approved and is now live.',
    postTitle: 'Tesla Model 3 Standard Range Plus',
    timestamp: '2025-10-09T10:30:00',
    read: false
  },
  {
    id: '2',
    category: 'message',
    title: 'New Message Received',
    message: 'You have a new inquiry from a buyer regarding your listing.',
    postTitle: 'Nissan Leaf SV 2019',
    timestamp: '2025-10-09T09:45:00',
    read: true
  },
  {
    id: '3',
    category: 'system',
    title: 'System Update',
    message: 'We’ve improved dashboard performance and added new filters.',
    timestamp: '2025-10-08T14:20:00',
    read: true
  }
]

export default function AccountNotification() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000)
    if (diff < 60) return 'Just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className='flex-1 bg-white min-h-screen p-8 text-gray-900'>
      {/* Header */}
      <div className='flex justify-between items-end border-b border-gray-200 pb-5'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Notifications</h1>
          <p className='text-gray-600'>Stay informed about your posts and system updates</p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className='flex items-center gap-2 text-sm border  border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition disabled:opacity-50'
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className='flex gap-3 mt-6'>
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
            filter === 'all' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
            filter === 'unread' ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notification list */}
      <div className='mt-6 space-y-3'>
        {filtered.length === 0 ? (
          <div className='text-center py-20 border border-gray-200 rounded-lg'>
            <Bell className='w-10 h-10 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-600 font-medium mb-1'>No notifications</p>
            <p className='text-gray-400 text-sm'>You're all caught up for now.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const Icon = notificationConfig[item.category].icon
            return (
              <div
                key={item.id}
                className={`group flex items-start gap-4 p-5 border rounded-xl transition-all hover:shadow-sm ${
                  item.read ? 'border-gray-200 bg-white' : 'border-black/70 bg-gray-50'
                }`}
              >
                {/* Icon */}
                <div className='flex-shrink-0'>
                  <div className='w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center'>
                    <Icon size={18} className='text-gray-700' />
                  </div>
                </div>

                {/* Text */}
                <div className='flex-1 min-w-0'>
                  <div className='flex justify-between'>
                    <h3 className='font-medium text-gray-900'>{item.title}</h3>
                    <div className='flex gap-2 opacity-0 group-hover:opacity-100 transition'>
                      {!item.read && (
                        <button
                          onClick={() => markAsRead(item.id)}
                          className='text-gray-500 hover:text-black transition'
                          title='Mark as read'
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(item.id)}
                        className='text-gray-400 hover:text-black transition'
                        title='Delete'
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 mt-1 leading-snug'>{item.message}</p>
                  {item.postTitle && <p className='text-xs text-gray-500 mt-1 italic'>Post: {item.postTitle}</p>}
                  <div className='flex items-center gap-1 text-xs text-gray-400 mt-2'>
                    <Clock size={12} /> {getTimeAgo(item.timestamp)}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {filtered.length > 0 && (
        <div className='flex justify-center pt-6'>
          <button className='px-5 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition'>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
