import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { authApi } from '~/apis/auth.api'
import AuthHeader from '~/components/AuthHeader'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { path } from '~/constants/path'
import { AppContext } from '~/contexts/app.context'
import bannerLogin from '~/shared/bannerLogin.png'
import type { ErrorResponse } from '~/types/util.type'
import { schema, type Schema } from '~/utils/rule'
import { isUnprocessableEntityError } from '~/utils/util'

type FormData = Pick<Schema, 'confirm_password' | 'full_name' | 'password' | 'email'>
const registerSchema = schema.pick(['confirm_password', 'password', 'email', 'full_name'])

const RegisterPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })

  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)

  const registerMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password', 'fullName'])
    console.log('body:', body)
    registerMutation.mutate(body as { email: string; password: string }, {
      onSuccess: () => {
        reset()
        setIsAuthenticated(true)
        navigate('/')
      },
      onError: (error) => {
        console.log('error:', error)
        if (isUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password' | 'fullName'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password' | 'fullName'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password' | 'fullName'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='min-h-screen bg-white text-zinc-900 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(37,99,235,0.06),transparent_60%)]'>
      <AuthHeader />
      <main className='flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-10'>
        <section className='relative w-full max-w-5xl overflow-hidden rounded-3xl p-[1px] bg-gradient-to-tr from-blue-200/40 via-indigo-200/30 to-transparent shadow-xl'>
          <div className='grid grid-cols-1 rounded-[calc(1.5rem-1px)] bg-white md:grid-cols-2'>
            <div className='relative hidden md:block'>
              <img
                src={bannerLogin}
                alt='EV banner'
                className='h-full w-full object-cover transition-all duration-200'
                loading='lazy'
              />
            </div>

            <div className='flex flex-col justify-center p-8 md:p-10'>
              <header className='mb-6'>
                <h1 className='text-3xl font-bold leading-tight'>Đăng ký</h1>
                <p className='mt-1 text-sm text-zinc-600'>Tạo tài khoản mới để bắt đầu</p>
              </header>

              {/* Form */}
              <form className='space-y-5' onSubmit={onSubmit} noValidate>
                <Input
                  label='Họ và tên'
                  name='full_name'
                  type='text'
                  placeholder='Nhập họ và tên'
                  errorMsg={errors.full_name?.message}
                  register={register}
                />

                <Input
                  label='Email'
                  name='email'
                  type='email'
                  placeholder='Nhập email của bạn'
                  errorMsg={errors.email?.message}
                  register={register}
                />

                <Input
                  label='Mật khẩu'
                  name='password'
                  type='password'
                  placeholder='Nhập mật khẩu'
                  errorMsg={errors.password?.message}
                  register={register}
                />

                <Input
                  label='Xác nhận mật khẩu'
                  name='confirm_password'
                  type='password'
                  placeholder='Nhập lại mật khẩu'
                  errorMsg={errors.confirm_password?.message}
                  register={register}
                />

                <Button
                  type='submit'
                  disabled={registerMutation.isPending}
                  isLoading={registerMutation.isPending}
                  className='relative w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-[transform,box-shadow,background-color] hover:bg-blue-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/30 active:scale-[0.98] disabled:opacity-70'
                >
                  {registerMutation.isPending ? 'Đang đăng ký' : 'Đăng ký'}
                </Button>
              </form>

              {/* Divider */}
              <div className='relative my-6'>
                <div className='h-px bg-zinc-200' />
                <span className='absolute inset-x-0 -top-3 mx-auto w-max bg-white px-3 text-xs text-zinc-500'>
                  Hoặc
                </span>
              </div>

              {/* Social login (mock UI) */}
              <div className='grid grid-cols-2 gap-3'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50'
                >
                  <img src='https://www.svgrepo.com/show/475656/google-color.svg' alt='' className='h-4 w-4' />
                  Google
                </button>
                <button
                  type='button'
                  className='inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50'
                >
                  <img src='https://www.svgrepo.com/show/452210/apple.svg' alt='' className='h-4 w-4' />
                  Apple
                </button>
              </div>

              {/* Links */}
              <div className='mt-6 space-y-3 text-center text-sm'>
                <div className='text-zinc-600'>
                  Đã có tài khoản?{' '}
                  <Link to={path.login} className='font-semibold text-blue-700 underline-offset-4 hover:underline'>
                    Đăng nhập ngay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RegisterPage
