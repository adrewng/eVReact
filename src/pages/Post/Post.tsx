import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { AddressModal, SelectDropdown } from './components'

interface Category {
  id: string
  name: string
  icon: string
  subcategories?: Category[]
}

// Options for select fields
const brandOptions = [
  { value: 'honda', label: 'Honda' },
  { value: 'yamaha', label: 'Yamaha' },
  { value: 'suzuki', label: 'Suzuki' },
  { value: 'kawasaki', label: 'Kawasaki' },
  { value: 'ducati', label: 'Ducati' },
  { value: 'bmw', label: 'BMW' },
  { value: 'ktm', label: 'KTM' },
  { value: 'triumph', label: 'Triumph' },
  { value: 'harley-davidson', label: 'Harley-Davidson' },
  { value: 'other', label: 'Khác' }
]

const typeOptions = [
  { value: 'scooter', label: 'Xe tay ga' },
  { value: 'sport', label: 'Xe thể thao' },
  { value: 'naked', label: 'Xe naked' },
  { value: 'touring', label: 'Xe touring' },
  { value: 'cruiser', label: 'Xe cruiser' },
  { value: 'adventure', label: 'Xe adventure' },
  { value: 'dirt', label: 'Xe off-road' },
  { value: 'electric', label: 'Xe điện' },
  { value: 'other', label: 'Khác' }
]

const engineOptions = [
  { value: '50cc', label: '50cc' },
  { value: '110cc', label: '110cc' },
  { value: '125cc', label: '125cc' },
  { value: '150cc', label: '150cc' },
  { value: '200cc', label: '200cc' },
  { value: '250cc', label: '250cc' },
  { value: '300cc', label: '300cc' },
  { value: '400cc', label: '400cc' },
  { value: '500cc', label: '500cc' },
  { value: '600cc', label: '600cc' },
  { value: '750cc', label: '750cc' },
  { value: '1000cc', label: '1000cc' },
  { value: '1200cc', label: '1200cc' },
  { value: 'electric', label: 'Điện' },
  { value: 'other', label: 'Khác' }
]

const colorOptions = [
  { value: 'black', label: 'Đen' },
  { value: 'white', label: 'Trắng' },
  { value: 'red', label: 'Đỏ' },
  { value: 'blue', label: 'Xanh dương' },
  { value: 'green', label: 'Xanh lá' },
  { value: 'yellow', label: 'Vàng' },
  { value: 'orange', label: 'Cam' },
  { value: 'purple', label: 'Tím' },
  { value: 'gray', label: 'Xám' },
  { value: 'silver', label: 'Bạc' },
  { value: 'gold', label: 'Vàng kim' },
  { value: 'brown', label: 'Nâu' },
  { value: 'other', label: 'Khác' }
]

const originOptions = [
  { value: 'vietnam', label: 'Việt Nam' },
  { value: 'japan', label: 'Nhật Bản' },
  { value: 'china', label: 'Trung Quốc' },
  { value: 'thailand', label: 'Thái Lan' },
  { value: 'india', label: 'Ấn Độ' },
  { value: 'taiwan', label: 'Đài Loan' },
  { value: 'korea', label: 'Hàn Quốc' },
  { value: 'germany', label: 'Đức' },
  { value: 'italy', label: 'Ý' },
  { value: 'usa', label: 'Mỹ' },
  { value: 'other', label: 'Khác' }
]

const warrantyOptions = [
  { value: 'no-warranty', label: 'Không bảo hành' },
  { value: '1-month', label: '1 tháng' },
  { value: '3-months', label: '3 tháng' },
  { value: '6-months', label: '6 tháng' },
  { value: '1-year', label: '1 năm' },
  { value: '2-years', label: '2 năm' },
  { value: '3-years', label: '3 năm' },
  { value: '5-years', label: '5 năm' },
  { value: 'lifetime', label: 'Bảo hành trọn đời' },
  { value: 'other', label: 'Khác' }
]

const categories: Category[] = [
  {
    id: '1',
    name: 'Bất động sản',
    icon: '🏠',
    subcategories: [
      { id: '1-1', name: 'Nhà đất bán', icon: '🏘️' },
      { id: '1-2', name: 'Nhà đất cho thuê', icon: '🏡' },
      { id: '1-3', name: 'Căn hộ chung cư', icon: '🏢' }
    ]
  },
  {
    id: '2',
    name: 'Xe cộ',
    icon: '🛵',
    subcategories: [
      { id: '2-1', name: 'Xe máy', icon: '🏍️' },
      { id: '2-2', name: 'Xe điện', icon: '🛴' },
      { id: '2-3', name: 'Xe đạp', icon: '🚲' },
      { id: '2-4', name: 'Ô tô', icon: '🚗' }
    ]
  },
  {
    id: '3',
    name: 'Đồ điện tử',
    icon: '💻',
    subcategories: [
      { id: '3-1', name: 'Điện thoại', icon: '📱' },
      { id: '3-2', name: 'Máy tính', icon: '💻' },
      { id: '3-3', name: 'Tivi', icon: '📺' },
      { id: '3-4', name: 'Thiết bị âm thanh', icon: '🔊' }
    ]
  },
  {
    id: '4',
    name: 'Việc làm',
    icon: '💼',
    subcategories: [
      { id: '4-1', name: 'Tuyển dụng', icon: '👔' },
      { id: '4-2', name: 'Tìm việc', icon: '🔍' }
    ]
  },
  {
    id: '5',
    name: 'Dịch vụ chăm sóc nhà cửa',
    icon: '🧹',
    subcategories: [
      { id: '5-1', name: 'Dọn dẹp', icon: '🧽' },
      { id: '5-2', name: 'Sửa chữa', icon: '🔧' },
      { id: '5-3', name: 'Bảo trì', icon: '⚙️' }
    ]
  },
  {
    id: '6',
    name: 'Thú cưng',
    icon: '🐕',
    subcategories: [
      { id: '6-1', name: 'Chó', icon: '🐕' },
      { id: '6-2', name: 'Mèo', icon: '🐱' },
      { id: '6-3', name: 'Chim', icon: '🐦' },
      { id: '6-4', name: 'Cá', icon: '🐠' }
    ]
  },
  {
    id: '7',
    name: 'Đồ ăn, thực phẩm',
    icon: '🍽️',
    subcategories: [
      { id: '7-1', name: 'Thực phẩm tươi', icon: '🥬' },
      { id: '7-2', name: 'Đồ ăn nhanh', icon: '🍔' },
      { id: '7-3', name: 'Đồ uống', icon: '🥤' }
    ]
  },
  {
    id: '8',
    name: 'Tủ lạnh, máy lạnh, máy giặt',
    icon: '❄️',
    subcategories: [
      { id: '8-1', name: 'Tủ lạnh', icon: '🧊' },
      { id: '8-2', name: 'Máy lạnh', icon: '❄️' },
      { id: '8-3', name: 'Máy giặt', icon: '🌊' }
    ]
  },
  {
    id: '9',
    name: 'Đồ gia dụng, nội thất',
    icon: '🛋️',
    subcategories: [
      { id: '9-1', name: 'Nội thất', icon: '🛋️' },
      { id: '9-2', name: 'Đồ gia dụng', icon: '🍳' },
      { id: '9-3', name: 'Cây cảnh', icon: '🌱' }
    ]
  },
  {
    id: '10',
    name: 'Mẹ và bé',
    icon: '👶',
    subcategories: [
      { id: '10-1', name: 'Đồ chơi trẻ em', icon: '🧸' },
      { id: '10-2', name: 'Quần áo trẻ em', icon: '👕' },
      { id: '10-3', name: 'Đồ dùng cho mẹ', icon: '👩' }
    ]
  },
  {
    id: '11',
    name: 'Thời trang, Đồ dùng cá nhân',
    icon: '👕',
    subcategories: [
      { id: '11-1', name: 'Quần áo nam', icon: '👔' },
      { id: '11-2', name: 'Quần áo nữ', icon: '👗' },
      { id: '11-3', name: 'Giày dép', icon: '👟' },
      { id: '11-4', name: 'Phụ kiện', icon: '👜' }
    ]
  }
]

