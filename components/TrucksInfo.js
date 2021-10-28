import React from 'react'
import socket from '../services/ws.service'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Button, CardActions } from '@mui/material'
import Loading from './Loading'

const TrucksInfo = () => {
  const [trucks, setTrucks] = React.useState([])
  const [failures, setFailures] = React.useState({})
  const [submitting, setSubmitting] = React.useState(false)

  const getTrucksInfo = () => {
    setSubmitting(true)
    socket.emit('TRUCKS')
  }
  React.useEffect(() => {
    getTrucksInfo()
    // update chat on new message dispatched
    socket.on('TRUCKS', (message) => {
      setTrucks(message)
      setSubmitting(false)
      console.log('trucks', message)
    })

    socket.on('FAILURE', (message) => {
      console.log('fail', message)
      const { code, source } = message
      if (failures[code]) {
        failures[code].push(source)
      } else {
        failures[code] = [source]
      }

      setFailures({ ...failures })
    })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])

  React.useEffect(() => {
    console.log('failures', failures)
  }, [failures])

  return (
    <Box
      id="trucks-container"
      sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '20%',
          mr: 2,
        }}
      >
        <Button
          disabled={submitting}
          onClick={getTrucksInfo}
          variant="outlined"
          startIcon={submitting ? <Loading /> : null}
        >
          Get trucks information
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          width: '80%',
        }}
      >
        {trucks
          ? trucks.map((truck, index) => (
              <Card
                key={index}
                sx={{ minWidth: 300, mr: 2, mb: 2, overflowY: 'auto' }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {truck.code}-{truck.truck}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body"
                    component="div"
                  ></Typography>
                  <Typography variant="body2" color="text.secondary">
                    Engine: {truck.engine}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Origin: ({truck.origin.join('; ')})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Destination: ({truck.destination.join('; ')})
                  </Typography>
                </CardContent>
                <CardActions>
                  {failures[truck.code] && (
                    <Button size="small" color="secondary" variant="contained">
                      Fix truck
                    </Button>
                  )}
                </CardActions>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Staff
                  </Typography>
                  {truck.staff.map((p, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                    >
                      {p.name} - {p.age}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            ))
          : null}
      </Box>
    </Box>
  )
}

export default TrucksInfo
