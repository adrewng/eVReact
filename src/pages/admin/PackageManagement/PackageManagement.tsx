import { useState } from 'react'

import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PackageForm } from './components/PackageForm'
import { useQuery } from '@tanstack/react-query'
import packageApi from '~/apis/package.api'
import type { Package } from '~/types/package.type'
import PackageList from './components/PackageList'

export default function PackageManagment() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const { data: packageData, isLoading } = useQuery({
    queryKey: ['package-admin'],
    queryFn: packageApi.getPackageByAdmin
  })
  console.log('package -', packageData)
  const packages = packageData?.data.data

  const handleEditPackage = (pkg: Package) => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
  }

  return (
    <main className='min-h-screen bg-background flex-1'>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý Gói Tin</h1>
            <p className='text-muted-foreground mt-2'>Quản lý và cập nhật các gói dịch vụ của hệ thống</p>
          </div>
          <Button
            onClick={() => {
              setIsFormOpen(true)
            }}
            className='gap-2'
          >
            <Plus className='w-4 h-4' />
            Thêm Gói Mới
          </Button>
        </div>
        {packages && (
          <>
            <PackageList packages={packages} loading={isLoading} />
            {isFormOpen && <PackageForm onClose={handleCloseForm} isFormOpen={isFormOpen} />}
          </>
        )}
      </div>
    </main>
  )
}