interface PostFormData {
  title: string
  description: string
  price: string
  address: string
  condition: 'new' | 'used'
  brand: string
  type: string
  engine: string
  origin: string
  color: string
  warranty: string
  isFree: boolean
  sellerType: 'personal' | 'professional'
}

const PostPage = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<Category | null>(null)
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState('')
  const [addressTouched, setAddressTouched] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PostFormData>({
    defaultValues: {
      condition: 'used',
      isFree: false,
      sellerType: 'personal'
    }
  })

  const isFree = watch('isFree')

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category)
    if (category.subcategories && category.subcategories.length > 0) {
      setShowSubcategories(true)
    } else {
      setSelectedSubcategory(category)
      setShowCategoryModal(false)
    }
  }

  const handleSubcategorySelect = (subcategory: Category) => {
    setSelectedSubcategory(subcategory)
    setShowCategoryModal(false)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (uploadedImages.length + files.length <= 6) {
      setUploadedImages((prev) => [...prev, ...files])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddressConfirm = (address: string) => {
    console.log('handleAddressConfirm called with:', address)
    setSelectedAddress(address)
    setValue('address', address)
    console.log('selectedAddress updated to:', address)
  }

  const handleAddressClick = () => {
    setAddressTouched(true)
    setShowAddressModal(true)
  }

  const onSubmit = (data: PostFormData) => {
    console.log('Form data:', data)
    console.log('Selected category:', selectedCategory)
    console.log('Selected subcategory:', selectedSubcategory)
    console.log('Uploaded images:', uploadedImages)
  }

  if (showCategoryModal) {
    return (
      <div className='min-h-screen bg-white'>
        {/* Category Selection Modal */}
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-zinc-200'>
            <div className='p-6 border-b border-zinc-200'>
              <h2 className='text-2xl font-bold text-center text-zinc-900'>CHỌN DANH MỤC</h2>
            </div>
            <div className='p-6 max-h-96 overflow-y-auto'>
              <div className='space-y-2'>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className='w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-lg transition-colors border border-transparent hover:border-zinc-200'
                  >
                    <div className='flex items-center space-x-3'>
                      <span className='text-2xl'>{category.icon}</span>
                      <span className='font-medium text-zinc-900'>{category.name}</span>
                    </div>
                    {category.subcategories && (
                      <svg className='w-5 h-5 text-zinc-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Selection */}
        {showSubcategories && selectedCategory && (
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-zinc-200'>
              <div className='p-6 border-b border-zinc-200 flex items-center'>
                <button
                  onClick={() => setShowSubcategories(false)}
                  className='mr-4 p-2 hover:bg-zinc-100 rounded-lg transition-colors'
                >
                  <svg className='w-5 h-5 text-zinc-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                  </svg>
                </button>
                <h2 className='text-2xl font-bold text-zinc-900'>{selectedCategory.name}</h2>
              </div>
              <div className='p-6 max-h-96 overflow-y-auto'>
                <div className='space-y-2'>
                  {selectedCategory.subcategories?.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategorySelect(subcategory)}
                      className='w-full flex items-center justify-between p-4 hover:bg-zinc-50 rounded-lg transition-colors border border-transparent hover:border-zinc-200'
                    >
                      <div className='flex items-center space-x-3'>
                        <span className='text-2xl'>{subcategory.icon}</span>
                        <span className='font-medium text-zinc-900'>{subcategory.name}</span>
                      </div>
                      <svg className='w-5 h-5 text-zinc-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-white text-zinc-900'>
      <div className='max-w-7xl mx-auto p-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column - Images */}
          <div className='space-y-6 lg:col-span-1'>
            <div>
              <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Hình ảnh sản phẩm</h3>

              {/* Image Upload */}
              <div className='space-y-4'>
                {/* Upload Area */}
                <div className='border-2 border-dashed border-zinc-300 rounded-2xl p-6 text-center hover:border-zinc-400 transition-colors bg-zinc-50/50'>
                  <input
                    type='file'
                    multiple
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                    id='image-upload'
                    disabled={uploadedImages.length >= 6}
                  />
                  <label
                    htmlFor='image-upload'
                    className={`cursor-pointer ${uploadedImages.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className='flex flex-col items-center'>
                      <div className='w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4'>
                        <svg className='w-8 h-8 text-zinc-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                          />
                        </svg>
                      </div>
                      <p className='text-sm font-semibold text-zinc-700 mb-1'>
                        {uploadedImages.length >= 6 ? 'Đã đủ 6 hình' : 'Thêm hình ảnh'}
                      </p>
                      <p className='text-xs text-zinc-500'>{uploadedImages.length}/6 hình • Tối đa 6 hình</p>
                    </div>
                  </label>
                </div>

                {/* Display uploaded images */}
                {uploadedImages.length > 0 && (
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-sm font-medium text-zinc-700'>Hình ảnh đã chọn</h4>
                      <span className='text-xs text-zinc-500'>{uploadedImages.length}/6</span>
                    </div>

                    <div className='grid grid-cols-3 gap-2'>
                      {uploadedImages.map((image, index) => (
                        <div key={index} className='relative group'>
                          <div className='aspect-square rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50'>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className='w-full h-full object-cover'
                            />
                          </div>

                          {/* Image number badge */}
                          <div className='absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full font-medium'>
                            {index + 1}
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeImage(index)}
                            className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100'
                          >
                            ×
                          </button>

                          {/* Drag handle */}
                          <div className='absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100'>
                            ⋮⋮
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className='space-y-6 lg:col-span-2'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              {/* Category Display */}
              <div className='bg-zinc-50 p-4 rounded-2xl border border-zinc-200'>
                <label className='block text-sm font-medium text-zinc-700 mb-2'>Danh Mục Tin Đăng</label>
                <div className='flex items-center space-x-2'>
                  <span className='text-2xl'>{selectedSubcategory?.icon}</span>
                  <span className='font-medium text-zinc-900'>{selectedSubcategory?.name}</span>
                  <button
                    type='button'
                    onClick={() => setShowCategoryModal(true)}
                    className='ml-auto text-black hover:text-zinc-600 text-sm font-medium transition-colors'
                  >
                    Thay đổi
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Thông tin chi tiết</h3>

                <div className='space-y-4'>
                  {/* Brand and Type - Row 1 */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <SelectDropdown
                      label='Hãng xe *'
                      name='brand'
                      placeholder='Vui lòng chọn hãng xe'
                      options={brandOptions}
                      errorMsg={errors.brand?.message}
                      register={register}
                      rules={{ required: 'Vui lòng chọn hãng xe' }}
                    />
                    <SelectDropdown
                      label='Loại xe *'
                      name='type'
                      placeholder='Vui lòng chọn loại xe'
                      options={typeOptions}
                      errorMsg={errors.type?.message}
                      register={register}
                      rules={{ required: 'Vui lòng chọn loại xe' }}
                    />
                  </div>

                  {/* Engine and Origin - Row 1 */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <SelectDropdown
                      label='Động cơ'
                      name='engine'
                      placeholder='Vui lòng chọn dung tích động cơ'
                      options={engineOptions}
                      register={register}
                    />
                    <SelectDropdown
                      label='Xuất xứ'
                      name='origin'
                      placeholder='Vui lòng chọn xuất xứ'
                      options={originOptions}
                      register={register}
                    />
                  </div>

                  {/* Color and Warranty - Row 2 */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <SelectDropdown
                      label='Màu sắc'
                      name='color'
                      placeholder='Vui lòng chọn màu sắc'
                      options={colorOptions}
                      register={register}
                    />
                    <SelectDropdown
                      label='Bảo hành'
                      name='warranty'
                      placeholder='Vui lòng chọn thời gian bảo hành'
                      options={warrantyOptions}
                      register={register}
                    />
                  </div>

                  {/* Price */}
                  {!isFree && (
                    <Input
                      label='Giá bán *'
                      name='price'
                      type='number'
                      placeholder='Nhập giá bán'
                      errorMsg={errors.price?.message}
                      register={register}
                      rules={{ required: 'Vui lòng nhập giá bán' }}
                    />
                  )}

                  {/* Address */}
                  <div>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Địa chỉ *</label>
                    <div className='relative'>
                      <input
                        type='text'
                        value={selectedAddress}
                        readOnly
                        placeholder='Chọn địa chỉ'
                        className='w-full px-3 py-2 border border-zinc-300 rounded-lg bg-zinc-50 cursor-pointer focus:ring-2 focus:ring-black focus:border-transparent'
                        onClick={handleAddressClick}
                      />
                      <button
                        type='button'
                        onClick={handleAddressClick}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700'
                      >
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                      </button>
                    </div>
                    {addressTouched && !selectedAddress && (
                      <p className='mt-1 text-xs text-red-600'>Vui lòng chọn địa chỉ</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Title and Description */}
              <div>
                <h3 className='text-lg font-semibold mb-4 text-zinc-900'>Tiêu đề tin đăng và Mô tả chi tiết</h3>

                <div className='space-y-4'>
                  <div>
                    <Input
                      label='Tiêu đề tin đăng *'
                      name='title'
                      placeholder='Nhập tiêu đề tin đăng'
                      errorMsg={errors.title?.message}
                      register={register}
                      rules={{
                        required: 'Vui lòng nhập tiêu đề',
                        maxLength: { value: 50, message: 'Tiêu đề không được quá 50 ký tự' }
                      }}
                    />
                    <p className='text-xs text-zinc-500 mt-1'>{watch('title')?.length || 0}/50 kí tự</p>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-zinc-700 mb-2'>Mô tả chi tiết *</label>
                    <textarea
                      {...register('description', {
                        required: 'Vui lòng nhập mô tả chi tiết',
                        maxLength: { value: 1500, message: 'Mô tả không được quá 1500 ký tự' }
                      })}
                      rows={6}
                      className='w-full px-3 py-2 border border-zinc-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-colors'
                      placeholder='Nhập mô tả chi tiết về sản phẩm...'
                    />
                    <div className='mt-1 text-xs text-zinc-500'>
                      <ul className='list-disc list-inside space-y-1'>
                        <li>Xuất xứ, tình trạng chiếc xe</li>
                        <li>Chính sách bảo hành, bảo trì, đổi trả xe</li>
                        <li>Địa chỉ giao nhận, đổi trả xe</li>
                        <li>Thời gian sử dụng xe</li>
                      </ul>
                    </div>
                    <p className='text-xs text-zinc-500 mt-1'>{watch('description')?.length || 0}/1500 kí tự</p>
                    {errors.description && <p className='text-xs text-red-600 mt-1'>{errors.description.message}</p>}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex space-x-4 pt-6'>
                <Button
                  type='button'
                  className='flex-1 bg-white border border-zinc-300 text-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-50 hover:border-zinc-400 transition-colors'
                >
                  Xem trước
                </Button>
                <Button
                  type='button'
                  className='flex-1 bg-white border border-zinc-300 text-zinc-700 px-6 py-3 rounded-2xl hover:bg-zinc-50 hover:border-zinc-400 transition-colors'
                >
                  Lưu nháp
                </Button>
                <Button
                  type='submit'
                  className='flex-1 bg-black text-white px-6 py-3 rounded-2xl hover:bg-zinc-800 transition-colors'
                >
                  Đăng tin
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onConfirm={handleAddressConfirm}
        currentAddress={selectedAddress}
      />
    </div>
  )
}

export default PostPage
