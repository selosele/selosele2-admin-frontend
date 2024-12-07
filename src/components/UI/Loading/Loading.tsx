import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

/** 로딩 컴포넌트의 props 인터페이스 */
interface Props {

  /** 풀스크린 로딩 여부 */
  full?: boolean

}

/** 로딩 컴포넌트 */
export default function Loading(props: Props) {
  const sx = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    ...(props.full && {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '9999',
      width: '100%',
      height: '100%',
    }),
  }

  return (
    <Box sx={sx}>
      <CircularProgress />
    </Box>
  )
}
