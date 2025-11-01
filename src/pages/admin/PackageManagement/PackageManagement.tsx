'use client'

import { useState, useEffect } from 'react'

import { Plus } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { PackageList } from './components/PackageList'
import { PackageForm } from './components/PackageForm'

interface Package {
  id: number
  name: string
  type: string
  cost: number
  number_of_post: number
  number_of_push: number
  service_ref: string
  product_type: string
  description: string
  feature: string
}

export default function PackageManagment() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)



  const handleAddPackage = () => {
    setEditingPackage(null)
    setIsFormOpen(true)
  }

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingPackage(null)
  }

  const handleSavePackage = async (formData: any) => {
    try {
      if (editingPackage) {
        // Update existing package
        const response = await fetch(`/api/packages/${editingPackage.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const updated = await response.json()
        setPackages(packages.map((p) => (p.id === updated.id ? updated : p)))
      } else {
        // Create new package
        const response = await fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const newPackage = await response.json()
        setPackages([...packages, newPackage])
      }
      handleCloseForm()
    } catch (error) {
      console.error('Error saving package:', error)
    }
  }

  const handleDeletePackage = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa gói này?')) {
      try {
        await fetch(`/api/packages/${id}`, { method: 'DELETE' })
        setPackages(packages.filter((p) => p.id !== id))
      } catch (error) {
        console.error('Error deleting package:', error)
      }
    }
  }

  return (
    <main className='min-h-screen bg-background flex-1'>
      <div className='container mx-auto py-8 px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-foreground'>Quản lý Gói Tin</h1>
            <p className='text-muted-foreground mt-2'>Quản lý và cập nhật các gói dịch vụ của hệ thống</p>
          </div>
          <Button onClick={handleAddPackage} className='gap-2'>
            <Plus className='w-4 h-4' />
            Thêm Gói Mới
          </Button>
        </div>

        <PackageList packages={packages} loading={loading} onEdit={handleEditPackage} onDelete={handleDeletePackage} />

        {isFormOpen && <PackageForm package={editingPackage} onSave={handleSavePackage} onClose={handleCloseForm} />}
      </div>
    </main>
  )
}
