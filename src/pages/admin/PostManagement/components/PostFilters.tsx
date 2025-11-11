import { useState } from 'react'
import { motion } from 'framer-motion'
// import { Badge } from '~/components/ui/badge'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '~/components/ui/dropdown-menu'
import { cn } from '~/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { QueryConfig } from '~/pages/admin/PostManagement/PostManagement'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { path } from '~/constants/path'
import { omit } from 'lodash'

const filters = [
  { label: 'All', link: '' },
  { label: 'Approved', link: 'approved' },
  { label: 'Pending', link: 'pending' },
  { label: 'Rejected', link: 'rejected' }
]

const years = [2025, 2024, 2023, 2022]

interface Props {
  queryConfig: QueryConfig
}

export default function PostFilters(props: Props) {
  const [search, setSearch] = useState('')
  const { queryConfig } = props
  const { status } = queryConfig
  const navigate = useNavigate()

  const isActiveStatus = (sortByStatus: string) => {
    if (sortByStatus === 'All') {
      return status === '' || !status
    }
    return status === sortByStatus.toLowerCase()
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    console.log('vao handleSubmitSearch')

    navigate({
      pathname: path.adminPosts,
      search: createSearchParams({
        ...queryConfig,
        search: search,
        page: '1'
      }).toString()
    })
    setSearch('')
  }

  const handleClickYear = (sortByYear: number) => {
    navigate({
      pathname: path.adminPosts,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        year: sortByYear.toString()
      }).toString()
    })
    setSearch('')
  }

  // const [active, setActive] = useState('All')
  const [year, setYear] = useState(years[0])

  return (
    <div className='flex justify-between items-center'>
      {/* LEFT: Filters */}
      <div className='w-fit max-w-[60%] bg-white p-1 rounded-xl shadow flex flex-wrap items-center gap-2'>
        {filters.map((f) => {
          const isActive = isActiveStatus(f.label)
          let searchParams
          if (f.label === 'All') {
            searchParams = createSearchParams({
              ...omit(queryConfig, ['status', 'search', 'year']),
              page: '1'
            }).toString()
          } else {
            searchParams = createSearchParams({
              ...omit(queryConfig, ['search', 'year']),
              status: f.link.toLowerCase(),
              page: '1'
            }).toString()
          }
          return (
            <Link
              key={f.label}
              to={{
                pathname: path.adminPosts,
                search: searchParams
              }}
            >
              <button
                key={f.label}
                // onClick={() => handleStatus(f.label)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap'
                )}
              >
                {/* highlight */}
                {isActive && (
                  <motion.div
                    layoutId='activeTab'
                    className='absolute inset-0 rounded-lg bg-black z-0'
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
                  />
                )}

                {/* content (luôn ở trên) */}
                <span className={cn('relative z-10', isActive ? 'text-white' : 'text-gray-500 hover:text-black')}>
                  {f.label}
                </span>
                {/* {f.badge && (
                  <Badge
                    className={cn(
                      'relative z-10 text-xs px-2 py-0.5 rounded-full',
                      isActive ? 'bg-white text-black' : 'bg-green-100 text-green-600'
                    )}
                  >
                    {f.badge}
                  </Badge>
                )} */}
              </button>
            </Link>
          )
        })}
      </div>

      {/* RIGHT: Search + Year */}
      <div className='flex items-center gap-3'>
        <div className='w-48'>
          <form onSubmit={handleSubmitSearch}>
            <Input placeholder='Search posts...' className='bg-white' onChange={handleChangeSearch} value={search} />
          </form>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='flex items-center gap-2'>
              {year} <ChevronDown className='w-4 h-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {years.map((y) => (
              <DropdownMenuItem
                key={y}
                onClick={() => {
                  setYear(y)
                  handleClickYear(y)
                }}
              >
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
