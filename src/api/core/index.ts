import axios from 'axios'
import useAuthStore from '@/store/auth'
import globalRouter from '@/routes'
import { isNotBlank, messageUtil } from '@/utils'
import { getState as getLoadingState } from '@/store/loading'

/** axios 인스턴스 */
const http = axios.create({
  baseURL: '/api',
  headers: {
    'Cache-Control': 'no-cache',
  }
})

http.interceptors.request.use(
  config => {
    /** 액세스 토큰 */
    const accessToken = window.localStorage.getItem('accessToken')
    if (isNotBlank(accessToken)) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    
    /** 데이터 변경(post, put, delete) 작업을 수행하나, 로딩을 표출하지 않을 요청 url 목록 */
    const noLoadingrequestUrls = ['/auth/refresh']

    /** 데이터 변경 메서드(post, put, delete) */
    const isDataChangeRequest = (config.method === 'post' || config.method === 'put' || config.method === 'delete')

    if (isDataChangeRequest && noLoadingrequestUrls.indexOf(config.url) === -1) {
      const loadingStore = getLoadingState()
      loadingStore.setIsLoading(true)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let isRefreshing = false

http.interceptors.response.use(
  response => {
    const loadingStore = getLoadingState()
    loadingStore.setIsLoading(false)

    return response
  },
  async error => {
    const originalRequest = error.config

    const loadingStore = getLoadingState()
    loadingStore.setIsLoading(false)

    if (isNotBlank(error?.response?.data?.type) && error?.response?.data?.type === 'biz') {
      // 비즈니스 로직 예외 처리
      messageUtil.toastError(error.response.data?.message)
    } else {
      // JWT 만료 시 오류 발생 메시지는 사용자 입장에서 '조용한 갱신'이라고 느껴지지 않음
      //messageUtil.toastError('오류가 발생했습니다.')
    }

    // 권한 오류 및 JWT 만료 시
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true
        isRefreshing = true

        try {
          const { data } = await http.post('/auth/refresh')
          const newAccessToken = data.accessToken
          
          window.localStorage.setItem('accessToken', newAccessToken)
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          originalRequest._retry = false
          isRefreshing = false

          return http(originalRequest) // try~catch 블록 바깥에서 return을 하면 HTTP 요청 순서가 꼬이게 됨
        } catch (error) {
          console.error('Error refreshing access token:', error)
          
          // 강제 로그아웃
          useAuthStore.getState().logout()
          
          return Promise.reject(error)
        }
      }
    }

    // 404 오류
    if (error?.response?.status === 404) {
      globalRouter.navigate('/system/error')
    }
    return Promise.reject(error)
  }
)

export { http }
