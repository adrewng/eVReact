import { ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import page_not_found from '../../../assets/page_not_found.jpg'
export default function HeroSection() {
  return (
    <section className='min-h-screen flex items-center justify-center bg-white pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center max-w-4xl mx-auto'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 mb-6'
          >
            Nền tảng đăng tin xe điện & pin cũ <span className='text-black'>đáng tin cậy nhất</span> Việt Nam
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='text-lg text-neutral-500 mb-10 max-w-3xl mx-auto'
          >
            Kết nối người mua và người bán xe điện & pin qua sử dụng một cách nhanh chóng, minh bạch và tiện lợi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4'
          >
            <button className='px-8 py-4 bg-black text-white rounded-xl text-base font-semibold hover:bg-neutral-800 transition-all duration-300 flex items-center gap-2'>
              <Zap className='w-5 h-5' />
              Đăng tin ngay
              <ArrowRight className='w-5 h-5' />
            </button>
            <button className='px-8 py-4 bg-white text-neutral-900 border border-neutral-300 rounded-xl text-base font-semibold hover:bg-neutral-50 transition-all duration-300'>
              Xem tin mới nhất
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='mt-16'
          >
            <img
              src={page_not_found}
              alt='EV Platform'
              className='w-full rounded-2xl shadow-2xl border border-neutral-200'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
