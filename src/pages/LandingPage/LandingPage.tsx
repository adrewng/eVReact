'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Shield,
  Search,
  MessageCircle,
  Car,
  Bike,
  Battery,
  Wrench,
  Plug,
  Settings,
  MapPin,
  Eye,
  Star,
  UserPlus,
  FileText,
  MessageSquare,
  Calendar,
  ArrowRight,
  Check,
  Facebook,
  Linkedin,
  Mail,
  Menu,
  X
} from 'lucide-react'

// ===== HEADER COMPONENT =====
const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <span className='text-2xl font-semibold text-neutral-900'>EVTrade</span>
          </div>

          <nav className='hidden md:flex items-center gap-8'>
            <a href='#features' className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Tính năng
            </a>
            <a href='#listings' className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Tin đăng
            </a>
            <a href='#pricing' className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Bảng giá
            </a>
            <a href='#contact' className='text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Liên hệ
            </a>
          </nav>

          <div className='hidden md:flex items-center gap-3'>
            <button className='px-5 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors'>
              Đăng nhập
            </button>
            <button className='px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-neutral-800 transition-all duration-300'>
              Đăng tin ngay
            </button>
          </div>

          <button className='md:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-white border-t border-neutral-200'>
          <div className='px-4 py-6 space-y-4'>
            <a href='#features' className='block text-sm font-medium text-neutral-700'>
              Tính năng
            </a>
            <a href='#listings' className='block text-sm font-medium text-neutral-700'>
              Tin đăng
            </a>
            <a href='#pricing' className='block text-sm font-medium text-neutral-700'>
              Bảng giá
            </a>
            <a href='#contact' className='block text-sm font-medium text-neutral-700'>
              Liên hệ
            </a>
            <button className='w-full px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold'>
              Đăng tin ngay
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

