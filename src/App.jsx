import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Sibebar from './components/sidebar/Sidebar'
import Navbar from './components/navbar/Navbar'
import SharedLayout from './components/shared/SharedLayout'
import HomePage from './pages/home/HomePage'
import MenuView from './pages/menu-view/MenuView'
import EditSensor from './pages/edit-sensor/EditSensor'
import AddSensor from './pages/add-sensor/AddSensor'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <SharedLayout />     
        }>
          <Route index element={<HomePage/>} />
          <Route path='menu-view' element={<MenuView/>}></Route>
          <Route path='edit-sensor/:id' element={<EditSensor />}></Route>
          <Route path='add-sensor' element={<AddSensor/>}></Route>
          <Route path="details/:id" element={<MenuView />}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
