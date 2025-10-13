import { Edit2, Mail, MapPin, Shield } from 'lucide-react'
import React from 'react'

export default function AccountProfile() {
  return (
    <div className='min-h-screen bg-white flex-1'>
      AccountProfile
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        <div>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>My profile</h1>
          <p className='text-gray-600'>Manage your profile information, security and payment.</p>
        </div>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-6'>
            {/* Profile Image */}
            <div className='relative group'>
              <div className='w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-gray-200'>
                <img src='' alt='Profile' className='w-full h-full object-cover' />
              </div>
              <button className='absolute -bottom-2 -right-2 w-8 h-8 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-all shadow-lg'>
                <Edit2 size={14} />
              </button>
            </div>
            {/* Name & Status */}
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <h1 className='text-3xl font-bold text-gray-900'>Name</h1>
                {
                  //profile.verificationStatus &&
                  <div className='flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full'>
                    <Shield className='w-4 h-4 text-gray-900' />
                    <span className='text-xs font-medium text-gray-900'>Verified</span>
                  </div>
                }
              </div>
              <div className='flex items-center gap-6 text-sm text-gray-600'>
                {
                  //profile.location &&
                  <span className='flex items-center gap-1.5'>
                    <MapPin className='w-4 h-4' />
                    Location
                  </span>
                }
                {
                  //profile.email &&
                  <span className='flex items-center gap-1.5'>
                    <Mail className='w-4 h-4' />
                    Email
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
