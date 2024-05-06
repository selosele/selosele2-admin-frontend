import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import NativeSelect from '@mui/material/NativeSelect'
import { SelectBoxProps } from '@/models'

/** 셀렉트박스 컴포넌트 */
export default function SelectBox(props: SelectBoxProps) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel variant='filled' size='small' htmlFor={props.labelId}>
          {props.label}
        </InputLabel>
        <NativeSelect
          value={props.value}
          defaultValue={props.defaultValue}
          inputProps={{
            name: props.name,
            id: props.labelId
          }}
          onChange={props.onChange}
        >
          {props.options?.length > 0 && props.options.map((item,index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  )
}
