import { Children } from '@/models'

/** splitter pane 컴포넌트 */
export default function SplitterPane(props: Children) {
  return (
    <div className={`splitter-wrapper`}>
      {props.children}
    </div>
  )
}
