import { useEffect } from 'react'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 메뉴 관리 페이지 컴포넌트 */
export default function Menu() {
  const breadcrumbStore = useBreadcrumbStore()

  useEffect(() => {
    breadcrumbStore.setPageTitle('메뉴 관리')
  }, [])

  return (
    <div>메뉴 관리 페이지</div>
  )
}
