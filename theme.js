import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1565c0',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: 'grey',
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
})

export default theme
