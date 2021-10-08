import React from 'react'

const Notification = ({ notification }) => {
  const notificationStyle = {
    color: notification.error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification.message === '') {
    return ''
  } else {
    return <div style={notificationStyle}>{notification.message}</div>
  }
}

export default Notification