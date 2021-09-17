import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import Box from '@mui/material/Box'

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 'auto', mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Example app
        </Typography>
        <Link href="/signin">Iniciar sesión</Link>
      </Box>
    </Container>
  )
}
