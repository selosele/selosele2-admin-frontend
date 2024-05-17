import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as DatePickerComponent } from '@mui/x-date-pickers/DatePicker'
import { BaseNonStaticPickerProps } from '@mui/x-date-pickers/internals'

/** 날짜입력필드 컴포넌트의 props 인터페이스 */
interface Props extends BaseNonStaticPickerProps {

  /** 날짜입력 이벤트 핸들러 함수 */
  onChange?: (value: any) => void

}

/** 날짜입력필드 컴포넌트 */
export default function DatePicker(props: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePickerComponent
          label='날짜를 선택하세요.'
          format={props.format || 'YYYY-MM-DD'}
          slotProps={{
            textField: {
              size: 'small',
              variant: 'filled'
            }
          }}
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}
