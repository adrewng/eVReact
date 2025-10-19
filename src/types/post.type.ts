import type { CategoryChild, CategoryType } from './category.type'
import type { User } from './user.type'

export interface PostType {
  id: number
  title: string
  priority: number
  created_at: string
  updated_at: string
  product: VehicleType | BatteryType
  end_date?: string
  seller?: User
  reviewer?: User
  reviewed_by?: string
  ai?: {
    min_price: number
    max_price: number
  }
}

export interface VehicleType {
  id: number
  brand: string
  model: string
  power: string // công suất (W, kW…)
  price: string
  address: string
  description: string
  category: CategoryChild
  mileage: string // số km đã đi
  year: number // đời xe
  seats: number // số chỗ ngồi
  image: string // ảnh bìa
  images: string[] // danh sách ảnh chi tiết,
  warranty: string // bảo hành
  color: string // màu sắc,
  health: string
  previousOwners?: number
}

export interface BatteryType {
  id: number
  brand: string
  model: string
  capacity: string
  price: string
  address: string
  description: string
  category: CategoryChild
  voltage: string // điện áp (V)
  health: string // tình trạng pin
  year: number
  image: string
  images: string[]
  warranty: string // bảo hành
  color: string // màu sắc
  previousOwners?: number
}

export interface PostListType {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
  count?: {
    all: number
    pending: number
    approved: number
    rejected: number
    unverified: number
    verifying: number
    verified: number
  }
}

export type PostStatus = 'pending' | 'approved' | 'rejected' | 'verifying' | 'verified' | 'unverified'
export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  color?: string
  title?: string
  warranty?: string
  sort_by?: 'recommend' | 'price' | 'created_at'
  order?: 'asc' | 'desc'
  exclude?: string
  power?: string
  mileage?: string
  seat?: string
  health?: string
  voltage?: string
  capacity?: string
  price_max?: number | string
  price_min?: number | string
  category_type?: Omit<CategoryType, 'notFound' | 'all'>
  category_id?: string
  status?: Extract<PostStatus, 'pending' | 'approved' | 'rejected'> | 'all'
  status_verify?: Extract<PostStatus, 'verifying' | 'verified' | 'unverified'>
}
