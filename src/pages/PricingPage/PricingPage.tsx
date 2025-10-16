import React, { useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

interface Package {
  id: string
  name: string
  priceMonthly: number
  priceAnnually: number
  description: string
  features: string[]
  isMostPopular?: boolean
}

interface Question {
  question: string
  answer: string
}

const packages: Package[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 0,
    priceAnnually: 0,
    description: 'Phù hợp cho người mới bắt đầu đăng tin xe điện.',
    features: ['Đăng tối đa 3 tin/tháng', 'Hiển thị cơ bản', 'Báo cáo lượt xem đơn giản']
  },
  {
    id: 'pro',
    name: 'Pro',
    priceMonthly: 199000,
    priceAnnually: 1990000,
    description: 'Dành cho người dùng thường xuyên muốn tăng lượt tiếp cận.',
    features: ['Đăng tối đa 15 tin/tháng', 'Tin nổi bật trên trang chủ', 'Báo cáo chi tiết', 'Hỗ trợ ưu tiên'],
    isMostPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceMonthly: 499000,
    priceAnnually: 4990000,
    description: 'Tối ưu cho đại lý hoặc doanh nghiệp có nhiều tài khoản và tin đăng.',
    features: [
      'Không giới hạn tin đăng',
      'Quản lý nhóm & tài khoản con',
      'Tin ưu tiên trong kết quả tìm kiếm',
      'Báo cáo chuyên sâu & xuất file'
    ]
  }
]

