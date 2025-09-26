import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const current = new URLSearchParams(queryConfig)
  const isActive = current.getAll(param as string).includes(value)

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()

    const newQueryConfig: QueryConfig = {
      ...queryConfig,
      page: '1'
    }

    if (!isActive) {
      newQueryConfig[param] = value
    }

    if (isActive) {
      delete newQueryConfig[param]
    }

    const search = new URLSearchParams(newQueryConfig).toString()
    navigate({ pathname: pathName, search })
  }

  return (
    <button
      onClick={handleToggle}
      aria-pressed={isActive}
      className={classNames(
        'flex items-center gap-3 py-2 px-1 transition-colors hover:bg-gray-50 rounded-md w-full text-left',
        className
      )}
    >
      {/* Custom Checkbox */}
      <div
        className={classNames(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200',
          isActive ? 'bg-black border-black' : 'border-gray-300 bg-white hover:border-gray-400'
        )}
      >
        {isActive && (
          <svg
            className='w-3 h-3 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>

      {/* Label */}
      <span className={classNames('flex-1 text-sm font-medium', isActive ? 'text-black' : 'text-gray-700')}>
        {label}
      </span>

      {/* Right Badge */}
      {rightBadge && (
        <span className='px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full'>{rightBadge}</span>
      )}
    </button>
  )
}
