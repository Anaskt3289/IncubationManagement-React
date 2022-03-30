import React from 'react'
import SlotAllocated from '../Components/SlotAllocated/SlotAllocated'
import AdminAppbar from '../Components/AdminHeader/AdminAppbar'

function SlotAllocatedPage() {
  return (
    <div>
      <AdminAppbar user />
      <SlotAllocated/>
    </div>
  )
}

export default SlotAllocatedPage