// ===== HERO SECTION =====
const HeroSection = () => {
  return (
    <section className='min-h-screen flex items-center justify-center bg-white pt-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='text-center max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 mb-8'
          >
            <Zap className='w-4 h-4 text-black' />
            <span className='text-sm font-medium text-neutral-900'>Nền tảng rao vặt EV hàng đầu Việt Nam</span>
          </motion.div>

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
              src='/modern-electric-vehicle-dashboard-interface.jpg'
              alt='EV Platform'
              className='w-full rounded-2xl shadow-2xl border border-neutral-200'
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ===== FEATURES SECTION =====
const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Giao diện dễ dùng',
      description: 'Đăng tin nhanh chóng, chỉ vài bước đơn giản'
    },
    {
      icon: Shield,
      title: 'An toàn & tin cậy',
      description: 'Mỗi người bán đều được xác thực thông tin'
    },
    {
      icon: Search,
      title: 'Tìm kiếm thông minh',
      description: 'Lọc nhanh theo hãng, dung lượng pin, giá cả'
    },
    {
      icon: MessageCircle,
      title: 'Kết nối nhanh',
      description: 'Nhắn tin, gọi điện trực tiếp với người bán'
    }
  ]

  return (
    <section id='features' className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Tại sao chọn chúng tôi?
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Nền tảng được thiết kế để mang lại trải nghiệm tốt nhất cho cả người mua và người bán
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300'>
                <div className='w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center mb-6'>
                  <feature.icon className='w-7 h-7 text-black' />
                </div>
                <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{feature.title}</h3>
                <p className='text-neutral-600'>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== CATEGORIES SECTION =====
const CategoriesSection = () => {
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

// ===== FEATURED LISTINGS SECTION =====
const FeaturedListings = () => {
  const listings = [
    {
      image: '/electric-scooter.png',
      title: 'VinFast Klara S 2022',
      price: '18.500.000đ',
      location: 'Hà Nội',
      views: 234
    },
    {
      image: '/modern-electric-car.jpg',
      title: 'VinFast VF e34 2023',
      price: '550.000.000đ',
      location: 'TP. Hồ Chí Minh',
      views: 567
    },
    {
      image: '/ev-battery-pack.jpg',
      title: 'Pin Lithium 60V 30Ah',
      price: '12.000.000đ',
      location: 'Đà Nẵng',
      views: 189
    },
    {
      image: '/electric-motorcycle.jpg',
      title: 'Yadea S3 Pro 2023',
      price: '22.000.000đ',
      location: 'Hải Phòng',
      views: 345
    },
    {
      image: '/tesla-model-3-sleek-profile.png',
      title: 'Tesla Model 3 2021',
      price: '1.200.000.000đ',
      location: 'Hà Nội',
      views: 892
    },
    {
      image: '/ev-charging-station.jpg',
      title: 'Trạm sạc AC 7kW',
      price: '15.000.000đ',
      location: 'Cần Thơ',
      views: 156
    }
  ]

  return (
    <section id='listings' className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Tin nổi bật</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Những tin đăng mới nhất và được quan tâm nhiều nhất
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {listings.map((listing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'>
                <div className='relative'>
                  <img
                    src={listing.image || '/placeholder.svg'}
                    alt={listing.title}
                    className='w-full h-56 object-cover'
                  />
                  <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1'>
                    <Eye className='w-3 h-3' />
                    <span className='text-xs font-medium'>{listing.views}</span>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-2'>{listing.title}</h3>
                  <p className='text-2xl font-bold text-black mb-3'>{listing.price}</p>
                  <div className='flex items-center gap-2 text-sm text-neutral-500 mb-4'>
                    <MapPin className='w-4 h-4' />
                    <span>{listing.location}</span>
                  </div>
                  <button className='w-full py-3 bg-neutral-900 text-white rounded-xl text-base font-semibold hover:bg-neutral-800 transition-all duration-300'>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <button className='px-8 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-xl text-base font-semibold hover:bg-neutral-50 transition-all duration-300'>
            Xem tất cả tin đăng
          </button>
        </div>
      </div>
    </section>
  )
}

// ===== TESTIMONIALS SECTION =====
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Nguyễn Minh',
      location: 'Hà Nội',
      content: 'Mình bán xe điện cũ chỉ sau 2 ngày đăng tin, rất tiện! Giao diện dễ dùng và có nhiều người quan tâm.',
      rating: 5
    },
    {
      name: 'Trần Hương',
      location: 'TP. Hồ Chí Minh',
      content: 'Tìm được pin xe điện chất lượng với giá tốt. Người bán rất uy tín, giao dịch nhanh gọn.',
      rating: 5
    },
    {
      name: 'Lê Tuấn',
      location: 'Đà Nẵng',
      content: 'Nền tảng chuyên nghiệp, thông tin minh bạch. Đã mua được xe VinFast với giá hợp lý.',
      rating: 5
    }
  ]

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Hàng nghìn giao dịch thành công mỗi tháng</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-neutral-50 rounded-2xl border border-neutral-200 p-8 shadow-sm'>
                <div className='flex gap-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-5 h-5 fill-black text-black' />
                  ))}
                </div>
                <p className='text-neutral-600 mb-6 italic'>"{testimonial.content}"</p>
                <div>
                  <p className='font-semibold text-neutral-900'>{testimonial.name}</p>
                  <p className='text-sm text-neutral-500'>{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ===== HOW IT WORKS SECTION =====
const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Đăng ký tài khoản',
      description: 'Tạo tài khoản miễn phí chỉ trong vài giây'
    },
    {
      icon: FileText,
      title: 'Đăng tin xe hoặc pin',
      description: 'Điền thông tin và đăng tin của bạn'
    },
    {
      icon: MessageSquare,
      title: 'Nhận liên hệ và giao dịch',
      description: 'Kết nối với người mua/bán và hoàn tất giao dịch'
    }
  ]

  return (
    <section className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Cách hoạt động</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Chỉ 3 bước đơn giản để bắt đầu</p>
        </div>

        <div className='max-w-5xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 relative'>
            {/* Connection line */}
            <div className='hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-neutral-200' />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className='relative'
              >
                <div className='flex flex-col items-center text-center'>
                  <div className='w-32 h-32 rounded-full bg-neutral-100 border-4 border-white flex items-center justify-center mb-6 relative z-10'>
                    <step.icon className='w-12 h-12 text-black' />
                  </div>
                  <div className='absolute top-12 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl z-20'>
                    {index + 1}
                  </div>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{step.title}</h3>
                  <p className='text-neutral-600'>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ===== PRICING PREVIEW SECTION =====
const PricingPreview = () => {
  const plans = [
    {
      name: 'Free',
      price: '0đ',
      period: '/tháng',
      features: ['3 tin đăng miễn phí', 'Hiển thị 7 ngày', 'Hỗ trợ cơ bản', 'Tìm kiếm thông thường']
    },
    {
      name: 'Pro',
      price: '199.000đ',
      period: '/tháng',
      features: ['20 tin đăng', 'Hiển thị 30 ngày', 'Ưu tiên hiển thị', 'Hỗ trợ ưu tiên', 'Phân tích chi tiết'],
      popular: true
    },
    {
      name: 'Premium',
      price: '499.000đ',
      period: '/tháng',
      features: [
        'Không giới hạn tin đăng',
        'Hiển thị 60 ngày',
        'Top hiển thị',
        'Hỗ trợ 24/7',
        'Phân tích nâng cao',
        'Quản lý nhiều tài khoản'
      ]
    }
  ]

  return (
    <section id='pricing' className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>Chọn gói đăng tin</h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>Linh hoạt theo nhu cầu của bạn</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
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
        </div>
      </div>
    </section>
  )
}

// ===== BLOG SECTION =====
const BlogSection = () => {
  const posts = [
    {
      image: '/electric-vehicle-buying-guide.jpg',
      title: 'Kinh nghiệm chọn xe điện cũ',
      excerpt: 'Những điều cần lưu ý khi mua xe điện qua sử dụng để đảm bảo chất lượng và giá trị đầu tư.',
      date: '15 Tháng 1, 2025'
    },
    {
      image: '/ev-battery-maintenance.jpg',
      title: 'Bảo dưỡng pin để dùng lâu hơn',
      excerpt: 'Hướng dẫn chi tiết cách bảo dưỡng và kéo dài tuổi thọ pin xe điện hiệu quả.',
      date: '12 Tháng 1, 2025'
    },
    {
      image: '/vietnam-ev-market.jpg',
      title: 'Thị trường EV tại Việt Nam',
      excerpt: 'Phân tích xu hướng và triển vọng phát triển của thị trường xe điện Việt Nam năm 2025.',
      date: '10 Tháng 1, 2025'
    }
  ]

  return (
    <section className='py-20 bg-neutral-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4'>
            Tin tức & Hướng dẫn
          </h2>
          <p className='text-lg text-neutral-500 max-w-2xl mx-auto'>
            Cập nhật kiến thức và xu hướng mới nhất về xe điện
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'>
                <img src={post.image || '/placeholder.svg'} alt={post.title} className='w-full h-56 object-cover' />
                <div className='p-6'>
                  <div className='flex items-center gap-2 text-sm text-neutral-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>{post.date}</span>
                  </div>
                  <h3 className='text-xl font-semibold text-neutral-900 mb-3'>{post.title}</h3>
                  <p className='text-neutral-600 mb-4'>{post.excerpt}</p>
                  <div className='flex items-center gap-2 text-black font-medium'>
                    <span>Đọc thêm</span>
                    <ArrowRight className='w-4 h-4' />
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

// ===== FINAL CTA SECTION =====
const FinalCTA = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='max-w-4xl mx-auto text-center bg-neutral-900 rounded-3xl p-12 sm:p-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8'>
            <Zap className='w-4 h-4 text-white' />
            <span className='text-sm font-medium text-white'>Bắt đầu ngay hôm nay</span>
          </div>

          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6'>
            Sẵn sàng bán xe hoặc pin của bạn ngay hôm nay?
          </h2>

          <p className='text-lg text-neutral-300 mb-10 max-w-2xl mx-auto'>
            Hàng nghìn người mua đang chờ đợi. Đăng tin miễn phí và kết nối ngay!
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <button className='px-8 py-4 bg-white text-black rounded-xl text-base font-semibold hover:bg-neutral-100 transition-all duration-300 flex items-center gap-2'>
              <Zap className='w-5 h-5' />
              Đăng tin ngay
              <ArrowRight className='w-5 h-5' />
            </button>
            <button className='px-8 py-4 bg-transparent text-white border border-white/30 rounded-xl text-base font-semibold hover:bg-white/10 transition-all duration-300'>
              Tìm hiểu thêm
            </button>
          </div>

          <p className='text-sm text-neutral-400 mt-8'>
            Miễn phí đăng ký • Không cần thẻ tín dụng • Hủy bất cứ lúc nào
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ===== FOOTER =====
const Footer = () => {
  return (
    <footer id='contact' className='bg-neutral-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
          {/* Brand */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
                <Zap className='w-5 h-5 text-black' />
              </div>
              <span className='text-xl font-semibold'>EVTrade</span>
            </div>
            <p className='text-sm text-neutral-400'>Nền tảng đăng tin xe điện & pin cũ đáng tin cậy nhất Việt Nam.</p>
          </div>

          {/* Giới thiệu */}
          <div>
            <h3 className='font-semibold mb-4'>Giới thiệu</h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Cách hoạt động
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Tin tức
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h3 className='font-semibold mb-4'>Hỗ trợ</h3>
            <ul className='space-y-3 text-sm'>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Quy định sử dụng
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
                  Điều khoản dịch vụ
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className='font-semibold mb-4'>Liên hệ</h3>
            <ul className='space-y-3 text-sm'>
              <li className='text-neutral-400'>Email: support@evtrade.vn</li>
              <li className='text-neutral-400'>Hotline: 1900 xxxx</li>
              <li className='text-neutral-400'>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
            <div className='flex items-center gap-4 mt-6'>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
              >
                <Facebook className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
              >
                <Linkedin className='w-5 h-5' />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
              >
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>
        </div>

        <div className='border-t border-white/10 pt-8 text-center text-sm text-neutral-400'>
          <p>© 2025 Second-hand EV Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// ===== MAIN LANDING PAGE COMPONENT =====
export default function LandingPage() {
  return (
    <div className='min-h-screen bg-white text-neutral-900 font-inter'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <FeaturedListings />
      <TestimonialsSection />
      <HowItWorks />
      <PricingPreview />
      <BlogSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}
