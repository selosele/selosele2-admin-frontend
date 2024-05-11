import { NativeSelectProps, RadioGroupProps as RadioGroupComponentProps } from '@mui/material'

/** radio 그룹 컴포넌트의 props 인터페이스 */
export interface RadioGroupProps extends RadioGroupComponentProps {

  /** label */
  label?: string

  /** label의 id */
  labelid?: string // labelId로 작성 시 브라우저 console에 오류 출력됨

  /** radio 목록 */
  list?: Value[]

}

/** 셀렉트박스 컴포넌트의 props 인터페이스 */
export interface SelectBoxProps extends NativeSelectProps {

  /** label */
  label?: string

  /** label의 id */
  labelId?: string

  /** 셀렉트박스의 name */
  name?: string

  /** 셀렉트박스의 value */
  value?: unknown

  /** 셀렉트박스의 기본 value */
  defaultValue?: unknown

  /** option 태그 목록 */
  options?: Value[]

  /** 셀렉트박스의 change 이벤트 */
  onChange?: any

}

/** 입력필드의 value 값 목록 */
export interface Value {

  /** value */
  value?: any

  /** 내용 */
  text?: string

}

