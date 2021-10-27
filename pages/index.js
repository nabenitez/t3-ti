import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'
import Loading from '../components/Loading'
import Chat from '../components/Chat'
import { connect } from 'socket.io-client'

export default function Index() {
  React.useEffect(() => {
    // connect to socket server
    const socket = connect(process.env.NEXT_PUBLIC_WS_BASE_URL, {
      path: '/trucks',
    })

    // log socket connection

    // update chat on new message dispatched
    socket.emit('TRUCKS')

    socket.on('TRUCKS', (message) => {
      console.log('trucks', message)
    })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])
  const MapNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => <Loading />,
  })
  return (
    <Container sx={{ mt: 8 }} maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <MapNoSSR />
        </Grid>
        <Grid item xs={12} md={5}>
          <Chat />
        </Grid>
        <Grid item xs={12} sx={{ height: '30vh' }}>
          <Box sx={{ bgcolor: 'primary.main', height: '30vh', width: '100%' }}>
            a
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
