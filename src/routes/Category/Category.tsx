import { useEffect } from 'react'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 카테고리/태그 관리 페이지 컴포넌트 */
export default function Category() {
  const breadcrumbStore = useBreadcrumbStore()

  useEffect(() => {
    breadcrumbStore.setPageTitle('카테고리/태그 관리')
  }, [])

  return (
    <div>카테고리/태그 관리 페이지</div>
  )
}
