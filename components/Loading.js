import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = () => (
  <Box sx={{ display: 'flex', height: '100%' }}>
    <CircularProgress sx={{ m: 'auto' }} />
  </Box>
)

export default Loading
