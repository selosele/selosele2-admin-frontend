import { Children } from '@/models'
import TopNav from '../TopNav/TopNav'
import Footer from '../Footer/Footer'
import useBreadcrumbStore from '@/store/breadcrumb'

import './Container.css'

/** 레이아웃 Container 컴포넌트 */
export default function Container(props: Children) {
  const breadcrumbStore = useBreadcrumbStore()

  return (
    <>
      <TopNav />

      <div className={`layout-container`}>
        {breadcrumbStore.pageTitle !== '' && (
          <h1 className={`layout-page-title`}>
            {breadcrumbStore.pageTitle}
          </h1>
        )}

        {props.children}
      </div>

      <Footer />
    </>
  )
}
