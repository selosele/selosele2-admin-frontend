import { Box } from '@mui/material'
import { Children } from '@/models'

/** 데이터그리드 버튼 박스 컴포넌트 */
export default function DataGridButtonBox(props: Children) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'end',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem'
      }}
    >
      {props.children}
    </Box>
  )
}
