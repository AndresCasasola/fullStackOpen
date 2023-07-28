const Notification = ( {msgData} ) => {
  const { msg, color } = msgData
  
  if (msg === null) {
    return null
  }

  const notifStyle = {
    color: (color !== null ? color : 'dimgrey'),
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notifStyle}>
      {msg}
    </div>
  )
}

export default Notification;