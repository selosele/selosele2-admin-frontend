/** 공통코드 인터페이스 */
export interface Code {

  /** 코드 ID */
  id?: string

  /** 코드 접두어 */
  prefix?: string

  /** 코드 값 */
  val?: string

  /** 코드 명 */
  nm?: string

  /** 코드 설명 */
  desc?: string

  /** 코드 사용 여부 */
  useYn?: 'Y' | 'N'

}

/** 공통코드 상태 인터페이스 */
export interface CodeState {

  /** 공통코드 목록 */
  data: Code[]

  /** 공통코드 목록 조회 */
  listData: () => Promise<void>
  
}
