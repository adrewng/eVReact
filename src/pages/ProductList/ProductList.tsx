import { useQuery } from '@tanstack/react-query'
import categoryApi from '~/apis/categories.api'
import postApi from '~/apis/post.api'
import Pagination from '~/components/Pagination'
import Search from '~/components/Search'

import useQueryConfig, { type QueryConfig } from '~/hooks/useQueryConfig'
import type { CategoryParent } from '~/types/category.type'
import type { ProductListConfig } from '~/types/post.type'

// const placeholderImg =
//   'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// const products = [
//   {
//     name: 'Porsche 718 Cayman S',
//     type: 'Coupe',
//     passengers: 2,
//     transmission: 'Manual',
//     price: '$400/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper 5-DOOR',
//     type: 'Hatchback',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$364/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Toyota GR Supra',
//     type: 'Coupe',
//     passengers: 2,
//     transmission: 'Manual',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Porsche 911 Turbo',
//     type: 'Coupe',
//     passengers: 2,
//     transmission: 'Manual',
//     price: '$468/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Porsche Taycan 4S',
//     type: 'Coupe',
//     passengers: 2,
//     transmission: 'Manual',
//     price: '$424/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   },
//   {
//     name: 'Mini Cooper Works',
//     type: 'Coupe',
//     passengers: 4,
//     transmission: 'Matic',
//     price: '$360/d',
//     image: placeholderImg
//   }
// ]

type FilterCompType = React.ComponentType<{ queryConfig: QueryConfig; categories: CategoryParent[] }>
/* ========================= PAGE ========================= */
const ProductList = ({ Filter }: { Filter: FilterCompType }) => {
  const queyConfig = useQueryConfig()
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryApi.getCategories,
    staleTime: 3 * 60 * 1000
  })

  const { data: postsData } = useQuery({
    queryKey: ['posts', queyConfig],
    queryFn: () => postApi.getPosts(queyConfig as ProductListConfig),
    staleTime: 3 * 60 * 1000
  })
  console.log(postsData)

  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
      <div className='py-8 md:py-10 grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-6 lg:gap-8'>
        <div className='hidden lg:block w-full shrink-0'>
          <Filter queryConfig={queyConfig} categories={categoriesData?.data.data ?? []} />
        </div>
        <div className='min-w-0'>
          <Search />
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6'>
            {/* {products.map((product, index) => (
              <CarCard key={product.} car={car} />
            ))} */}
          </div>
          <Pagination queryConfig={queyConfig} pageSize={12} />
        </div>
      </div>
    </div>
  )
}

export default ProductList
