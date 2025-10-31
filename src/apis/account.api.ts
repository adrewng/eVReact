import type { FeedbackType } from '~/types/feedback.type'
import type { Overview, OverviewConfig } from '~/types/overview.type'
import type { PostOverView } from '~/types/post.type'
import type { BodyUpdateProfile, User } from '~/types/user.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'
import { paginate } from '~/utils/util'

const accountApi = {
  getProfile() {
    return http.get<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/user-detail')
  },
  updateProfile(body: BodyUpdateProfile) {
    const formData = new FormData()
    formData.append('full_name', body.full_name)
    formData.append('email', body.email)
    formData.append('gender', body.gender)
    formData.append('phone', body.phone)
    formData.append('address', body.address)
    formData.append('description', body.description)
    if (body.avatar) {
      formData.append('avatar', body.avatar)
    }
    return http.put<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateAvatar(formData: FormData) {
    return http.put<SuccessResponse<{ user: User; refresh_token: string }>>('/api/user/update-user', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  updateNewPassword(newPassword: string) {
    return http.put('/api/user/change-password', { newPassword })
  },

  getInfoUser(_id: number | string, config: OverviewConfig): Promise<SuccessResponse<Overview>> {
    console.log('Config: ', config)
    const { type, page = 1, limit = 10 } = config
    return new Promise((resolve) => {
      setTimeout(() => {
        let data: SuccessResponse<Overview>

        if (type === 'feedback') {
          const { items, meta } = paginate(feedbacks, Number(page), Number(limit))
          data = {
            message: 'Lấy dữ liệu người bán + feedbacks thành công',
            data: {
              overview: { seller, feedbacks: items },
              pagination: meta
            }
          }
        } else if (type === 'post') {
          const { items, meta } = paginate(posts, Number(page), Number(limit))
          data = {
            message: 'Lấy dữ liệu người bán + posts thành công',
            data: {
              overview: { seller, posts: items },
              pagination: meta
            }
          }
        } else {
          data = {
            message: 'Lấy thông tin người bán thành công',
            data: {
              overview: { seller },
              pagination: { page: 1, limit: 0, page_size: 1 }
            }
          }
        }
        resolve(data)
      }, 4000)
    })
  }
}
const seller: User = {
  id: 1,
  full_name: 'Nguyễn Văn A',
  avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23000000',
  phone: '0912345678',
  email: 'nguyenvana@example.com',
  address: 'Quận 1, TP. Hồ Chí Minh',
  gender: 'Nam',
  description:
    'Chuyên cung cấp xe ô tô chính hãng với 5 năm kinh nghiệm. Cam kết chất lượng, giá cả minh bạch và dịch vụ hậu mãi tốt nhất.',
  role: 'seller',
  createdAt: '2023-03-15T00:00:00.000Z',
  rating: 4.8,
  totalCredit: '50000000',
  verificationStatus: true,
  isVerify: true,
  status: 'active',
  totalPosts: 42,
  totalActivePosts: 40,
  totalSoldPosts: 20,
  totalTransactions: 89
}

const feedbacks: FeedbackType[] = [
  {
    id: 1,
    title: 'Xe đẹp, giao dịch nhanh gọn',
    text: 'Seller rất chuyên nghiệp, xe đúng như mô tả. Giao dịch nhanh chóng, không phiền phức. Sẽ mua lại lần nữa.',
    start: 5,
    createdAt: '2025-10-29T00:00:00.000Z',
    user: {
      id: 101,
      full_name: 'Trần Thị B',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23666666'
    } as User
  },
  {
    id: 2,
    title: 'Rất hài lòng với dịch vụ',
    text: 'Seller tư vấn rất kỹ, giúp tôi chọn được chiếc xe phù hợp. Giá cả hợp lý, chất lượng tốt.',
    start: 5,
    createdAt: '2025-10-24T00:00:00.000Z',
    user: {
      id: 102,
      full_name: 'Lê Văn C',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23444444'
    } as User
  },
  {
    id: 3,
    title: 'Tốt nhưng có thể tốt hơn',
    text: 'Xe chất lượng tốt, nhưng thời gian giao hàng hơi lâu. Nhân viên tư vấn rất tốt.',
    start: 4,
    createdAt: '2025-10-17T00:00:00.000Z',
    user: {
      id: 103,
      full_name: 'Phạm Minh D',
      avatar: 'https://api.iconify.design/solar:user-bold.svg?color=%23888888'
    } as User
  }
]

const posts: PostOverView[] = [
  {
    id: 29,
    title: 'Demo xe VF3',
    product: {
      price: '500000.00',
      image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1761793148/demo-node-ts/hsyayzbycibcyghtzhja.jpg'
    }
  },
  {
    id: 3,
    title: 'VinFast VF6 - Crossover điện 5 chỗ',
    product: {
      price: '675000000.00',
      image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760944583/demo-node-ts/vv4lnd0v9wjxwhohjq5z.webp'
    }
  }
]

export const response: SuccessResponse<{
  seller: User
  feedback: FeedbackType[]
  posts: PostOverView[]
}> = {
  message: 'Lấy dữ liệu người bán thành công',
  data: { seller, feedback: feedbacks, posts }
}

export default accountApi
