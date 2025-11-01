import type { PostFormValues, PostFormValuesFileOrUrl } from '~/schemas/post.schema'
import type { PostListTypeConfig } from '~/types/admin/post.type'
import type { PostListType, PostStatus, PostType, ProductListConfig, RelatedPostList } from '~/types/post.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

export const URL_GET_POSTS = 'api/post/get-all-approved'
export const URL_GET_RELATED_POSTS = 'api/related'
export const URL_ADD_POST = 'api/post/create-post'
export const URL_UPDATE_POST = 'api/post/update-post'
export const URL_FAVORITE_POST = '/api/favorites'
export const URL = 'api/post'

const postApi = {
  getPosts(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_GET_POSTS, { params: config })
  },
  addPost(data: PostFormValues) {
    return http.post(URL_ADD_POST, data)
  },
  getPostsByAdmin(params: PostListTypeConfig) {
    return http.get<SuccessResponse<PostListType>>('/api/post/get-all', { params })
  },
  getPostByMe(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>('/api/user/user-posts', { params: config })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponse<PostType>>(`${URL}/${id}`)
  },
  updatePostByAdmin(id: string | number, status: PostStatus, reason?: string) {
    return http.put(`/api/post/update-post-by-admin/${id}`, {
      status,
      ...(reason ? { reason } : {})
    })
  },
  updatePostRejected(data: PostFormValuesFileOrUrl) {
    return http.put(URL_UPDATE_POST, data)
  },
  getRelatedPost(id: string) {
    return http.get<SuccessResponse<RelatedPostList>>(URL_GET_RELATED_POSTS, {
      params: {
        productId: id,
        limit: 3
      }
    })
  },

  // getFavoritePostByUser(_config?: ProductListConfig): Promise<SuccessResponse<PostListType>> {
  //   const payload: SuccessResponse<PostListType> = {
  //     message: 'Lấy danh sách bài viết yêu thích thành công',
  //     data: {
  //       posts: MOCK_FAVORITE_POSTS, // thay [] nếu muốn empty
  //       count: { all: 5 },
  //       pagination: { page: 1, limit: 5, page_size: 1 }
  //     }
  //   }
  //   // mô phỏng network delay
  //   return new Promise((resolve) => setTimeout(() => resolve(payload), 400))
  // },

  getFavoritePostByUser(config: ProductListConfig) {
    return http.get<SuccessResponse<PostListType>>(URL_FAVORITE_POST, { params: config })
  },
  addFavoritePost(id: string | number) {
    return http.post(URL_FAVORITE_POST, {
      id
    })
  },
  deleteFavoritePost(id: number | string) {
    return http.delete(URL_FAVORITE_POST, {
      data: {
        id
      }
    })
  }
}

