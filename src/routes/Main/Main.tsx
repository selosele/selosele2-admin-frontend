import { useEffect } from 'react'
import { Stat } from './Stat'
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
      <div className={`stat-container`}>
        <div className={`stat-box stat-box1`}>
          <Stat.Post />
        </div>
        
        <div className={`stat-box stat-box2`}>
          <Stat.IndexSearch />
        </div>

        <div className={`stat-box stat-box3`}>
          <div className={`stat-top`}>
            <strong className={`stat-title`}>색인소요시간 차트</strong>
          </div>
          
          {/* <div className={`stat-loading`}><UI.Loading /></div> */}
        </div>
      </div>
    </main>
  )
}
