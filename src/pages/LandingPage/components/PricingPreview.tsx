// import { motion } from 'framer-motion'
// import { Check } from 'lucide-react'
import VehiclePackage from '~/pages/PricingPage/components/VehiclePackage'

export default function PricingPreview() {
  // const plans = [
  //   {
  //     name: 'Free',
  //     price: '0đ',
  //     period: '/tháng',
  //     features: ['3 tin đăng miễn phí', 'Hiển thị 7 ngày', 'Hỗ trợ cơ bản', 'Tìm kiếm thông thường']
  //   },
  //   {
  //     name: 'Pro',
  //     price: '199.000đ',
  //     period: '/tháng',
  //     features: ['20 tin đăng', 'Hiển thị 30 ngày', 'Ưu tiên hiển thị', 'Hỗ trợ ưu tiên', 'Phân tích chi tiết'],
  //     popular: true
  //   },
  //   {
  //     name: 'Premium',
  //     price: '499.000đ',
  //     period: '/tháng',
  //     features: [
  //       'Không giới hạn tin đăng',
  //       'Hiển thị 60 ngày',
  //       'Top hiển thị',
  //       'Hỗ trợ 24/7',
  //       'Phân tích nâng cao',
  //       'Quản lý nhiều tài khoản'
  //     ]
  //   }
  // ]

  return (
    <section id='pricing' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Chọn gói đăng tin</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Linh hoạt theo nhu cầu của bạn</p>
        </div>

        {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`relative rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? 'border-black' : 'border-neutral-200'
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-3 right-6 bg-black text-white text-xs font-semibold py-1 px-3 rounded-full'>
                    Gói nổi bật
                  </div>
                )}
                <h3 className='text-2xl font-semibold text-neutral-900 mb-2'>{plan.name}</h3>
                <div className='flex items-end gap-1 mb-6'>
                  <span className='text-5xl font-bold text-neutral-900'>{plan.price}</span>
                  <span className='text-sm text-neutral-400 mb-2'>{plan.period}</span>
                </div>
                <button
                  className={`w-full py-3 rounded-xl text-base font-semibold transition-all duration-300 mb-8 ${
                    plan.popular
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }`}
                >
                  Mua gói này
                </button>
                <ul className='space-y-3 text-sm text-neutral-700'>
                  {plan.features.map((feature, i) => (
                    <li key={i} className='flex items-center'>
                      <Check className='w-5 h-5 text-black mr-2 flex-shrink-0' strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div> */}
        <VehiclePackage />
      </div>
    </section>
  )
}
