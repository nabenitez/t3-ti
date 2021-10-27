import { connect } from 'socket.io-client'
const socket = connect(process.env.NEXT_PUBLIC_WS_BASE_URL, {
  path: '/trucks',
})

socket.on('connect', () => {
  console.log('SOCKET CONNECTED!', socket.id)
})

export default socket