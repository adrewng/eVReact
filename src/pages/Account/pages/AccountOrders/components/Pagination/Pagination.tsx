import classNames from 'classnames'
import { Link, createSearchParams, useLocation } from 'react-router-dom'
import type { QueryConfig } from '~/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
  pathName?: string // tùy chọn
}

const RANGE = 1

export default function Pagination({ queryConfig, pageSize, pathName }: Props) {
  const page = Number(queryConfig.page) || 1
  const { pathname } = useLocation() // để fallback khi không truyền pathName

  // Tạo object "to" cho <Link/>, giữ nguyên CSS hiện có
  const makeTo = (pageNumber: number) => ({
    // nếu có pathName thì dùng, không thì giữ nguyên route hiện tại
    pathname: pathName ?? pathname,
    search: createSearchParams({ ...queryConfig, page: String(pageNumber) }).toString()
  })

  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={`dot-before-${index}`} className='mx-2 bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={`dot-after-${index}`} className='mx-2 bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }

        // Link số trang
        return (
          <Link
            to={makeTo(pageNumber)}
            key={pageNumber}
            className={classNames('mx-1 flex items-center cursor-pointer h-9 min-w-9 rounded px-3 text-sm shadow-sm', {
              'bg-gray-900 text-white': pageNumber === page,
              'border border-gray-200 bg-white hover:bg-gray-50': pageNumber !== page
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }

  const isFirst = page === 1
  const isLast = page === pageSize

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {/* Prev */}
      {isFirst ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm'>Trước</span>
      ) : (
        <Link to={makeTo(page - 1)} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
          Trước
        </Link>
      )}

      {renderPagination()}

      {/* Next */}
      {isLast ? (
        <span className='mx-2 cursor-not-allowed rounded border bg-white/60 px-3 py-2 shadow-sm'>Sau</span>
      ) : (
        <Link to={makeTo(page + 1)} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
          Sau
        </Link>
      )}
    </div>
  )
}
