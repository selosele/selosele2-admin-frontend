/** Breadcrumb 상태 인터페이스 */
export interface BreadcrumbState {

  /** 페이지 타이틀 */
  pageTitle?: string

  /** 페이지 타이틀 설정 */
  setPageTitle: (pageTitle: string) => void
  
}
