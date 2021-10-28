import { connect } from 'socket.io-client'

const singleton = () => {
  const socket = connect(process.env.BASE_URL, {
    path: '/trucks',
  })

  if (socket.connected) {
    return socket
  }

  socket.on('connect', () => {
    console.log('SOCKET CONNECTED!', socket.id)
  })

  return socket
}

export default singleton()
