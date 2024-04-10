import './Container.css'
import { Children } from '@/types/global'

/** 레이아웃 Container 컴포넌트 */
export default function Container(props: Children) {
  return (
    <div className={`layout__container`}>
      {props.children}
    </div>
  )
}
