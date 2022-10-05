import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import './shared-layout.css'

const SharedLayout = () => {
  return (
    <div>
      <Navbar />
      <div className='dashboard-sub'>
        <Sidebar />
        <div className='dashboard-page'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default SharedLayout
