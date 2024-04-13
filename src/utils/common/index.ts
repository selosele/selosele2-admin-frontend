/** 블로그 URL */
export const BLOG_URL = 'https://blog.selosele.com'

/** 값이 비었는지 확인한다. */
export function isEmpty(value: any): boolean {
  return null === value || undefined === value || '' === value
}

/** 값이 있는지 확인한다. */
export function isNotEmpty(value: any): boolean {
  return !isEmpty(value)
}

/** 문자열 값이 비었는지 확인한다. */
export function isBlank(value: any): boolean {
  return isEmpty(value) || 0 === value.trim().length
}

/** 문자열 값이 있는지 확인한다. */
export function isNotBlank(value: any): boolean {
  return !isBlank(value)
}
