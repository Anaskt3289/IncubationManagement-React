import React from 'react'
import CompanyView from '../../Components/CompanyView/CompanyView'
import AdminSidebar from '../../Components/AdminHeader/AdminSidebar';
import AdminAppbar from '../../Components/AdminHeader/AdminAppbar';

function CompanyDetailsPage() {
  return (
    <div>

      <AdminAppbar/>
      <div style={{display:'flex'}}>
      <AdminSidebar  />
      <CompanyView/>
      </div>
    </div>
  )
}

export default CompanyDetailsPage
