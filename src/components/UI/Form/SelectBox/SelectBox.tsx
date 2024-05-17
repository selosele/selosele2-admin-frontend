import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect, { NativeSelectProps } from '@mui/material/NativeSelect'
import { Value } from '@/models'

/** 셀렉트박스 컴포넌트의 props 인터페이스 */
export interface Props extends NativeSelectProps {

  /** label */
  label?: string

  /** label의 id */
  labelId?: string

  /** 셀렉트박스의 name */
  name?: string

  /** 셀렉트박스의 value */
  value?: unknown

  /** 셀렉트박스의 기본 value */
  defaultValue?: Value

  /** option 태그 목록 */
  options?: Value[]

  /** 셀렉트박스의 change 이벤트 */
  onChange?: any

}

/** 셀렉트박스 컴포넌트 */
export default function SelectBox(props: Props) {
  let options: Value[] = []

  if (props?.defaultValue) {
    options.push(props.defaultValue)
  }

  if (props.options?.length) {
    props.options.forEach(d => options.push(d))
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl style={{ width: '100%' }}>
        <InputLabel variant='filled' size='small' htmlFor={props.labelId}>
          {props.label}
        </InputLabel>
        <NativeSelect
          value={props.value}
          inputProps={{
            name: props.name,
            id: props.labelId
          }}
          onChange={props.onChange}
        >
          {options.length > 0 && options.map((item,index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  )
}
