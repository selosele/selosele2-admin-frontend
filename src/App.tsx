import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material'
import { theme } from './utils'
import { GlobalRouter } from './routes'
import useCodeStore from './store/code'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

import './App.css'

dayjs.locale('ko')

export default function App() {
  const codeStore = useCodeStore()
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
    </ThemeProvider>
  )
}
