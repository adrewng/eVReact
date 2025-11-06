'use client'

// import { Zap, Facebook, Linkedin, Mail } from 'lucide-react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import CategoriesSection from './components/CategoriesSection'
// import FeaturedListings from './components/FeaturedListings'
import TestimonialsSection from './components/TestimonialsSection'
import HowItWorks from './components/HowItWorks'
import PricingPreview from './components/PricingPreview'
// import BlogSection from './components/BlogSection'
import FinalCTA from './components/FinalCTA'
import Footer from '~/components/Footer'

// ===== FOOTER =====
// const Footer = () => {
//   return (
//     <footer id='contact' className='bg-neutral-900 text-white'>
//       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
//         <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
//           {/* Brand */}
//           <div>
//             <div className='flex items-center gap-2 mb-4'>
//               <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
//                 <Zap className='w-5 h-5 text-black' />
//               </div>
//               <span className='text-xl font-semibold'>EVTrade</span>
//             </div>
//             <p className='text-sm text-neutral-400'>Nền tảng đăng tin xe điện & pin cũ đáng tin cậy nhất Việt Nam.</p>
//           </div>

//           {/* Giới thiệu */}
//           <div>
//             <h3 className='font-semibold mb-4'>Giới thiệu</h3>
//             <ul className='space-y-3 text-sm'>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Về chúng tôi
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Cách hoạt động
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Tin tức
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Tuyển dụng
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Hỗ trợ */}
//           <div>
//             <h3 className='font-semibold mb-4'>Hỗ trợ</h3>
//             <ul className='space-y-3 text-sm'>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Trung tâm trợ giúp
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Quy định sử dụng
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Chính sách bảo mật
//                 </a>
//               </li>
//               <li>
//                 <a href='#' className='text-neutral-400 hover:text-white transition-colors'>
//                   Điều khoản dịch vụ
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Liên hệ */}
//           <div>
//             <h3 className='font-semibold mb-4'>Liên hệ</h3>
//             <ul className='space-y-3 text-sm'>
//               <li className='text-neutral-400'>Email: support@evtrade.vn</li>
//               <li className='text-neutral-400'>Hotline: 1900 xxxx</li>
//               <li className='text-neutral-400'>Địa chỉ: Hà Nội, Việt Nam</li>
//             </ul>
//             <div className='flex items-center gap-4 mt-6'>
//               <a
//                 href='#'
//                 className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
//               >
//                 <Facebook className='w-5 h-5' />
//               </a>
//               <a
//                 href='#'
//                 className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
//               >
//                 <Linkedin className='w-5 h-5' />
//               </a>
//               <a
//                 href='#'
//                 className='w-10 h-10 rounded-full bg-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-colors'
//               >
//                 <Mail className='w-5 h-5' />
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className='border-t border-white/10 pt-8 text-center text-sm text-neutral-400'>
//           <p>© 2025 Second-hand EV Platform. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   )
// }

// ===== MAIN LANDING PAGE COMPONENT =====
export default function LandingPage() {
  return (
    <div className='min-h-screen bg-white text-neutral-900 font-inter'>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      {/* <FeaturedListings /> */}
      <TestimonialsSection />
      <HowItWorks />
      <PricingPreview />
      {/* <BlogSection /> */}
      <FinalCTA />
      <Footer />
    </div>
  )
}
