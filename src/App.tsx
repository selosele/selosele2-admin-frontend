import { theme } from './utils'
import { GlobalRouter } from './routes'
import { ThemeProvider } from '@mui/material'

import './App.css'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalRouter />
    </ThemeProvider>
  )
}
