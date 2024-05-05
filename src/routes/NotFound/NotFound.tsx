import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

/** 에러 페이지 컴포넌트 */
export default function NotFound() {
  const navigate = useNavigate()

  return (
    <>
      <p>에러가 발생했습니다.</p>
      <Button
        variant='outlined'
        sx={{ mt: '0.5rem' }}
        onClick={() => navigate('/')}
      >
        홈으로 이동
      </Button>
    </>
  )
}
