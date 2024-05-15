import { Children } from '@/models'
import SplitterComponent from 'm-react-splitters'

import 'm-react-splitters/lib/splitters.css'
import './Splitter.css'

/** splitter 컴포넌트의 props 인터페이스 */
interface Props {

  /** splitter의 children */
  children?: Children | {} | any

}

/** splitter 컴포넌트 */
export default function Splitter(props: Props) {
  return (
    <SplitterComponent
      position='vertical'
      {...props}
    >    
      {props.children}
    </SplitterComponent>
  )
}
