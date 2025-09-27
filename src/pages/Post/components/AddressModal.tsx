import { useState } from 'react'
import { useAddress } from '~/hooks/useAddress'

interface AddressData {
  provinceCode: number
  provinceName: string
  wardName: string
  wardCode: number
  specificAddress: string
}

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (address: string) => void
}

export default function AddressModal({ isOpen, onClose, onConfirm }: AddressModalProps) {
  const [addressData, setAddressData] = useState<AddressData>({
    provinceCode: -1,
    provinceName: '',
    wardName: '',
    wardCode: -1,
    specificAddress: ''
  })

  const { provinces, wards, loading, error, loadWards } = useAddress()

  const handleProvinceChange = async (provinceCode: string) => {
    const provinceCodeNum = parseInt(provinceCode)
    const selectedProvince = provinces.find((p) => p.code === provinceCodeNum)
    setAddressData({
      provinceCode: provinceCodeNum,
      provinceName: selectedProvince?.name || '',
      wardName: '',
      wardCode: 0,
      specificAddress: addressData.specificAddress
    })
    if (provinceCode) {
      await loadWards(provinceCodeNum)
    }
  }

  const handleWardChange = (wardCode: string) => {
    const wardCodeNum = parseInt(wardCode)
    const selectedWard = wards.find((w) => w.code === wardCodeNum)
    setAddressData((prev) => ({
      ...prev,
      wardCode: wardCodeNum,
      wardName: selectedWard?.name || ''
    }))
  }

  const handleSpecificAddressChange = (specificAddress: string) => {
    setAddressData((prev) => ({
      ...prev,
      specificAddress
    }))
  }

  const handleConfirm = () => {
    // Use stored names from state
    const addressParts = []

    if (addressData.specificAddress?.trim()) {
      addressParts.push(addressData.specificAddress.trim())
    }

    if (addressData.wardName) {
      addressParts.push(addressData.wardName)
    }

    if (addressData.provinceName) {
      addressParts.push(addressData.provinceName)
    }

    const fullAddress = addressParts.join(', ')

    if (fullAddress.trim()) {
      onConfirm(fullAddress)
      onClose()
    } else {
      console.error('No address generated!')
    }
  }

  const isFormValid = addressData.provinceCode > 0 && addressData.wardCode > 0

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md mx-4'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold text-zinc-900'>Địa chỉ</h3>
          <button onClick={onClose} className='p-2 hover:bg-zinc-100 rounded-lg transition-colors'>
            <svg className='w-5 h-5 text-zinc-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        {/* Form */}
        <div className='space-y-4'>
          {/* Province */}
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-2'>Tỉnh, thành phố *</label>
            <select
              value={addressData.provinceCode}
              onChange={(e) => handleProvinceChange(e.target.value)}
              disabled={loading}
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-zinc-100 disabled:cursor-not-allowed'
            >
              <option value=''>Chọn tỉnh/thành phố</option>
              {provinces.map((province) => (
                <option key={province.code} value={province.code}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-2'>Phường, xã, thị trấn *</label>
            <select
              value={addressData.wardCode}
              onChange={(e) => handleWardChange(e.target.value)}
              disabled={!addressData.provinceCode || loading}
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-zinc-100 disabled:cursor-not-allowed'
            >
              <option value=''>Chọn phường/xã</option>
              {wards.map((ward) => (
                <option key={ward.code} value={ward.code}>
                  {ward.name}
                </option>
              ))}
            </select>
          </div>

          {/* Specific Address */}
          <div>
            <label className='block text-sm font-medium text-zinc-700 mb-2'>Địa chỉ cụ thể</label>
            <input
              type='text'
              value={addressData.specificAddress}
              onChange={(e) => handleSpecificAddressChange(e.target.value)}
              placeholder='Địa chỉ cụ thể'
              className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex justify-end mt-6'>
          <button
            onClick={handleConfirm}
            disabled={!isFormValid || loading}
            className='px-6 py-2 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed transition-colors flex items-center space-x-2'
          >
            {loading && (
              <svg className='animate-spin h-4 w-4' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            )}
            <span>XONG</span>
          </button>
        </div>
      </div>
    </div>
  )
}
