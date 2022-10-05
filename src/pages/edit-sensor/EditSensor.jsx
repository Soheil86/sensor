import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './edit-sensor.css'

const EditSensor = () => {
  const { pathname } = useLocation()
  let device_id = pathname.split('/')[2]
  const [inputData, setInputData] = useState({
    location: '',
    customer: '',
    min_temp_limit: '',
    max_temp_limit: '',
    monitor_min_temp: false,
    monitor_max_temp: false
  })
  const [deviceData, setDeviceData] = useState({})

  function changeInput(e) {
    let { name, value } = e.target
    
    if (name === 'monitor_min_temp' || name === 'monitor_max_temp') value = e.target.checked
    setInputData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  async function updateSensor() {
    const response = await fetch(`http://localhost:3009/sensor/${deviceData.device_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer: inputData.customer,
        location: inputData.location,
        min_temp_limit: inputData.min_temp_limit,
        max_temp_limit: inputData.max_temp_limit,
        monitor_max_temp: inputData.monitor_max_temp,
        monitor_min_temp: inputData.monitor_min_temp
      }),

    })
  }

  useEffect(() => {
    async function getDeviceDetails() {
      const response = await fetch(`http://localhost:3009/sensor/${device_id}`)
      const data = await response.json()
      setDeviceData(data.result)
    }
    getDeviceDetails()
  }, [])

  useEffect(() => {
    setInputData({
      location: deviceData.location,
      customer: deviceData.customer
    })
  }, [deviceData])

  return (
    <div className='edit-sensor'>
      <div className='container'>
        <div className='sensor'>
          <h1>Edit Sensor - <span>{deviceData.device_id}</span> </h1>
          <hr />
          <h3>{deviceData.device_id}</h3>
          <input name='location' type='text' placeHolder='Newyork' value={inputData.location} onChange={changeInput} />
          <input name='customer' type='text' value={inputData.customer} onChange={changeInput} />
        </div>
        <div className='alerts'>
          <h1>Alerts</h1>
          <hr />
          <input type='text' placeHolder='Min Temp. Threshold' name='min_temp_limit' onChange={changeInput}/>
          <input className='check' type='checkbox' name='monitor_min_temp' onChange={changeInput}/> <span>Monitor Min Temperature</span>
          <input type='text' placeHolder='Max Temp. Threshold' name='max_temp_limit' onChange={changeInput}/>
          <input className='check' type='checkbox' name='monitor_max_temp' onChange={changeInput}/> <span>Monitor Max Temperature</span>
        </div>
      </div>

      <hr />
      <button onClick={updateSensor}>Update Sensor</button>
      <button>Cancel</button>
    </div>
  )
}

export default EditSensor