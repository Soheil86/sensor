import React from 'react'
import style from './log-item.module.css'

const LogItem = ({ log }) => {
  const date = new Date(parseInt(log.time)).toDateString()
  return (
    <div className={style['log-item']}>
      <p>{log.description}</p>
      <p className={style.time}>{date}</p>
    </div>
  )
}

export default LogItem
