import React from 'react'

const CardsSkeleton = ({ count = 8 }) => {
  const items = Array.from({ length: count })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 animate-pulse">
      {items.map((_, idx) => (
        <div key={idx} className="m-2 sm:m-4 w-full bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="h-40 sm:h-56 bg-gray-200" />
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="flex justify-between items-center mt-2">
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

const MenuSkeleton = () => {
  const sections = Array.from({ length: 3 })
  const items = Array.from({ length: 3 })
  return (
    <div className="px-3 sm:px-4 py-4 max-w-2xl sm:max-w-3xl mx-auto animate-pulse">
      <div className="h-6 sm:h-8 bg-gray-200 rounded w-2/3 mx-auto mb-4 sm:mb-6" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
      {sections.map((_, sIdx) => (
        <div key={sIdx} className="bg-gray-50 shadow-lg rounded-lg p-3 sm:p-4 mb-4">
          <div className="h-5 bg-gray-200 rounded w-40 mb-3" />
          {items.map((__, iIdx) => (
            <div key={iIdx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-2 border-b border-gray-100 last:border-0">
              <div className="w-full sm:w-9/12 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
              <div className="w-full sm:w-3/12 h-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const CartSkeleton = () => {
  const rows = Array.from({ length: 3 })
  return (
    <div className='text-center px-3 sm:px-4 py-4'>
      <div className='w-full max-w-2xl sm:max-w-3xl m-auto text-left animate-pulse'>
        <div className='h-6 bg-gray-200 rounded w-24 mb-4 mx-auto' />
        <div className='flex flex-col gap-3'>
          {rows.map((_, idx) => (
            <div key={idx} className='p-2 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2'>
              <div className='w-full sm:w-9/12 space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-2/3' />
                <div className='h-3 bg-gray-200 rounded w-5/6' />
              </div>
              <div className='w-full sm:w-3/12 h-24 bg-gray-200 rounded' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Shimmer = ({ variant = 'cards', count }) => {
  if (variant === 'menu') return <MenuSkeleton />
  if (variant === 'cart') return <CartSkeleton />
  return <CardsSkeleton count={count} />
}

export default Shimmer
