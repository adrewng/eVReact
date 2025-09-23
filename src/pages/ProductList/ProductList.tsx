import { FaCog, FaHeart, FaUsers } from 'react-icons/fa'
import FilterSidebar from '~/components/FilterSidebar'
import NavHeader from '~/components/NavHeader'
import Pagination from '~/components/Pagination'
import Search from '~/components/Search'
import useQueryConfig from '~/hooks/useQueryConfig'

/* ========================= CARD ========================= */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CarCard = ({ car }: { car: any }) => (
  <div className='group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-lg'>
    {/* Image on top */}
    <div className='aspect-[4/3] w-full overflow-hidden bg-zinc-100'>
      <img src={car.image} alt={car.name} className='size-full object-cover transition-transform duration-300' />
    </div>

    {/* Content */}
    <div className='flex flex-col flex-1'>
      <div className='flex items-start justify-between p-4'>
        <div>
          <div className='font-semibold leading-tight'>{car.name}</div>
          <div className='text-sm text-zinc-600'>{car.type}</div>
        </div>
        <div className='rounded-full p-2 text-zinc-500 hover:bg-zinc-100 cursor-pointer' aria-label='Save'>
          <FaHeart />
        </div>
      </div>

      <div className='mt-auto flex items-center justify-between p-4'>
        <div className='flex items-center gap-4 text-sm text-zinc-700'>
          <div className='inline-flex items-center gap-1'>
            <FaUsers /> {car.passengers}
          </div>
          <div className='inline-flex items-center gap-1'>
            <FaCog /> {car.transmission}
          </div>
        </div>
        <div className='font-semibold'>{car.price}</div>
      </div>
    </div>
  </div>
)

/* ========================= LIST ========================= */
const CarList = () => {
  const placeholderImg =
    'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

  const cars = [
    {
      name: 'Porsche 718 Cayman S',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$400/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper 5-DOOR',
      type: 'Hatchback',
      passengers: 4,
      transmission: 'Matic',
      price: '$364/d',
      image: placeholderImg
    },
    {
      name: 'Toyota GR Supra',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Porsche 911 Turbo',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$468/d',
      image: placeholderImg
    },
    {
      name: 'Porsche Taycan 4S',
      type: 'Coupe',
      passengers: 2,
      transmission: 'Manual',
      price: '$424/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    },
    {
      name: 'Mini Cooper Works',
      type: 'Coupe',
      passengers: 4,
      transmission: 'Matic',
      price: '$360/d',
      image: placeholderImg
    }
  ]

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6'>
        {cars.map((car, index) => (
          <CarCard key={index} car={car} />
        ))}
      </div>
    </div>
  )
}

/* ========================= PAGE ========================= */
const ProductList = () => {
  const queyConfig = useQueryConfig()
  return (
    <div className='min-h-screen bg-zinc-50 text-zinc-900'>
      <NavHeader />

      <main className='mx-auto max-w-screen-2xl px-4 md:px-6'>
        <div className='py-8 md:py-10 grid grid-cols-1 lg:grid-cols-[22rem_minmax(0,1fr)] gap-6 lg:gap-8'>
          <FilterSidebar />
          <div className='min-w-0'>
            <Search />
            <CarList />
            <Pagination queryConfig={queyConfig} pageSize={12} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProductList
