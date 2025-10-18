export const nonEmpty = (v: unknown) => !(v === undefined || v === null || v === '')
export const formatVNDMillions = (v: number) => {
  const m = v / 1_000_000
  if (!isFinite(m)) return ''
  // 4.29 tr, 5.0 tr -> 5 tr
  const s = m.toFixed(m % 1 === 0 ? 0 : 2)
  return `${s} tr`
}

export const toNumber = (v: string | number | null | undefined) =>
  typeof v === 'number' ? v : Number(String(v ?? '').replace(/[^0-9.-]/g, '')) || 0
