import * as React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import dynamic from 'next/dynamic'
import Loading from '../components/Loading'
import Chat from '../components/Chat'
import TrucksInfo from '../components/TrucksInfo'

export default function Index() {
  const MapNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false,
    // eslint-disable-next-line react/display-name
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
        <Grid item xs={12} sx={{ height: 280 }}>
          <TrucksInfo />
        </Grid>
      </Grid>
    </Container>
  )
}
