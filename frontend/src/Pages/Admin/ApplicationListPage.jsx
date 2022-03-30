import React from 'react'
import ApplicationList from '../../Components/ApplicationList/ApplicationList'
import AdminSidebar from '../../Components/AdminHeader/AdminSidebar';
import AdminAppbar from '../../Components/AdminHeader/AdminAppbar';

function ApplicationListPage() {
  return (
    <div >
      <AdminAppbar/>
      <div style={{display:'flex'}}>
      <AdminSidebar  />
      <ApplicationList/>

      </div>
    </div>
  )
}

export default ApplicationListPage
