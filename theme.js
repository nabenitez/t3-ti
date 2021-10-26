import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3F89B5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },
})

export default theme
