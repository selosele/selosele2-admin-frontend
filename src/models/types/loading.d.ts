/** 로딩 상태 인터페이스 */
export interface LoadingState {

  /** 로딩 상태 */
  isLoading: boolean

  /** 로딩 상태 설정 */
  setIsLoading: (isLoading: boolean) => void
  
}
