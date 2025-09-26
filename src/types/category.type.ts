export interface CategoryParent {
  id: number
  name: string
  code: string
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
  code: string
  count?: number
  children?: CategoryChild[]
}
