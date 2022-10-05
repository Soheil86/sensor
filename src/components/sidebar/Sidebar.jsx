import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineAreaChart } from 'react-icons/ai'
import { FaSearch } from 'react-icons/fa'
import { GrStorage } from 'react-icons/gr'
import { BiUpload } from 'react-icons/bi'
import { HiMenu } from 'react-icons/hi'
import { MdOutlineGroup } from 'react-icons/md'
import { AiTwotoneSetting } from 'react-icons/ai'
import './sidebar.css'

const Sibebar = () => {
  return (
    <div className='sidebar'>
      <HiMenu className='menu' />
      <Link to='/'>
        <FaSearch />
      </Link>
      <Link to='/'>
        <AiFillHome />
      </Link>
      <Link to='/add-sensor'>
        <GrStorage />
      </Link>
      <Link to='/edit-sensor'>
        <AiOutlineAreaChart />
      </Link>
      <Link to='/menu-view'>
        <BiUpload />
      </Link>
      <MdOutlineGroup />
      <AiTwotoneSetting />
    </div>
  )
}

export default Sibebar
