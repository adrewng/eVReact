import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '~/apis/auth.api'
import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import { type ErrorResponse } from '~/types/util.type'
import { schema, type Schema } from '~/utils/rule'
import { isUnprocessableEntityError } from '~/utils/util'

type FormData = Pick<Schema, 'password' | 'email'>
const loginSchema = schema.pick(['password', 'email'])

const LoginPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((body) => {
    loginMutation.mutate(body, {
      onSuccess: () => {
        reset()
        setIsAuthenticated(true)
        navigate('/')
      },

      onError: (error) => {
        if (isUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='min-h-screen bg-gradient-to-br from-zinc-200 via-blue-200 to-indigo-300 text-zinc-900 relative'>
      {/* Background decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Góc trên bên phải */}
        <div className='absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-red-800/30 to-yellow-800/30 rounded-full blur-xl animate-pulse'></div>

        {/* Góc dưới bên trái */}
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-800/30 to-green-800/30 rounded-full blur-xl animate-pulse delay-1000'></div>

        {/* Ở giữa màn hình */}
        <div className='absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-800/20 to-pink-800/20 rounded-full blur-xl animate-pulse delay-500'></div>
      </div>

      <AuthHeader />
      {/* Full screen layout with centered card form */}
      <main className='relative flex items-center justify-center min-h-[calc(100vh-4rem)] px-4'>
        <div className='rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl shadow-black/10 p-8 w-full max-w-md transform hover:scale-102 transition-all duration-500 hover:shadow-3xl'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-zinc-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2'>
              Đăng nhập
            </h1>
            <p className='text-zinc-600'>Chào mừng bạn quay trở lại!</p>
          </div>

          <form className='space-y-6' onSubmit={onSubmit}>
            {/* Email Input */}
            <Input
              label='Email'
              name='email'
              type='email'
              placeholder='Nhập email của bạn'
              errorMsg={errors.email?.message}
              register={register}
            />
            {/* Password Input */}
            <Input
              label='Mật khẩu'
              name='password'
              type='password'
              placeholder='Nhập mật khẩu'
              errorMsg={errors.password?.message}
              register={register}
            />
            {/* Login Button */}
            <Button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white rounded-xl px-4 py-3 font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95 relative overflow-hidden group'
            >
              <span className='relative z-10'>Đăng nhập</span>
              <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            </Button>
          </form>

          {/* Footer Links */}
          <div className='mt-8 text-center space-y-4'>
            <a
              href='#'
              className='text-sm text-zinc-600 hover:text-blue-600 transition-colors duration-300 hover:scale-105 transform inline-block'
            >
              Quên mật khẩu?
            </a>
            <div className='text-sm text-zinc-600'>
              Chưa có tài khoản?{' '}
              <Link
                to={path.register}
                className='text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300 hover:underline'
              >
                Đăng ký ngay
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

export default LoginPage
