import type { AuctionType, Participation } from '~/types/auction.type'
import type { SuccessResponse } from '~/types/util.type'
import http from '~/utils/http'

const URL_CREATE_AUCTION_REQUEST = 'api/payment/auction-fee'
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const auctionApi = {
  createAuctionRequest(body: AuctionType) {
    return http.post<SuccessResponse<AuctionType>>(URL_CREATE_AUCTION_REQUEST, body)
  },
  async getMySessions() {
    await delay(200)
    return { data: { data: DEMO_MY_SESSIONS } }
  },
  async getMyParticipations() {
    await delay(200)
    return { data: { data: DEMO_PARTICIPATIONS } }
  }
}

// ===== MOCK DATA
const now = Date.now()
const h = (n: number) => 3600_000 * n
const iso = (t: number) => new Date(t).toISOString()

export const DEMO_MY_SESSIONS: AuctionType[] = [
  // DRAFT: phiên đang soạn, chưa public
  {
    id: 91000,
    product_id: 4001,
    title: 'Yamaha Sirius 2018 (Bản nháp)',
    start_at: undefined,
    end_at: undefined,
    status: 'DRAFT',
    startingBid: 9_000_000,
    original_price: 12_000_000,
    buyNowPrice: 0,
    bidIncrement: 100_000,
    deposit: 300_000,
    currentPrice: null,
    bid_count: 0,
    note: 'Chưa đủ ảnh, chờ bổ sung hồ sơ'
  },
  {
    id: 91001,
    product_id: 5001,
    title: 'Honda SH 150i ABS 2021',
    start_at: iso(now - h(1)),
    end_at: iso(now + h(3)),
    status: 'LIVE',
    startingBid: 70_000_000,
    original_price: 85_000_000,
    buyNowPrice: 90_000_000,
    bidIncrement: 500_000,
    deposit: 1_000_000,
    currentPrice: 81_500_000,
    bid_count: 23
  },
  {
    id: 91002,
    product_id: 5002,
    title: 'Yamaha Grande 125cc – 2020',
    start_at: iso(now + h(5)),
    end_at: iso(now + h(9)),
    status: 'SCHEDULED',
    startingBid: 18_000_000,
    original_price: 24_500_000,
    buyNowPrice: 24_500_000,
    bidIncrement: 200_000,
    deposit: 500_000
  },
  {
    id: 91003,
    product_id: 5003,
    title: 'VinFast Feliz S 2023 – đi 3.000km',
    start_at: iso(now - h(6)),
    end_at: iso(now - h(2)),
    status: 'ENDED',
    startingBid: 9_500_000,
    original_price: 12_000_000,
    buyNowPrice: 0,
    bidIncrement: 100_000,
    deposit: 300_000,
    currentPrice: 12_100_000,
    bid_count: 41
  },
  {
    id: 91004,
    product_id: 5004,
    title: 'iPhone 13 128GB',
    start_at: iso(now - h(3)),
    end_at: iso(now - h(1)),
    status: 'CANCELLED',
    startingBid: 9_000_000,
    original_price: 11_000_000,
    buyNowPrice: 0,
    bidIncrement: 100_000,
    deposit: 500_000
  }
]

export const DEMO_PARTICIPATIONS: Participation[] = [
  {
    session: {
      id: 92001,
      product_id: 6001,
      title: 'Honda Winner X 2022',
      start_at: iso(now - h(0.5)),
      end_at: iso(now + h(2.5)),
      status: 'LIVE',
      startingBid: 22_000_000,
      original_price: 27_000_000,
      buyNowPrice: 0,
      bidIncrement: 200_000,
      deposit: 500_000,
      currentPrice: 25_600_000,
      bid_count: 19,
      myTopBid: 25_400_000 // moved vào session theo type mới
    },
    result: 'PENDING'
  },
  {
    session: {
      id: 92002,
      product_id: 6002,
      title: 'ThinkPad X1 Carbon Gen 9',
      start_at: iso(now + h(6)),
      end_at: iso(now + h(10)),
      status: 'SCHEDULED',
      startingBid: 12_000_000,
      original_price: 18_000_000,
      buyNowPrice: 0,
      bidIncrement: 200_000,
      deposit: 1_000_000
      // myTopBid: undefined
    },
    result: 'PENDING'
  },
  {
    session: {
      id: 92003,
      product_id: 6003,
      title: 'Mazda 3 2018',
      start_at: iso(now - h(7)),
      end_at: iso(now - h(3)),
      status: 'ENDED',
      startingBid: 380_000_000,
      original_price: 400_000_000,
      buyNowPrice: 0,
      bidIncrement: 2_000_000,
      deposit: 10_000_000,
      currentPrice: 401_000_000,
      bid_count: 12,
      myTopBid: 401_000_000
    },
    result: 'WIN'
  }
]

export default auctionApi
