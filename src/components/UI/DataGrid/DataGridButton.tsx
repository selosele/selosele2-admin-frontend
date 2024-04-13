import { Button, useMediaQuery } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import { theme } from '@/utils'

interface Props {

  /** 액션 유형 */
  actionType?: string

  /** 버튼 텍스트 */
  text?: string

  /** 버튼 아이콘 컴포넌트 */
  icon?: JSX.Element | null

  /** 버튼 href */
  href?: string

  /** 새창 target */
  target?: string

  /** 클릭 이벤트 핸들러 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/** 데이터그리드 버튼 컴포넌트 */
export default function DataGridButton({ actionType = 'ADD', ...props }: Props) {

  /** 버튼 색상 리턴 */
  const getVariant = () => {
    switch (actionType) {
      case 'ADD': return 'contained'
      case 'REFRESH': return 'outlined'
      case 'REMOVE': return 'outlined'
    }
  }

  /** 버튼 아이콘 컴포넌트 리턴 */
  const getIcon = () => {
    switch (actionType) {
      case 'ADD': return <CreateIcon />
      case 'REFRESH': return <RefreshIcon />
      case 'REMOVE': return <DeleteIcon />
    }
  }

  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Button
      variant={getVariant()}
      fullWidth={isFullWidth}
      { ...props }
    >
      {getIcon()}
      {props.text}
    </Button>
  )
}
