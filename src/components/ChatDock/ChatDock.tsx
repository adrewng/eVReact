import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Minus, Send, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Msg = { id: string; role: 'user' | 'assistant'; text: string }

export default function ChatDock() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { id: 'hello', role: 'assistant', text: 'Chào bạn! Mình có thể giúp gì hôm nay?' }
  ])
  const [draft, setDraft] = useState('')
  const panelRef = useRef<HTMLDivElement | null>(null)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  // Đóng khi bấm ra ngoài + ESC
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onEsc)
    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onEsc)
    }
  }, [open])

  // Gửi tin nhắn (mock)
  const handleSend = () => {
    const text = draft.trim()
    if (!text) return
    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', text }
    setMessages((m) => [...m, userMsg])
    setDraft('')

    // TODO: gọi API AI thật sự ở đây
    const fakeReply: Msg = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: 'Mình đã nhận được: "' + text + '". Bạn muốn lọc theo tiêu chí nào?'
    }
    setTimeout(() => setMessages((m) => [...m, fakeReply]), 300)
  }

  // Portal để nổi trên mọi layout
  const portalRoot = typeof document !== 'undefined' ? document.body : null

  return (
    <>
      {/* Floating Button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'fixed bottom-5 right-5 z-[60]',
          'h-12 w-12 rounded-full shadow-xl border border-black/5',
          'bg-white hover:bg-zinc-50 transition-colors',
          'grid place-items-center'
        )}
        aria-label={open ? 'Đóng chat AI' : 'Mở chat AI'}
      >
        <MessageCircle className='h-5 w-5' />
        <span className='sr-only'>Chat AI</span>
        <span className='absolute -top-1 -right-1 text-[10px] rounded-full px-1.5 py-0.5 bg-black text-white'>AI</span>
      </button>

      {/* Popover / Mini-Modal */}
      {portalRoot &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-[59] pointer-events-none'
              >
                {/* Panel gọn cố định kích thước */}
                <motion.div
                  ref={panelRef}
                  role='dialog'
                  aria-modal='true'
                  initial={{ scale: 0.9, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.98, opacity: 0, y: 6 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className={clsx(
                    'pointer-events-auto',
                    'fixed bottom-20 right-5',
                    // kích thước nhỏ + ràng buộc an toàn trên màn nhỏ
                    'w-[19rem] h-[26rem] max-w-[92vw] max-h-[80vh] flex flex-col',
                    'rounded-2xl shadow-2xl border border-black/5 bg-white overflow-hidden'
                  )}
                >
                  {/* Header */}
                  <div className='flex items-center justify-between px-4 py-2 border-b'>
                    <div className='flex items-center gap-2'>
                      <div className='h-5 w-5 rounded-full bg-gradient-to-tr from-amber-300 to-emerald-300' />
                      <div className='font-medium text-sm'>EViest AI</div>
                    </div>
                    <div className='flex items-center gap-1'>
                      <button
                        onClick={() => setOpen(false)}
                        className='p-1.5 rounded-lg hover:bg-zinc-100'
                        aria-label='Thu nhỏ'
                        title='Thu nhỏ'
                      >
                        <Minus className='h-4 w-4' />
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className='p-1.5 rounded-lg hover:bg-zinc-100'
                        aria-label='Đóng'
                        title='Đóng'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className='px-3 py-3 space-y-2 flex-1 overflow-y-auto'>
                    {messages.map((m) => (
                      <div key={m.id} className={clsx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                        <div
                          className={clsx(
                            'px-3 py-2 rounded-2xl text-sm max-w-[80%] whitespace-pre-wrap',
                            m.role === 'user'
                              ? 'bg-zinc-900 text-white rounded-br-md'
                              : 'bg-zinc-100 text-zinc-900 rounded-bl-md'
                          )}
                        >
                          {m.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <div className='border-t p-2'>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSend()
                      }}
                      className='flex items-center gap-2'
                    >
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder='Hỏi AI điều gì đó...'
                        className='flex-1 rounded-xl border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-zinc-900/10'
                      />
                      <button
                        type='submit'
                        className='inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-sm hover:bg-zinc-50'
                        aria-label='Gửi'
                      >
                        <Send className='h-4 w-4' />
                        Gửi
                      </button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalRoot
        )}
    </>
  )
}
