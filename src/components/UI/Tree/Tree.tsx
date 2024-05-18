import { Box } from '@mui/material'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import { TreeNode } from '@/models'

/** tree 컴포넌트의 props 인터페이스 */
interface Props {

  /** node키 구분 값 */
  keyType?: string

  /** tree max width */
  maxWidth?: number

  /** tree 노드 목록 */
  value?: TreeNode[]

  /** tree 노드 클릭 이벤트 핸들러 */
  onNodeClick?: Function
  
}

/** tree 컴포넌트 */
export default function Tree(props: Props) {
  return (
    <Box sx={{ maxWidth: props.maxWidth || 540 }}>
      <SimpleTreeView>
        {props.value?.map((node,index) => (
          <TreeItem
            key={`${props.keyType}-parent-${node.id}-${index}`}
            itemId={`${props.keyType}-parent-${node.id}-${index}`} // itemId가 문자열이 아닐시 오류 발생
            label={node.label}
            onClick={() => props.onNodeClick(node)}
          >
            {node?.nodes.map((node,index) => (
              <TreeItem
                key={`${props.keyType}-child-${node.id}-${index}`}
                itemId={`${props.keyType}-child-${node.id}-${index}`} // itemId가 문자열이 아닐시 오류 발생
                label={node.label}
                onClick={() => props.onNodeClick(node)}
              />
            ))}
          </TreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  )
}
