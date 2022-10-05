import { FaUser } from 'react-icons/fa'
import style from './activity.module.css'
const Activity = ({ activity }) => {
  const time = new Date(parseInt(activity.time)).toDateString()
  return (
    <div className={style.container}>
      <div>
        <div className={style.profileBorder}>
          <FaUser />
        </div>
        <p>{activity.event_name}</p>
      </div>
      <div>
        <p>{activity.description}</p>
        <p className={style.time}>{time}</p>
      </div>
    </div>
  )
}
export default Activity
