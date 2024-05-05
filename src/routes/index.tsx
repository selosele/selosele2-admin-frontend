import Login from './Login/Login'
import Main from './Main/Main'
import Code from './Code/Code'
import Content from './Content/Content'
import Search from './Search/Search'
import Menu from './Menu/Menu'
import Category from './Category/Category'
import NotFound from './NotFound/NotFound'
import PrivateRoute from './PrivateRoute'
import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'

/** 페이지 컴포넌트 */
export const Pages = { Login, Main, Code, Content, Search, Menu, Category, NotFound }

/** 공통 라우터 컴포넌트 */
export function GlobalRouter() {
  const navigate = useNavigate()
  globalRouter.navigate = navigate

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
        {/* 메뉴 관리 페이지 */}
        <Route path="/menu" element={<Pages.Menu />}></Route>
        {/* 카테고리/태그 관리 페이지 */}
        <Route path="/category" element={<Pages.Category />}></Route>
        {/* 콘텐츠 관리 페이지 */}
        <Route path="/content" element={<Pages.Content />}></Route>
        {/* 검색 관리 페이지 */}
        <Route path="/search" element={<Pages.Search />}></Route>

        {/* 에러 페이지 */}
        <Route path="/error" element={<Pages.NotFound />}></Route>
        <Route path="*" element={<Pages.NotFound />}></Route>
      </Route>
    </Routes>
  )
}

/** 공통 라우터 */
const globalRouter = { navigate: null } as {
  navigate: null | NavigateFunction
}

export default globalRouter
