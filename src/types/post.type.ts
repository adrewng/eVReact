import type { CategoryDetail } from './category.type'

export interface PostType {
  id: number
  title: string
  priority: number
  created_at: string
  updated_at: string
  product: VehicleType | BatteryType
}

export interface VehicleType {
  id: number
  brand: string
  model: string
  power: number // công suất (W, kW…)
  price: number
  address: string
  description: string
  category: CategoryDetail
  mileage: number // số km đã đi
  year: number // đời xe
  seats: number // số chỗ ngồi
  image: string // ảnh bìa
  images: string[] // danh sách ảnh chi tiết
}

export interface BatteryType {
  id: number
  brand: string
  model: string
  capacity: number
  price: number
  address: string
  description: string
  category: CategoryDetail
  voltage: number // điện áp (V)
  health: string // tình trạng pin
  year: number
  image: string
  images: string[]
}

export interface PostListType {
  posts: PostType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
  category_detail_id?: string
}
