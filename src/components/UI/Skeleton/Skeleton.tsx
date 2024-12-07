import Box from '@mui/material/Box'
import SkeletonComponent from '@mui/material/Skeleton'

/** 스켈레톤 컴포넌트의 props 인터페이스 */
interface Props {

  /** 스켈레톤 width */
  width?: number

  /** 표출할 스켈레톤 수 */
  count?: number
  
}


/** 스켈레톤 컴포넌트 */
export default function Skeleton(props: Props) {
  return (
    <Box sx={{ width: props.width || '100%' }}>
      {Array.from({ length: props.count || 1 }, (_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </Box>
  )
}
