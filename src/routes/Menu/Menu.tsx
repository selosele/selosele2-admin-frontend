import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { UI } from '@/components/UI'
import { http } from '@/api'
import { Menu as MenuData, TreeNode } from '@/models'
import { datetimeUtil, deepCopy } from '@/utils'
import useBreadcrumbStore from '@/store/breadcrumb'
import useMenuStore from '@/store/menu'
import MenuDetail from './MenuDetail'

/** 메뉴 관리 페이지 컴포넌트 */
export default function Menu() {
  const breadcrumbStore = useBreadcrumbStore()
  const menuStore = useMenuStore()
  const [isSplitterActive, setIsSplitterActive] = useState(true)
  const [menuTree, setMenuTree] = useState<TreeNode[]>([])
  const [menuDetail, setMenuDetail] = useState<MenuData>(null)

  const listMenuTree = async (): Promise<void> => {
    resetMenu()
    setMenuTree([])

    return menuStore.listData()
    .then(data => {
      createTree(data)
      menuStore.setParentData(menuStore.listParentData(data))
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('메뉴 관리')
  }, [])

  useEffect(() => {
    async function fetchData() {
      await listMenuTree()
    }
    fetchData()
  }, [])

  /** 트리 배열에 node 넣기 */
  const pushNode = (node: TreeNode): void => {
    setMenuTree(value => [...value, node])
  }

  /** 트리 생성 */
  const createTree = (data: MenuData[]): void => {
    data.forEach(parent => {

      /** 최상위 node */
      let rootNode: TreeNode = {
        id: parent.id,
        label: parent.name,
        sort: parent.sort,
        nodes: parent.children.map((child, _, self) => {
          if (self.length === 0) return {}

          // 자식 node를 반환
          return {
            id: child.id,
            label: child.name,
            sort: child.sort
          }
        })
      }

      // node를 배열에 넣는다.
      pushNode(rootNode)
    })
  }

  /** node 클릭 시 */
  const onNodeClick = async (node: TreeNode): Promise<void> => {
    setIsSplitterActive(true)

    // 똑같은 node를 여러 번 클릭해서 API가 호출되는 것을 막기 위해, node.id와 menu.id가 다를 때만 API를 호출한다.
    if (node.id !== menuDetail?.id) {
      await getMenu(node)
    }
  }

  /** 메뉴 추가 */
  const addMenu = (): void => {
    resetMenu()
    setIsSplitterActive(true)
  }

  /** 메뉴 초기화 */
  const resetMenu = (): void => {
    if (menuDetail !== null) {
      setMenuDetail(null)
      menuStore.setParentData([])
    }
  }

  /** 트리 갱신 */
  const refreshTree = async (): Promise<void> => {
    await listMenuTree()
  }

  /** 메뉴 조회 */
  const getMenu = async (node: TreeNode): Promise<void> => {
    return http.get(`/menu/${node.id}`)
    .then(resp => {
      const detail: MenuData = deepCopy(resp.data)
      detail.regDate = datetimeUtil(detail.regDate).format('YYYY-MM-DD HH:mm:ss')

      setMenuDetail({ ...detail })
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: '0.75rem' }}>
        <Button variant='contained' onClick={() => addMenu()}>
          추가
        </Button>
      </Box>

      <UI.Splitter>
        <UI.SplitterPane>
          <UI.Tree
            value={menuTree}
            onNodeClick={onNodeClick}
          />
        </UI.SplitterPane>

        {isSplitterActive && (
          <UI.SplitterPane>
            <MenuDetail
              data={menuDetail}
              close={setIsSplitterActive}
              refreshTree={refreshTree}
              key={menuDetail?.id}
            />
          </UI.SplitterPane>
        )}
      </UI.Splitter>
    </Box>
  )
}
