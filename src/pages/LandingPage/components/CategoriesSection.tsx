import React from 'react'
import { motion } from 'framer-motion'
import { Battery, Bike, Car, Plug, Settings, Wrench } from 'lucide-react'

export default function CategoriesSection() {
  const categories = [
    { icon: Bike, title: 'Xe máy điện', count: '1,234 tin' },
    { icon: Car, title: 'Ô tô điện', count: '567 tin' },
    { icon: Battery, title: 'Pin xe điện', count: '890 tin' },
    { icon: Wrench, title: 'Phụ kiện', count: '456 tin' },
    { icon: Plug, title: 'Trạm sạc', count: '234 tin' },
    { icon: Settings, title: 'Dịch vụ bảo trì', count: '345 tin' }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Khám phá danh mục</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Tìm kiếm theo danh mục để nhanh chóng tìm được sản phẩm bạn cần
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'>
                <div className='flex items-center gap-4'>
                  <div className='w-16 h-16 rounded-xl bg-neutral-100 flex items-center justify-center'>
                    <category.icon className='w-8 h-8 text-black' />
                  </div>
                  <div>
                    <h3 className='text-xl font-semibold text-neutral-900 mb-1'>{category.title}</h3>
                    <p className='text-sm text-neutral-500'>{category.count}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
