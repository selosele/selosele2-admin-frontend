import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup as RadioGroupComponent, RadioGroupProps as RadioGroupComponentProps } from '@mui/material'
import { Value } from '@/models'

/** radio 그룹 컴포넌트의 props 인터페이스 */
export interface Props extends RadioGroupComponentProps {

  /** label */
  label?: string

  /** label의 id */
  labelid?: string // labelId로 작성 시 브라우저 console에 오류 출력됨

  /** radio 비활성화 여부 */
  disabled?: boolean

  /** radio 목록 */
  list?: Value[]

}

/** radio 그룹 컴포넌트 */
export default function RadioGroup(props: Props) {
  return (
    <FormControl sx={{ display: 'flex' }}>
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
            disabled={props.disabled}
          />
        ))}
      </RadioGroupComponent>
    </FormControl>
  )
}
