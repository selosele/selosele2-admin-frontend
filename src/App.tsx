import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from './utils'
import { GlobalRouter } from './routes'
import { UI } from './components/UI'
import useCodeStore from './store/code'
import useLoadingStore from './store/loading'

import './App.css'

export default function App() {
  const codeStore = useCodeStore()
  const loadingStore = useLoadingStore()
  
  useEffect(() => {

    /** 공통코드 목록을 조회해서 store에 저장 */
    async function fetchData() {
      await codeStore.listData()
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalRouter />
      
      {loadingStore.isLoading && (
        <UI.Loading full={true} />
      )}
    </ThemeProvider>
  )
}
