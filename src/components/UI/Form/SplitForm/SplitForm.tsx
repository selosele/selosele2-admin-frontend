import { Children } from '@/models'
import { Box, Button } from '@mui/material'

/** split form 컴포넌트의 props 인터페이스 */
interface Props {

  /** form */
  form?: any

  /** 저장버튼 사용 여부 */
  btnSave?: boolean

  /** 삭제버튼 사용 여부 */
  btnRemove?: boolean

  /** 삭제 */
  onRemove?: Function

  /** 닫기 */
  onClose?: Function

  /** split form의 children */
  children?: Children | {} | any

}

/** split form 컴포넌트 */
export default function SplitForm({ btnSave = true, ...props }: Props) {

  /** 삭제 */
  const onRemove = (values: any) => {
    props.onRemove(values)
  }

  /** 닫기 */
  const onClose = () => {
    props.onClose()
  }

  return (
    <form onSubmit={props.form.handleSubmit}>
      {props.children}

      <Box sx={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        {btnSave && (
          <Button
            type='submit'
            variant='contained'
          >
            저장
          </Button>
        )}

        {props.btnRemove && (
          <Button
            type='button'
            variant='outlined'
            onClick={() => onRemove(props.form.values)}
          >
            삭제
          </Button>
        )}

        <Button
          type='button'
          variant='outlined'
          onClick={() => onClose()}
        >
          닫기
        </Button>
      </Box>
    </form>
  )
}
