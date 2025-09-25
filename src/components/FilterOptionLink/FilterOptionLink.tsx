import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from '~/constants/path'
import type { QueryConfig } from '~/hooks/useQueryConfig'

type PathValue = (typeof path)['vehicle' | 'battery' | 'home']
type FilterKey = keyof QueryConfig

interface Props<K extends FilterKey = FilterKey> {
  queryConfig: QueryConfig
  pathName: PathValue
  param: K
  value: string
  label: React.ReactNode
  rightBadge?: React.ReactNode
  className?: string
}

export default function FilterOptionLink<K extends FilterKey>({
  queryConfig,
  pathName,
  param,
  value,
  label,
  rightBadge,
  className
}: Props<K>) {
  const current = new URLSearchParams(queryConfig)
  const isActive = current.getAll(param as string).includes(value)

  const search = createSearchParams({
    ...queryConfig,
    [param]: value,
    page: '1'
  }).toString()

  return (
    <Link
      to={{ pathname: pathName, search }}
      aria-pressed={isActive}
      role='button'
      className={classNames(
        'flex items-center justify-between py-1 transition-colors',
        isActive
          ? 'font-semibold underline underline-offset-4 decoration-2'
          : 'hover:underline underline-offset-4 decoration-2',
        className
      )}
    >
      <span>{label}</span>
      {rightBadge && <span className='ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100'>{rightBadge}</span>}
    </Link>
  )
}
