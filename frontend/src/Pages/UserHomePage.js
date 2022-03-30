import React from 'react'
import UserHome from '../Components/UserHome/UserHome'
import AdminAppbar from '../Components/AdminHeader/AdminAppbar'




function UserHomePage() {
  return (
     <div>
   <AdminAppbar user/>
     <UserHome/> 

    </div>
    
  )
}

export default UserHomePage
