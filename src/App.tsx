import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from './utils'
import { GlobalRouter } from './routes'
import useCodeStore from './store/code'

import './App.css'

export default function App() {
  const codeStore = useCodeStore()
  useEffect(() => {
    async function fetchData() {
      await codeStore.listData()
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalRouter />
    </ThemeProvider>
  )
}
