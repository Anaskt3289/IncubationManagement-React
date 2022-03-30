import React from 'react'
import RecordTrack from '../../Components/RecordTrack/RecordTrack'
import AdminSidebar from '../../Components/AdminHeader/AdminSidebar';
import AdminAppbar from '../../Components/AdminHeader/AdminAppbar';

function RecordTrackPage() {
  return (
    <div>
       <AdminAppbar/>
      <div style={{display:'flex'}}>
      <AdminSidebar  />
      <RecordTrack/>
      </div>
    </div>
  )
}

export default RecordTrackPage
