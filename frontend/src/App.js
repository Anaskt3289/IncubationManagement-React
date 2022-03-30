import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage';
import UserHomePage from './Pages/UserHomePage';
import UserHomeNextPage from './Pages/UserHomeNextPage'

import AdminLoginPage from './Pages/Admin/AdminLoginPage'
import ApplicationListPage from './Pages/Admin/ApplicationListPage';
import RecordTrackPage from './Pages/Admin/RecordTrackPage'
import BookingSlotPage from './Pages/Admin/BookingSlotPage'
import CompanyDetailsPage from './Pages/Admin/CompanyDetailsPage';

import Context from './Context/companyDetailsContext'

function App() {

  return (

<Context>


    <BrowserRouter>


      <div className="App">
      
          <Routes>

            <Route path='/' element={<LoginPage />} />

            <Route path='/signup' element={<SignupPage />} />

            <Route path='/home' element={<UserHomePage />} />

            <Route path='/home/next' element={<UserHomeNextPage/>} />

            <Route path='/admin' element={<AdminLoginPage/>} />

            <Route path='/admin/applicationList' element={<ApplicationListPage/>} />

            <Route path='/admin/recordTrack' element={<RecordTrackPage/>} />

            <Route path='/admin/bookingSlots' element={<BookingSlotPage/>} />

            <Route path='/admin/viewCompanyDetails' element={<CompanyDetailsPage/>} />

         


          </Routes>

      </div>


    </BrowserRouter>

    </Context>

  );
}

export default App;
