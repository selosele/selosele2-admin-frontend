import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as RadioGroupComponent } from '@mui/material'
import { RadioGroupProps } from '@/models'

/** radio 그룹 컴포넌트 */
export default function RadioGroup(props: RadioGroupProps) {
  return (
    <FormControl>
      <FormLabel id={props.labelid}>
        {props.label}
      </FormLabel>

      <RadioGroupComponent
        aria-labelledby={props.labelid}
        {...props}
      >
        {props.list?.length > 0 && props.list.map((item,index) => (
          <FormControlLabel
            key={index}
            value={item.value}
            control={<Radio />}
            label={item.text}
          />
        ))}
      </RadioGroupComponent>
    </FormControl>
  )
}
