import React from 'react'
import { CgProfile } from 'react-icons/cg'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='profile'>
        <div>
          <h1>Jane Doe</h1>
          <p>Account Setting</p>
        </div>
        <CgProfile />
      </div>
    </nav>
  )
}

export default Navbar
