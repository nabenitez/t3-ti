import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#EA0000',
    },
    text: {
      primary: '#808080',
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
})

export default theme
