import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material'
import PrivateRoute from './routes/PrivateRoute'
import Main from './routes/Main/Main'
import Login from './routes/Login/Login'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Pretendard-Regular'
    ].join(','),
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />}></Route>

          {/* 로그인이 필요한 페이지들 */}
          <Route element={<PrivateRoute />}>

            {/* 메인 페이지 */}
            <Route path="/" element={<Main />}></Route>
          </Route>
          {/* TODO: 에러페이지 개발 필요 <Route path="/error" element={<Error />}></Route> */} 
          {/* TODO: 404페이지 개발 필요(또는 에러페이지 사용?) <Route path="*" element={<NotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
