import { Children } from '@/models'
import { Layout } from '..'
import useBreadcrumbStore from '@/store/breadcrumb'

import './Container.css'

/** 레이아웃 Container 컴포넌트 */
export default function Container(props: Children) {
  const breadcrumbStore = useBreadcrumbStore()

  return (
    <>
      <Layout.TopNav />

      <div className={`layout-container`}>
        {breadcrumbStore.pageTitle !== '' && (
          <h1 className={`layout-page-title`}>
            {breadcrumbStore.pageTitle}
          </h1>
        )}

        {props.children}
      </div>

      <Layout.Footer />
    </>
  )
}
