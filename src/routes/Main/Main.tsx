import { useEffect } from 'react'
import useBreadcrumbStore from '@/store/breadcrumb'

import './Main.css'

/** 메인 페이지 컴포넌트 */
export default function Main() {
  const breadcrumbStore = useBreadcrumbStore()

  useEffect(() => {
    breadcrumbStore.setPageTitle('')
  }, [])

  return (
    <main>
      메인 페이지
    </main>
  )
}
