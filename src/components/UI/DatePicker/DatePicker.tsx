import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as DatePickerComponent } from '@mui/x-date-pickers/DatePicker'

/** 날짜입력필드 컴포넌트 */
export default function DatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePickerComponent
          label='날짜를 선택하세요.'
          format='YYYY-MM-DD'
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
