import { create } from 'zustand'
import { http } from '@/api'
import { AuthState } from '@/types/auth'
import { handleNavigation, messageUtil } from '@/utils'

/** 인증 Store */
const useAuthStore = create<AuthState>(() => ({
  logout: () => {
    http.post('/auth/signout')
    .then(() => {
      http.defaults.headers.common['Authorization'] = ''
      window.localStorage.removeItem('accessToken')
      handleNavigation('/login')
    }).catch(err => {
          
      // 리프레시 토큰 오류로 인해 로그아웃이 불가한 경우, 액세스 토큰을 삭제한다.
      if (err?.response?.status === 401) {
        messageUtil.toastError('인증 오류가 발생했습니다.')
        window.localStorage.removeItem('accessToken')
        handleNavigation('/login')
      }
    })
  }
}))

export default useAuthStore
