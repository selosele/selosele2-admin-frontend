import { NavigateFunction, Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import NotFound from './NotFound/NotFound'
import Login from './Login/Login'
import Main from './Main/Main'
import Code from './Code/Code'
import Content from './Content/Content'
import Search from './Search/Search'
import Menu from './Menu/Menu'
import Category from './Category/Category'
import Satisfaction from './Satisfaction/Satisfaction'
import PostReply from './PostReply/PostReply'

/** 페이지 컴포넌트 */
const Pages = {
  Login, Main, Code, Content,
  Search, Menu, Category,
  Satisfaction, PostReply, NotFound
}

/** 공통 라우터 컴포넌트 */
export function GlobalRouter() {
  const navigate = useNavigate()
  globalRouter.navigate = navigate

  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path='/system/login' element={<Pages.Login />} />

      {/* 로그인이 필요한 페이지들 */}
      <Route element={<PrivateRoute />}>

        {/* 메인 페이지 */}
        <Route path='/system' element={<Pages.Main />} />
        {/* 공통코드 관리 페이지 */}
        <Route path='/system/code' element={<Pages.Code />} />
        {/* 메뉴 관리 페이지 */}
        <Route path='/system/menu' element={<Pages.Menu />} />
        {/* 카테고리/태그 관리 페이지 */}
        <Route path='/system/category' element={<Pages.Category />} />
        {/* 포스트 댓글 관리 페이지 */}
        <Route path='/system/post-reply' element={<Pages.PostReply />} />
        {/* 콘텐츠 관리 페이지 */}
        <Route path='/system/content' element={<Pages.Content />} />
        {/* 만족도조사 관리 페이지 */}
        <Route path='/system/satisfaction' element={<Pages.Satisfaction />} />
        {/* 검색 관리 페이지 */}
        <Route path='/system/search' element={<Pages.Search />} />

        {/* 에러 페이지 */}
        <Route path='/system/error' element={<Pages.NotFound />} />
        <Route path='*' element={<Pages.NotFound />} />
      </Route>
    </Routes>
  )
}

/** 공통 라우터 */
const globalRouter = { navigate: null } as {
  navigate: null | NavigateFunction
}

export default globalRouter
