import React from 'react'
import { Link } from 'react-router-dom'
import './sensor-list.css'

const SensorList = ({ sensor }) => {
  const lastSeen = new Date(parseInt(sensor.last_online)).toDateString()
  return (
    <div className='sensor-list'>
      <h4>{sensor.device_id}</h4>
      <div>
        <p> {lastSeen} </p>
        <p>Last Online</p>
      </div>
      <div>
        <p>{sensor.last_temp}</p>
        <p>Temp</p>
      </div>
      <div>
        <p>{sensor.location}</p>
        <p>Location</p>
      </div>
      <div>
        <Link to={`/edit-sensor/${sensor.device_id}`}>
          <button>Options</button>
        </Link>
        <Link to={`/details/${sensor.device_id}`}>
          <button>Details</button>
        </Link>
      </div>
    </div>
  )
}

export default SensorList
