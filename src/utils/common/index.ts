import { useNavigate } from "react-router-dom"

/** 블로그 URL */
export const BLOG_URL = 'https://blog.selosele.com'

/** 값이 비었는지 확인한다. */
export function isEmpty(value: any): boolean {
  return value === null || value === undefined || value === ''
}

/** 값이 있는지 확인한다. */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value)
}

/** 문자열 값이 비었는지 확인한다. */
export function isBlank(value: any): boolean {
  return isEmpty(value) || value.trim().length === 0
}

/** 문자열 값이 있는지 확인한다. */
export function isNotBlank(value: any): boolean {
  return !isBlank(value)
}

/** 깊은 복사를 해서 반환한다. */
export function deepCopy(value: any): any {
  return JSON.parse(JSON.stringify(value))
}

/** 페이지를 이동한다. */
export function handleNavigation(path: string) {
  const navigate = useNavigate()
  navigate(path)
}
