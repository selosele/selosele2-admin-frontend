import { Children } from '@/types/global'
import { Layout } from '..'

import './Container.css'

/** 레이아웃 Container 컴포넌트 */
export default function Container(props: Children) {
  return (
    <>
      <Layout.TopNav />

      <div className={`layout__container`}>
        {props.children}
      </div>

      <Layout.Footer />
    </>
  )
}
