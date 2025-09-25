export const CategoryName = {
  vehicle: 'Xe điện',
  battery: 'Pin'
} as const

export type CategoryName = (typeof CategoryName)[keyof typeof CategoryName]
export interface CategoryParent {
  id: number
  name: CategoryName
  count?: number
  has_children?: boolean
}
export interface CategoryChild {
  id: number
  category_id: number
  name: string
  count?: number
}

export interface CategoryDetail {
  id: number
  name: string
  count?: number
  children?: CategoryChild[]
}
