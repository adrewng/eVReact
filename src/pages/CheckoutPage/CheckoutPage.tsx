import React, { useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { RadioGroup } from '@headlessui/react'
import { CheckCircle2, Wallet, Banknote, Plus } from 'lucide-react'
import useQueryParam from '~/hooks/useQueryParam'
import { useMutation, useQuery } from '@tanstack/react-query'
import packageApi from '~/apis/package.api'
import type { PackageConfig } from '~/types/package.type'
import { AppContext } from '~/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import { isAxiosPaymentRequiredError } from '~/utils/util'

export default function CheckoutPage() {
  const packageQueryParams = useQueryParam()

  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'bank'>('wallet')
  const [isEnoughBalance, setIsEnoughBalance] = useState<boolean>(true)

  const navigate = useNavigate()

  const { profile } = useContext(AppContext)
  console.log('profile -', profile)

  const packageConfig: PackageConfig = {
    id: packageQueryParams.id,
    product_type: packageQueryParams.product_type
  }

  const { data: checkoutPackageData } = useQuery({
    queryKey: ['checkout-package', packageConfig],
    queryFn: () => packageApi.getCheckoutPackage(packageConfig)
  })
  console.log('checkout-pck-data:', checkoutPackageData)

  const checkoutPackage = checkoutPackageData?.data.data.packages[0]
  console.log('checkout-pck: ', checkoutPackage)

  useEffect(() => {
    if (checkoutPackage) {
      const enough = checkoutPackage.user_total_credit >= checkoutPackage.cost
      setIsEnoughBalance(enough)
    }
  }, [checkoutPackage])

  const payPackage = useMutation({
    mutationFn: (payload: { user_id: number; service_id: number }) => packageApi.createPackage(payload)
  })
  const handlePaymentClick = () => {
    const userId = profile?.id
    const serviceId = checkoutPackage?.id

    if (!userId || !serviceId) {
      alert('Thiếu thông tin người dùng hoặc gói dịch vụ.')
      return
    }
    const payload = { user_id: userId, service_id: serviceId }
    console.log('Payload gửi sang API:', payload)

    payPackage.mutate(payload, {
      onSuccess: () => {
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosPaymentRequiredError<{ data: { checkoutUrl: string } }>(error)) {
          const url = error.response?.data?.data?.checkoutUrl
          if (url) {
            window.location.assign(url)
          } else {
            alert('Không thể chuyển đến trang thanh toán.')
          }
        } else {
          alert('Đã có lỗi xảy ra. Vui lòng thử lại.')
        }
      }
    })
  }
  return (
    <div className='min-h-screen bg-neutral-50 text-neutral-900 font-inter py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8'>
        {/* HEADER */}
        <h1 className='text-3xl font-semibold text-center mb-10'>Xác nhận thanh toán</h1>

        {/* SUMMARY */}
        <div className='border rounded-xl p-6 mb-10 bg-neutral-50'>
          <h2 className='text-lg font-semibold mb-4 text-neutral-800'>Thông tin gói đăng tin</h2>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <p className='text-neutral-600'>Tên gói:</p>
            <p className='font-medium'>{checkoutPackage?.name}</p>
            {/* 
            <p className='text-neutral-600'>Chu kỳ thanh toán:</p>
            <p className='font-medium'>{cycle === 'monthly' ? 'Theo tháng' : 'Theo năm'}</p> */}

            <p className='text-neutral-600'>Số lượng:</p>
            <p className='font-medium'>{1}</p>

            <p className='text-neutral-600'>Giá mỗi gói:</p>
            <p className='font-medium'>{Number(checkoutPackage?.cost).toLocaleString('vi-VN')}₫</p>

            <p className='text-neutral-600'>Tổng thanh toán:</p>
            <p className='text-xl font-semibold text-black'>{Number(checkoutPackage?.cost).toLocaleString('vi-VN')}₫</p>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className='mb-10'>
          <h2 className='text-lg font-semibold mb-4 text-neutral-800'>Phương thức thanh toán</h2>

          <RadioGroup value={paymentMethod} onChange={setPaymentMethod} className='space-y-4'>
            <RadioGroup.Option value='wallet'>
              {({ checked }) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between border rounded-xl p-5 cursor-pointer transition ${
                    checked ? 'border-black bg-neutral-100' : 'border-neutral-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <Wallet className='w-5 h-5 text-black' />
                    <span className='font-medium'>Thanh toán bằng số dư ví</span>
                  </div>
                  {checked && <CheckCircle2 className='text-black w-5 h-5' />}
                </motion.div>
              )}
            </RadioGroup.Option>

            <RadioGroup.Option value='bank'>
              {({ checked }) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between border rounded-xl p-5 cursor-pointer transition ${
                    checked ? 'border-black bg-neutral-100' : 'border-neutral-300'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <Banknote className='w-5 h-5 text-black' />
                    <span className='font-medium'>Chuyển khoản ngân hàng</span>
                  </div>
                  {checked && <CheckCircle2 className='text-black w-5 h-5' />}
                </motion.div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>

        {/* WALLET INFO */}
        {paymentMethod === 'wallet' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='border rounded-xl bg-neutral-50 p-6 mb-10'
          >
            <div className='flex justify-between items-center'>
              <p className='text-neutral-700'>Số dư ví hiện tại:</p>
              <p className='font-semibold text-black'>
                {Number(checkoutPackage?.user_total_credit).toLocaleString('vi-VN')}₫
              </p>
            </div>
            {!isEnoughBalance && (
              <div className='mt-4 text-center'>
                <p className='text-sm text-red-500 mb-3'>Số dư không đủ để thanh toán gói này.</p>
                <button
                  onClick={handlePaymentClick} // demo: nạp thêm
                  className='inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition'
                >
                  <Plus className='w-4 h-4' /> Nạp thêm {checkoutPackage?.topup_credit.toLocaleString('vi-VN')}₫
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* CONFIRM BUTTON */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={!paymentMethod || (paymentMethod === 'wallet' && !isEnoughBalance)}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition
    ${
      !paymentMethod || (paymentMethod === 'wallet' && !isEnoughBalance)
        ? 'bg-neutral-300 cursor-not-allowed'
        : 'bg-black text-white hover:bg-neutral-800'
    }`}
          onClick={handlePaymentClick}
        >
          Xác nhận thanh toán
        </motion.button>
      </div>
    </div>
  )
}
