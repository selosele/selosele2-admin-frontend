import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 에러 페이지 컴포넌트 */
export default function NotFound() {
  const navigate = useNavigate()
  const breadcrumbStore = useBreadcrumbStore()

  useEffect(() => {
    breadcrumbStore.setPageTitle('에러 페이지')
  }, [])

  return (
    <>
      <p>에러가 발생했습니다.</p>
      <Button
        variant='outlined'
        sx={{ mt: '0.5rem' }}
        onClick={() => navigate('/system')}
      >
        홈으로 이동
      </Button>
    </>
  )
}
