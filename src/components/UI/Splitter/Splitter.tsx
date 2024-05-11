import { Children } from '@/models'
import SplitterComponent from 'm-react-splitters'

import 'm-react-splitters/lib/splitters.css'
import './Splitter.css'

/** splitter 컴포넌트의 props 인터페이스 */
interface SplitterProps {

  /** splitter의 children */
  children?: Children | {} | any

}

/** splitter 컴포넌트 */
export default function Splitter(props: SplitterProps) {
  return (
    <SplitterComponent
      position='vertical'
      // primaryPaneWidth={0}
      // primaryPaneMinWidth={0}
      {...props}
    >    
      {props.children}
    </SplitterComponent>
  )
}
