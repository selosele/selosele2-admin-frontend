import { Navigate, Outlet } from 'react-router-dom'
import { isNotBlank } from '@/utils'
import { Layout } from '@/components/Layout'

export default function PrivateRoute() {

  /** 로그인 여부 */
  const isLogin = () => isNotBlank(window.localStorage.getItem('accessToken'))

  if (isLogin()) {
    // 인증이 반드시 필요한 페이지
    return (
      <Layout.Container>
        <Outlet />
      </Layout.Container>
    )
  }
  // 미로그인 유저가 이동할 곳
  return <Navigate replace to='/login' />
}
