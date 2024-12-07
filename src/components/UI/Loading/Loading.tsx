import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

/** 로딩 컴포넌트 */
export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  )
}
