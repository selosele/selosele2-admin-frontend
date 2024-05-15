/** tree 노드 인터페이스 */
export interface TreeNode {

  /** 노드 ID */
  id?: string
  
  /** 노드 명 */
  label?: string

  /** 자식 노드 목록 */
  nodes?: TreeNode[]

}
