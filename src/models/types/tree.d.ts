/** tree 노드 인터페이스 */
export interface TreeNode {

  /** 노드 ID */
  id?: string | number
  
  /** 노드 명 */
  label?: string

  /** 노드 정렬 순서 */
  sort?: number

  /** 자식 노드 목록 */
  nodes?: TreeNode[]

}
