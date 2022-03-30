import React from 'react'
import BookingSlot from '../../Components/BookingSlot/BookingSlot'
import AdminSidebar from '../../Components/AdminHeader/AdminSidebar';
import AdminAppbar from '../../Components/AdminHeader/AdminAppbar';

function BookingSlotPage() {
  return (
    <div>
      <AdminAppbar/>
      <div style={{display:'flex'}}>
      <AdminSidebar  />
      <BookingSlot/>
      </div>
    </div>
  )
}

export default BookingSlotPage