const popularQuestions: Question[] = [
  {
    question: 'Tôi có thể nâng cấp gói sau này không?',
    answer: 'Có, bạn có thể nâng cấp hoặc hạ cấp gói bất kỳ lúc nào trong phần cài đặt tài khoản.'
  },
  {
    question: 'Có hoàn tiền nếu tôi huỷ gói không?',
    answer: 'Chúng tôi hỗ trợ hoàn tiền trong vòng 7 ngày nếu bạn không hài lòng với gói dịch vụ.'
  },
  {
    question: 'Phương thức thanh toán nào được chấp nhận?',
    answer: 'Chúng tôi chấp nhận thẻ ngân hàng, ví điện tử và chuyển khoản.'
  },
  {
    question: 'Tôi có thể chia sẻ gói với người khác không?',
    answer: 'Mỗi tài khoản chỉ áp dụng cho một người dùng, trừ gói Enterprise có hỗ trợ tài khoản con.'
  },
  {
    question: 'Có tự động gia hạn không?',
    answer: 'Không. Bạn sẽ được thông báo trước khi hết hạn để gia hạn thủ công.'
  }
]

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly')

  return (
    <div className='min-h-screen bg-white text-neutral-900 font-inter'>
      <main className='max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8'>
        {/* ===== HEADER ===== */}
        <section className='text-center mb-20'>
          <h1 className='text-5xl font-semibold tracking-tight text-neutral-900'>
            Simple, Transparent <span className='text-black'>Pricing</span>
          </h1>
          <p className='mt-4 text-lg text-neutral-500 max-w-2xl mx-auto'>
            Chọn gói đăng tin phù hợp để lan tỏa thông tin xe điện và pin của bạn một cách hiệu quả nhất.
          </p>
        </section>

        {/* ===== BILLING TOGGLE ===== */}
        <div className='flex justify-center mb-12'>
          <div className='flex items-center bg-neutral-100 rounded-full p-1 shadow-inner'>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === 'monthly' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Theo tháng
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                billingCycle === 'annually' ? 'bg-black text-white shadow-sm' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Theo năm
            </button>
          </div>
        </div>

        {/* ===== PACKAGE CARDS ===== */}
        <section className='grid md:grid-cols-3 gap-8 mb-20'>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                pkg.isMostPopular ? 'border-black' : 'border-neutral-200'
              }`}
            >
              {pkg.isMostPopular && (
                <div className='absolute -top-3 right-6 bg-black text-white text-xs font-semibold py-1 px-3 rounded-full'>
                  Gói nổi bật
                </div>
              )}
              <h2 className='text-2xl font-semibold text-neutral-900'>{pkg.name}</h2>
              <p className='text-neutral-500 mt-2 min-h-[48px]'>{pkg.description}</p>
              <div className='mt-6 flex items-end gap-1'>
                <span className='text-5xl font-bold text-neutral-900'>
                  {billingCycle === 'monthly' ? pkg.priceMonthly.toLocaleString() : pkg.priceAnnually.toLocaleString()}₫
                </span>
                <span className='text-sm text-neutral-400 mb-2'>/{billingCycle === 'monthly' ? 'tháng' : 'năm'}</span>
              </div>
              <button
                className={`mt-8 w-full py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  pkg.isMostPopular
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-neutral-900 text-white hover:bg-neutral-800'
                }`}
              >
                Mua gói này
              </button>
              <ul className='mt-8 space-y-3 text-sm text-neutral-700'>
                {pkg.features.map((f, i) => (
                  <li key={i} className='flex items-center'>
                    <svg
                      className='w-5 h-5 text-black mr-2'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ===== COMPARE SECTION ===== */}

        <section className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-neutral-900'>So sánh các gói</h2>
            <p className='text-neutral-500 mt-2'>Tìm gói phù hợp nhất cho nhu cầu đăng tin của bạn</p>
          </div>

          <div className='overflow-x-auto'>
            <table className='min-w-full border-collapse text-sm'>
              <thead className='bg-neutral-50 text-neutral-700'>
                <tr className='border-b border-neutral-400'>
                  <th className='p-5 text-left font-medium text-neutral-800'>Tính năng</th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className='p-5 text-center font-semibold text-neutral-900 border-l border-neutral-400'
                    >
                      <div>{pkg.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className='text-neutral-700'>
                {[
                  { name: 'Giới hạn tin đăng', values: ['3 tin/tháng', '15 tin/tháng', 'Không giới hạn'] },
                  { name: 'Tin nổi bật', values: ['—', '✔', '✔'] },
                  { name: 'Báo cáo chi tiết', values: ['—', '✔', '✔'] },
                  { name: 'Quản lý nhóm & tài khoản con', values: ['—', '—', '✔'] },
                  { name: 'Hỗ trợ ưu tiên', values: ['—', '✔', '✔'] }
                ].map((row, i) => (
                  <tr key={i} className='border-b border-neutral-400 hover:bg-neutral-50 transition'>
                    <td className='p-4 font-medium text-neutral-800 border-r border-neutral-400'>{row.name}</td>
                    {row.values.map((val, j) => (
                      <td
                        key={j}
                        className={`p-4 text-center ${
                          j !== row.values.length - 1 ? 'border-r border-neutral-400' : ''
                        }`}
                      >
                        {val === '✔' ? (
                          <div className='w-4 h-4 mx-auto flex items-center justify-center rounded-full bg-black'>
                            <svg
                              className='w-2.5 h-2.5 text-white'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                              strokeWidth={3}
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                            </svg>
                          </div>
                        ) : val === '—' ? (
                          <span className='text-neutral-300 text-xl'>—</span>
                        ) : (
                          <span className='text-neutral-700'>{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold text-center mb-10'>Câu hỏi thường gặp</h2>
          <div className='space-y-4'>
            {popularQuestions.map((q, i) => (
              <Disclosure key={i} as='div' className='border border-neutral-200 rounded-xl bg-neutral-50 p-5'>
                {({ open }) => (
                  <>
                    <Disclosure.Button className='flex w-full justify-between items-center text-left font-medium text-neutral-800 hover:text-black'>
                      <span>{q.question}</span>
                      <ChevronUpIcon
                        className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-neutral-400 transition-transform`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter='transition duration-100 ease-out'
                      enterFrom='transform scale-95 opacity-0'
                      enterTo='transform scale-100 opacity-100'
                      leave='transition duration-75 ease-out'
                      leaveFrom='transform scale-100 opacity-100'
                      leaveTo='transform scale-95 opacity-0'
                    >
                      <Disclosure.Panel className='mt-3 text-neutral-600 text-sm'>{q.answer}</Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default PricingPage
