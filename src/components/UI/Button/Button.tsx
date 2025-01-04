import { Button as ButtonComponent, useMediaQuery } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import { theme } from '@/utils'

/** 버튼 컴포넌트의 props 인터페이스 */
interface Props {

  /** 액션 유형 */
  actionType?: '' | 'ADD' | 'REFRESH' | 'REMOVE'
  
  /** 버튼 높이값 */
  height?: string

  /** 버튼 폰트사이즈 */
  fontSize?: string

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
export default function Button({ actionType = '', ...props }: Props) {

  /** 버튼 색상 반환 */
  const getVariant = () => {
    switch (actionType) {
      case '':        return 'contained'
      case 'ADD':     return 'contained'
      case 'REFRESH': return 'outlined'
      case 'REMOVE':  return 'outlined'
    }
  }

  /** 버튼 아이콘 컴포넌트 반환 */
  const getIcon = () => {
    switch (actionType) {
      case '':        return ''
      case 'ADD':     return <CreateIcon fontSize='small' />
      case 'REFRESH': return <RefreshIcon fontSize='small' />
      case 'REMOVE':  return <DeleteIcon fontSize='small' />
    }
  }

  const isFullWidth = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <ButtonComponent
      variant={getVariant()}
      fullWidth={isFullWidth}
      style={{
        height: props.height ?? '1.9rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        fontSize: props.fontSize ?? '0.875rem',
      }}
      { ...props }
    >
      {getIcon()}
      {props.text}
    </ButtonComponent>
  )
}
