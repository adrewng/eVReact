export interface Transaction {
  user_id: number
  full_name: string
  email: string
  phone: string
  total_credit: string
  service_type: string
  service_name: string
  description: null
  cost: string
  credits: string
  changing: string
  unit: string
  status: string
  created_at: string
}

export type Transactions = Transaction[]
