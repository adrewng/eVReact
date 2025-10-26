import { Battery, Car } from 'lucide-react'
import { FaHeart, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { path } from '~/constants/path'
import { CategoryType } from '~/types/category.type'
import type { PostType } from '~/types/post.type'
import { formatCurrencyVND, generateNameId } from '~/utils/util'

interface PropType {
  post: PostType
}
export default function PostCard({ post }: PropType) {
  return (
    <Link to={`${path.post}/${generateNameId({ name: post.title, id: post.id })}`}>
      <div className='aspect-[4/3] w-full overflow-hidden bg-zinc-100'>
        <img
          src={post.product.image || undefined}
          alt={post.product.model}
          className='size-full object-cover transition-transform duration-300'
        />
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex items-start justify-between p-4'>
          <div className='min-w-0'>
            <div className='font-semibold truncate leading-tight'>{post.title}</div>
            <div className='text-sm truncate text-zinc-600'>{post.product.address}</div>
          </div>
          <div className='rounded-full p-2 text-zinc-500 hover:bg-zinc-100 cursor-pointer' aria-label='Save'>
            <FaHeart />
          </div>
        </div>

        <div className='mt-auto flex items-center justify-between p-4 gap-3'>
          <div className='flex items-center gap-3 min-w-0 text-sm text-zinc-700'>
            <div className='inline-flex items-center gap-1 shrink-0'>
              <FaUsers /> {post.product.year}
            </div>
            <span className='shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium capitalize inline-flex items-center gap-1.5'>
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
          <div className='font-semibold text-sm sm:text-base whitespace-nowrap shrink-0 text-right'>
            {formatCurrencyVND(post.product.price)}
          </div>
        </div>
      </div>
    </Link>
  )
}
