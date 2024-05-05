import { Box } from '@mui/material'
import { Children } from '@/models'

/** 데이터그리드 컨테이너 컴포넌트 */
export default function DataGridContainer(props: Children) {
  return (
    <Box
      sx={{ width: '100%', height: 500 }}
    >
      {props.children}
    </Box>
  )
}
