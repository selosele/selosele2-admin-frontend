import { useState } from 'react'
import { FormControl, InputLabel, MenuItem, SelectChangeEvent, Select as SelectComponent } from '@mui/material'

/** 셀렉트박스 컴포넌트 */
export default function SelectBox(props) {
  const [value, setValue] = useState('')
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value)
    props.onChange(event)
  }

  return (
    <FormControl variant='filled' size='small'>
      <InputLabel id={props.labelId}>
        {props.label}
      </InputLabel>

      <SelectComponent
        labelId={props.labelId}
        label={props.label}
        value={value}
        onChange={handleChange}
      >
        {props.list && props.list.length > 0 && props.list.map((item,index) => (
          <MenuItem key={index} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </SelectComponent>
    </FormControl>
  )
}
