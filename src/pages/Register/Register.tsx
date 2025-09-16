import { Link } from 'react-router-dom'
import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { path } from '~/constants/path'

const RegisterPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-200 via-emerald-200 to-teal-300 text-zinc-900 relative'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Góc trên bên phải */}
        <div className='absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-red-800/30 to-yellow-800/30 rounded-full blur-xl animate-pulse'></div>

        {/* Góc dưới bên trái */}
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-800/30 to-green-800/30 rounded-full blur-xl animate-pulse delay-1000'></div>

        {/* Ở giữa màn hình */}
        <div className='absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-full blur-xl animate-pulse delay-500'></div>
      </div>

      {/* Full screen layout with centered card form */}
      <AuthHeader />
      <main className='relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8'>
        <div className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 p-8 w-full max-w-md transform hover:scale-102 transition-all duration-500 hover:shadow-3xl relative'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-2'>
              Đăng ký
            </h1>
            <p className='text-zinc-600'>Tạo tài khoản mới để bắt đầu</p>
          </div>

          <form className='space-y-6'>
            {/* Họ tên Input */}
            <Input label='Họ và tên' name='fullName' type='text' placeholder='Nhập họ và tên' />

            {/* Số điện thoại Input */}
            <Input label='Số điện thoại' name='phone' type='tel' placeholder='Nhập số điện thoại' />

            {/* Password Input */}
            <Input label='Mật khẩu' name='password' type='password' placeholder='Nhập mật khẩu' />

            {/* Confirm Password Input */}
            <Input label='Xác nhận mật khẩu' name='confirmPassword' type='password' placeholder='Nhập lại mật khẩu' />

            {/* Register Button */}
            <Button
              type='submit'
              className='w-full bg-zinc-900 text-white rounded-xl px-4 py-3 font-medium hover:bg-zinc-800 transition-colors'
            >
              Đăng ký
            </Button>
          </form>

          {/* Footer Links */}
          <div className='mt-6 text-center'>
            <div className='text-sm text-zinc-600'>
              Đã có tài khoản?{' '}
              <Link to={path.login} className='text-zinc-900 font-medium hover:underline'>
                Đăng nhập
              </Link>
            </div>
          </div>
          {/* Decorative elements */}
          <div className='absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-bounce delay-700'></div>
          <div className='absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-bounce delay-1000'></div>
        </div>
      </main>
    </div>
  )
}

export default RegisterPage
