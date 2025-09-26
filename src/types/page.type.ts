export const PageName = {
  vehicle: 'vehicle',
  battery: 'battery',
  all: 'alt'
} as const

export type PageName = (typeof PageName)[keyof typeof PageName]
