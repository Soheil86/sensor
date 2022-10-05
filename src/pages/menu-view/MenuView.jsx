import React, { useEffect, useState } from 'react'
import { FaLessThan } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import Activity from '../../components/activity/Activity'
import LogItem from '../../components/log-item/LogItem'
import './menu-view.css'

const MenuView = () => {
  const { pathname } = useLocation()
  const device_id = pathname.split('/')[2]
  const [overView, setOverView] = useState({})
  const [activity, setActivity] = useState([])
  const [logs, setLogs] = useState([])

  useEffect(() => {
    async function getSensorDetails() {
      let response = await fetch(`http://localhost:3009/sensor/${device_id}`)
      let data = await response.json()
      setOverView(data.result.overview)

      response = await fetch(`http://localhost:3009/sensor/${device_id}/events`)
      data = await response.json()
      setActivity(data.results)

      response = await fetch(`http://localhost:3009/sensor/${device_id}/logs`)
      data = await response.json()
      setLogs(data.results)
    }

    getSensorDetails()
  }, [])

  return (
    <div className='menu-view'>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaLessThan
          style={{
            background: 'grey',
            padding: '5px',
            fontSize: '20px',
            marginRight: '10px',
          }}
        />
        <p>
          Sensor - <span style={{ fontWeight: 'bold' }}>nrf-881277</span>
        </p>
      </div>
      <div
        className='hero-container'
        style={{ display: 'flex', width: '85vw' }}
      >
        <div style={{ width: '50%' }}>
          <div className='summary-item'>
            <div>
              <h2>TOTAL MESSAGES</h2>
              <p>Total messages this week</p>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
              {overView.total_messages}
            </p>
          </div>
          <div className='summary-item'>
            <div>
              <h2>DOWN TIME</h2>
              <p>Total down time</p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
                {overView.down_time}
              </p>
              <p>sec</p>
            </div>
          </div>
          <div className='summary-item'>
            <div>
              <h2>ALERTS</h2>
              <p>System alerts this week</p>
            </div>
            <p style={{ fontWeight: 'bold', fontSize: '25px' }}>
              {overView.alerts}
            </p>
          </div>
        </div>
        <div style={{ padding: '20px' }}>WEEKLY AVERAGE TEMP</div>
      </div>
      <div className='temp-chart'>TEMPERATURE DAILY</div>
      <div className='log-activity'>
        <div className='log'>
          <p>SYSTEM LOG</p>
          <div className='box'>
            {logs.map((log) => (
              <LogItem log={log} />
            ))}
          </div>
        </div>
        <div className='activity'>
          <p>ACTIVITY</p>
          <div className='box'>
            {activity.map((act) => (
              <Activity activity={act} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuView
