import React from 'react'
import ApplicationProcessing from '../Components/ApplicationProcessing/ApplicationProcessing'
import AdminAppbar from '../Components/AdminHeader/AdminAppbar'

function ApplicationProcessingPage() {
  return (
    <div>
        <AdminAppbar user />
      <ApplicationProcessing/>
    </div>
  )
}

export default ApplicationProcessingPage
