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
  options?: SelectBoxOption[]

  /** 셀렉트박스의 change 이벤트 */
  onChange?: any

}

/** 셀렉트박스 option 태그 목록 */
export interface SelectBoxOption {

  /** 셀렉트박스 값 */
  value?: any

  /** 셀렉트박스 텍스트 */
  text?: string

}

