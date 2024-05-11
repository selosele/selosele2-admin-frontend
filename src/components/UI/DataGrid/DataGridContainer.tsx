import { Box } from '@mui/material'
import { Children } from '@/models'

/** 데이터그리드 컨테이너의 props 인터페이스 */
interface DataGridContainerProps {

  /** 높이 값 */
  height?: string | number

  /** 데이터그리드의 children */
  children?: Children | {} | any

}

/** 데이터그리드 컨테이너 컴포넌트 */
export default function DataGridContainer(props: DataGridContainerProps) {
  return (
    <Box
      sx={{ width: '100%', height: props.height || 525 }}
    >
      {props.children}
    </Box>
  )
}
