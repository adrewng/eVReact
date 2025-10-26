export interface User {
  id: number
  email?: string
  full_name: string
  role?: string
  reputation?: number
  totalCredit?: string
  status?: string
  phone?: string
  avatar?: string
  date_Of_birth?: string
  address?: string
  cccd?: string
  createdAt?: string
  updateAt?: string
  isVerify?: boolean
  gender?: string
  balance?: number
  verificationStatus?: string
  total_posts?: number
  total_transactions?: number
  recentTransactions?: {
    description: string
    date: string
    amount: number
  }[]
  paymentMethod?: {
    cardType: string
    cardHolder: string
    cardNumber: string
    expiry: string
    balance: number
  }
}

export interface ProfileData {
  user: {
    full_name: string
    dateOfBirth: string
    gender: string
    address: string
    avatar: string
    email: string
    phone: string
    balance: number
    verificationStatus: string
    total_posts: number
    total_transactions: number
    total_credit: string

    recentTransactions: {
      description: string
      date: string
      amount: number
    }[]
    paymentMethod: {
      cardType: string
      cardHolder: string
      cardNumber: string
      expiry: string
      balance: number
    }
  }
  refresh_token: string
}

export interface BodyUpdateProfile {
  email: string
  avatar: string
  full_name: string
  phone: string
  gender: string
  dateOfBirth: string
  address: string
}
