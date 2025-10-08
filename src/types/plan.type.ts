export interface Plan {
  id: number
  name: string
  description: string
  amount: number
  currency: string
  isActive: boolean
  features: string
  userUsageCount: number
}

export interface PlanList {
  version: string
  plans: Plan[]
}
