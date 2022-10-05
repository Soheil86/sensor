import React, { useEffect, useState } from 'react'
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { BsShopWindow } from 'react-icons/bs'
import { AiFillTag } from 'react-icons/ai'
import { MdMonitor } from 'react-icons/md'
import './home.css'
import SensorList from '../../components/sensor-list/SensorList'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
}
const HomePage = () => {
  const [sensors, setSensors] = useState([])
  const [sensorStats, setSensorStats] = useState([])
  const [sensorCount, setSensorCount] = useState(0)
  const [sensorStatFormat, setSensorStatFormat] = useState([])
  const [labels, setLabels] = useState([])
  const [dataSets, setDataSets] = useState([])
  useEffect(() => {
    async function getSensorData() {
      let response = await fetch('http://localhost:3009/sensor')
      let data = await response.json()
      setSensorCount(data.paging.count)
      setSensors(data.results)

      response = await fetch('http://localhost:3009/sensor/stats')
      data = await response.json()
      data.results.map((sensor) => {
        let sortedArr
        sortedArr = sensor.stats
        sortedArr = sortedArr.sort(function (a, b) {
          return parseInt(a.time) - parseInt(b.time)
        })
        sensor.stats = sortedArr
      })

      setSensorStats(data.results)
    }
    getSensorData()
  }, [])

  useEffect(() => {
    const newArr = []
    sensorStats.map((sensor) => {
      const newArr2 = []
      sensor.stats.forEach((stat) => {
        const month = new Date(parseInt(stat.time)).getMonth()
        const day = new Date(parseInt(stat.time)).getDate()
        const date = `${day}/${month}`
        newArr2.push({
          temp: stat.temp,
          time: date,
        })
      })
      const newObj = {
        device_id: sensor.device_id,
        stats: newArr2,
      }
      newArr.push(newObj)
    })
    setSensorStatFormat(newArr)
  }, [sensorStats])
  useEffect(() => {
    const arr = []
    sensorStatFormat[0]?.stats.forEach((stat) => {
      arr.push(stat.time)
    })
    // if(sensorStatFormat.length > 0){
    //     setDataSets(returnDataset(sensorStatFormat))
    // }
    setLabels(arr)
  }, [sensorStatFormat])

  return (
    <div className='home-page'>
      <div className='highlight'>
        <div className='highlight-container'>
          <div>
            <h2>TOTAL SENSORS</h2>
            <p>{sensorCount}</p>
          </div>
          <BsShopWindow />
        </div>
        <div className='highlight-container'>
          <div>
            <h2>OPEN ALERTS</h2>
            <p>2</p>
          </div>
          <AiFillTag />
        </div>
        <div className='highlight-container'>
          <div>
            <h2>TOTAL CUSTOMERS</h2>
            <p>14</p>
          </div>
          <MdMonitor />
        </div>
      </div>
      <div style={{ height: '40vh', margin: '40px 0' }}>
        {labels.length > 0 && (
          <Line
            data={{
              labels,
              datasets: returnDataset(sensorStatFormat),
            }}
          />
        )}
      </div>
      <div>
        <p>SENSOR LIST</p>
        <div className='list-container'>
          {sensors.map((sensor) => (
            <SensorList sensor={sensor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage

function returnDataset(sensors) {
  const dataArr = []
  sensors.forEach((sensor, index) => {
    let color = 'orange'
    if (index == 1) color = 'green'
    else if (index == 2) color = 'red'

    dataArr.push({
      label: sensor.device_id,
      data: sensor.stats.map((stat) => stat.temp),
      borderColor: color,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    })
  })
  return dataArr
}