// ---- 5 bài "tin yêu thích" mẫu
// const MOCK_FAVORITE_POSTS: PostType[] = [
//   {
//     id: 1,
//     allow_resubmit: false,
//     title: 'VinFast VF3 - Xe điện mini đô thị',
//     priority: 1,
//     status: 'approved',
//     end_date: null as any,
//     created_at: '2025-10-20T07:28:00.000Z',
//     favorite_at: '2025-10-26T09:20:00.000Z' as any,
//     updated_at: '2025-10-28T04:35:16.000Z',
//     status_verify: 'unverified' as any,
//     product: {
//       id: 1,
//       brand: 'VinFast',
//       model: 'VF3',
//       price: '350000000.00',
//       description: 'VF3 nhỏ gọn, tiết kiệm, phù hợp đi nội thành.',
//       status: 'approved' as any,
//       year: 2025,
//       warranty: '6',
//       address: 'Hà Nội',
//       color: 'brown',
//       seats: 4,
//       mileage: '5000',
//       power: '200',
//       health: null as any,
//       previousOwners: 1,
//       image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760944584/demo-node-ts/xvvvqyndhd1dk80doijb.jpg',
//       images: ['https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760944584/demo-node-ts/xvvvqyndhd1dk80doijb.jpg'],
//       category: { id: 1, type: 'vehicle' as any, name: 'Electric Car', typeSlug: 'vehicle', count: 0 }
//     } as any,
//     seller: {
//       id: 12,
//       full_name: 'Nhật Trường',
//       email: 'nhatruong5012@gmail.com',
//       phone: '0911973863'
//     } as any
//   },
//   {
//     id: 2,
//     allow_resubmit: false,
//     title: 'YADEA ULike – Xe máy điện đô thị',
//     priority: 1,
//     status: 'auctioning',
//     end_date: '2025-11-05T15:00:00.000Z' as any,
//     created_at: '2025-10-22T10:00:00.000Z',
//     favorite_at: '2025-10-26T10:10:00.000Z' as any,
//     updated_at: '2025-10-27T05:12:00.000Z',
//     status_verify: 'verifying' as any,
//     product: {
//       id: 22,
//       brand: 'YADEA',
//       model: 'ULike',
//       price: '18000000.00',
//       description: 'Xe máy điện gọn nhẹ, phù hợp di chuyển trong phố.',
//       status: 'auctioning' as any,
//       year: 2024,
//       warranty: '12',
//       address: 'TP. Hồ Chí Minh',
//       color: 'white',
//       seats: 2,
//       mileage: '1500',
//       power: '1200',
//       health: null as any,
//       previousOwners: 0,
//       image: 'https://picsum.photos/seed/yadea-ulike/640/360',
//       images: ['https://picsum.photos/seed/yadea-ulike-2/640/360'],
//       category: { id: 1, type: 'vehicle' as any, name: 'Electric Bike', typeSlug: 'vehicle', count: 0 }
//     } as any,
//     seller: { id: 13, full_name: 'An Nguyễn', email: 'an@example.com', phone: '0909000111' } as any
//   },
//   {
//     id: 3,
//     allow_resubmit: false,
//     title: 'Pin LFP 48V 60Ah – Sức khỏe 90%',
//     priority: 1,
//     status: 'approved',
//     end_date: null as any,
//     created_at: '2025-10-21T09:12:00.000Z',
//     favorite_at: '2025-10-26T11:05:00.000Z' as any,
//     updated_at: '2025-10-27T02:40:00.000Z',
//     status_verify: 'verified' as any,
//     product: {
//       id: 301,
//       brand: 'CATL',
//       model: 'LFP-48-60',
//       price: '5200000.00',
//       description: 'Pin LFP an toàn, bền bỉ, phù hợp xe điện 48V.',
//       status: 'approved' as any,
//       year: 2024,
//       warranty: '6',
//       address: 'Bình Dương',
//       color: 'black',
//       capacity: '60',
//       voltage: '48v',
//       health: 'good',
//       previousOwners: 1,
//       image: 'https://picsum.photos/seed/lfp-48v/640/360',
//       images: ['https://picsum.photos/seed/lfp-48v-2/640/360'],
//       category: { id: 5, type: 'battery' as any, name: 'Car Battery', typeSlug: 'battery', count: 0 }
//     } as any,
//     seller: { id: 15, full_name: 'Minh Lê', email: 'minh@example.com', phone: '0901234567' } as any
//   },
//   {
//     id: 4,
//     allow_resubmit: false,
//     title: 'VinFast VF5 Plus – Xe điện cỡ nhỏ',
//     priority: 1,
//     status: 'auctioned',
//     end_date: '2025-10-24T20:00:00.000Z' as any,
//     created_at: '2025-10-20T07:28:00.000Z',
//     favorite_at: '2025-10-24T19:30:00.000Z' as any,
//     updated_at: '2025-10-24T20:10:00.000Z',
//     status_verify: 'unverified' as any,
//     product: {
//       id: 2,
//       brand: 'VinFast',
//       model: 'VF5 Plus',
//       price: '458000000.00',
//       description: 'VF5 Plus năng động, phong cách trẻ trung.',
//       status: 'auctioned' as any,
//       year: 2024,
//       warranty: '6',
//       address: 'TP. Hồ Chí Minh',
//       color: 'orange',
//       seats: 5,
//       mileage: '5000',
//       power: '200',
//       health: null as any,
//       previousOwners: 1,
//       image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760944584/demo-node-ts/dzhfjyuhurxap1lhnciw.webp',
//       images: ['https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760944584/demo-node-ts/dzhfjyuhurxap1lhnciw.webp'],
//       category: { id: 1, type: 'vehicle' as any, name: 'Electric Car', typeSlug: 'vehicle', count: 0 }
//     } as any,
//     seller: { id: 12, full_name: 'Nhật Trường', email: 'nhatruong5012@gmail.com', phone: '0911973863' } as any
//   },
//   {
//     id: 5,
//     allow_resubmit: false,
//     title: 'Pin xe máy GS Yuasa GTZ5S 12V 5Ah – Mới 100%',
//     priority: 1,
//     status: 'sold',
//     end_date: null as any,
//     created_at: '2025-10-23T12:15:00.000Z',
//     favorite_at: '2025-10-27T08:00:00.000Z' as any,
//     updated_at: '2025-10-27T09:00:00.000Z',
//     status_verify: 'unverified' as any,
//     product: {
//       id: 12,
//       brand: 'GS Yuasa',
//       model: 'GTZ5S',
//       price: '1000000.00',
//       description: 'Pin xe máy chính hãng GS Yuasa GTZ5S, dung lượng 5Ah, điện áp 12V. Bảo hành 12 tháng tại cửa hàng.',
//       status: 'sold' as any,
//       year: 2025,
//       color: 'black',
//       warranty: '12',
//       address: 'Đắk Lắk',
//       capacity: '5',
//       voltage: '12v',
//       health: 'excellent',
//       previousOwners: 0,
//       image: 'https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760973788/demo-node-ts/yaexsiayzsiy9d5qmyw6.jpg',
//       images: ['https://res.cloudinary.com/dn2xh5rxe/image/upload/v1760973788/demo-node-ts/yaexsiayzsiy9d5qmyw6.jpg'],
//       category: { id: 6, type: 'battery' as any, name: 'Motorcycle Battery', typeSlug: 'battery', count: 0 }
//     } as any,
//     seller: { id: 18, full_name: 'Quốc Huy', email: 'huy@example.com', phone: '0911000222' } as any
//   }
// ]

export default postApi
