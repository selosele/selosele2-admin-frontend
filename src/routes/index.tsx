import Login from './Login/Login'
import Main from './Main/Main'
import Code from './Code/Code'
import Content from './Content/Content'
import PrivateRoute from './PrivateRoute'
import { Route, Routes } from 'react-router-dom'

/** 페이지 컴포넌트 */
export const Pages = { Login, Main, Code, Content }

/** 공통 라우터 */
export function GlobalRouter() {
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path="/login" element={<Pages.Login />}></Route>

      {/* 로그인이 필요한 페이지들 */}
      <Route element={<PrivateRoute />}>

        {/* 메인 페이지 */}
        <Route path="/" element={<Pages.Main />}></Route>
        {/* 공통코드 관리 페이지 */}
        <Route path="/code" element={<Pages.Code />}></Route>
        {/* 콘텐츠 관리 페이지 */}
        <Route path="/content" element={<Pages.Content />}></Route>
      </Route>
      {/* TODO: 에러페이지 개발 필요 <Route path="/error" element={<Error />}></Route> */} 
      {/* TODO: 404페이지 개발 필요(또는 에러페이지 사용?) <Route path="*" element={<NotFound />}></Route> */}
    </Routes>
  )
}
