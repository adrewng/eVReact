export interface Package {
  cost: string
  description: string
  duration: number
  feature: string
  id: number
  name: string
  number_of_post: number
  number_of_push: number
  number_of_verify: number
  product_type: string
  service_ref: string
  type: string
}

export interface Packages {
  packages: Package[]
}

export interface PackageConfig {
  id: string
  product_type: string
}
