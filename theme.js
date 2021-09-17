import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#333333',
    },
    secondary: {
      main: '#1ec677',
    },
    error: {
      main: '#ba2d0b',
    },
    info: {
      main: '#78a1bb',
    },
    warning: {
      main: '#faa916',
    },
    success: {
      main: '#1ec677',
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
})

export default theme
