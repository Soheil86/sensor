import React, { useState } from 'react'
import './add-sensor.css'

const AddSensor = () => {
  function addSensor() {}
  const [inputData, setInputData] = useState({
    sensorId: '',
    location: '',
    customer: '',
    min_temp_limit: '',
    max_temp_limit: '',
    monitor_min_temp: false,
    monitor_max_temp: false,
  })
  function changeInput(e) {
    let { name, value } = e.target
    if (name === 'monitor_min_temp' || name === 'monitor_max_temp')
      value = e.target.checked
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  async function addSensor() {
    const response = await fetch('http://localhost:3009/sensor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer: inputData.customer,
        location: inputData.location,
        min_temp_limit: inputData.min_temp_limit,
        max_temp_limit: inputData.max_temp_limit,
        monitor_max_temp: inputData.monitor_max_temp,
        monitor_min_temp: inputData.monitor_min_temp,
      }),
    })
    const jsonResponse = await response.json()
  }
  return (
    <div className='add-sensor'>
      <div className='container'>
        <div className='sensor'>
          <h1>New Sensor</h1>
          <hr />
          <input
            name='sensorId'
            type='text'
            value={inputData.id}
            placeHolder='Sensor ID'
            onChange={changeInput}
          />
          <input
            name='location'
            type='text'
            value={inputData.location}
            placeHolder='Location'
            onChange={changeInput}
          />
          <select placeholder='customer' name='customer' onChange={changeInput}>
            {['Customer 1', 'Customer 2', 'Customer 3'].map(
              (itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                )
              }
            )}
          </select>
        </div>
        <div className='alerts'>
          <h1>Alerts</h1>
          <hr />
          <input
            type='text'
            name='min_temp_limit'
            placeHolder='Min Temp. Threshold'
            onChange={changeInput}
          />
          <input
            className='check'
            type='checkbox'
            name='monitor_min_temp'
            onChange={changeInput}
          />{' '}
          <span>Monitor Min Temperature</span>
          <input
            type='text'
            name='max_temp_limit'
            placeHolder='Max Temp. Threshold'
            onChange={changeInput}
          />
          <input
            className='check'
            type='checkbox'
            name='monitor_max_temp'
            onChange={changeInput}
          />{' '}
          <span>Monitor Max Temperature</span>
        </div>
      </div>

      <hr />
      <button onClick={addSensor}>Add Sensor</button>
      <button>Cancel</button>
    </div>
  )
}

export default AddSensor
