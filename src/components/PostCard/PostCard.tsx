import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { Battery, Car } from 'lucide-react'
import { useState } from 'react'
import { FaHeart, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import postApi from '~/apis/post.api'
import { path } from '~/constants/path'
import { CategoryType } from '~/types/category.type'
import type { PostType } from '~/types/post.type'
import { formatCurrencyVND, generateNameId } from '~/utils/util'

interface PropType {
  post: PostType
}

export default function PostCard({ post }: PropType) {
  const to = `${path.post}/${generateNameId({ name: post.title, id: post.id })}`
  const [favorited, setFavorited] = useState<boolean>(post.isFavorite ?? false)

  const qc = useQueryClient()
  const addFavoriteMutation = useMutation({
    mutationKey: ['add-favorite'],
    mutationFn: (id: number | string) => postApi.addFavoritePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['favorite-posts'] })
      qc.invalidateQueries({ queryKey: ['posts'] })
    }
  })
  const deleteFavoriteMutation = useMutation({
    mutationKey: ['delete-favorite'],
    mutationFn: (id: number | string) => postApi.deleteFavoritePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['favorite-posts'] })
    }
  })
  const handleClick = (id: number | string) => {
    if (favorited) {
      deleteFavoriteMutation.mutate(id, {
        onSuccess: () => {
          setFavorited(false)
        }
      })
    } else {
      addFavoriteMutation.mutate(id, {
        onSuccess: () => {
          setFavorited(true)
        }
      })
    }
  }
  return (
    <article className='group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm'>
      {/* Chỉ bọc khu vực xem chi tiết bằng Link */}
      <Link to={to} className='block'>
        <div className='aspect-[4/3] w-full overflow-hidden bg-zinc-100'>
          <img
            src={post.product.image || undefined}
            alt={post.product.model}
            className='size-full object-cover transition-transform duration-300 group-hover:scale-105'
            loading='lazy'
          />
        </div>
      </Link>

      <div className='flex flex-1 flex-col'>
        <div className='flex items-start justify-between p-4'>
          {/* Tiêu đề + địa chỉ cũng là Link riêng (tap target lớn) */}
          <Link to={to} className='min-w-0'>
            <div className='truncate font-semibold leading-tight'>{post.title}</div>
            <div className='truncate text-sm text-zinc-600'>{post.product.address}</div>
          </Link>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation() // chặn bubble
              e.preventDefault() // phòng trường hợp click từ phần tử nào đó có default
              handleClick(post.id)
            }}
            className={clsx(
              'cursor-pointer rounded-full p-2 transition',
              favorited ? 'text-rose-500 hover:bg-rose-50' : 'text-zinc-500 hover:bg-zinc-100 hover:text-rose-500'
            )}
            aria-label='Lưu tin'
          >
            <FaHeart />
          </button>
        </div>

        {/* Footer row: bọc link toàn hàng */}
        <Link
          to={to}
          className='mt-auto flex items-center justify-between gap-3 p-4 hover:bg-zinc-50 transition rounded-b-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300'
        >
          <div className='min-w-0 flex items-center gap-3 text-sm text-zinc-700'>
            <div className='inline-flex shrink-0 items-center gap-1'>
              <FaUsers /> {post.product.year}
            </div>
            <span className='inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium capitalize'>
              {post.product.category.typeSlug === CategoryType.vehicle ? (
                <>
                  <Car className='h-3.5 w-3.5' />
                  Xe
                </>
              ) : (
                <>
                  <Battery className='h-3.5 w-3.5' />
                  Pin
                </>
              )}
            </span>
          </div>

          <div className='shrink-0 whitespace-nowrap text-right text-sm font-semibold sm:text-base'>
            {formatCurrencyVND(post.product.price)}
          </div>
        </Link>
      </div>
    </article>
  )
}
