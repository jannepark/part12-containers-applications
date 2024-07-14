import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const classMapping = {
    notification: 'notification',
    error: 'error',
  }

  return notification === null ? null : (
    <div className={classMapping[notification.type]}>{notification.msg}</div>
  )
}

export default Notification
