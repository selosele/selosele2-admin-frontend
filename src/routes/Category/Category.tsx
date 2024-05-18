import { useEffect, useState } from 'react'
import { Box, Button, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { UI } from '@/components/UI'
import { http } from '@/api'
import { Category as CategoryData, TreeNode } from '@/models'
import { BLOG_URL, datetimeUtil, deepCopy, isEmpty } from '@/utils'
import useBreadcrumbStore from '@/store/breadcrumb'
import CategoryDetail from './CategoryDetail'

/** 카테고리/태그 관리 페이지 컴포넌트 */
export default function Category() {
  const breadcrumbStore = useBreadcrumbStore()
  const [tabIndex, setTabIndex] = useState('0')
  const [isSplitterActive, setIsSplitterActive] = useState(true)
  const [categoryDetail, setCategoryDetail] = useState(null as CategoryData)
  const [categoryTree, setCategoryTree] = useState([] as TreeNode[])
  const [tagTree, setTagTree] = useState([] as TreeNode[])
  const [type, setType] = useState('')

  /** 탭 클릭 이벤트 핸들러 */
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue)
    setCategoryDetail(null)

    if (newValue === '0') setType('category')
    if (newValue === '1') setType('tag')
  }

  /** 카테고리-포스트 계층형 구조 조회 */
  const listCategoryTreeAndPost = async (): Promise<void> => {
    http.get('/category/list/tree')
    .then(resp => {
      createTree(resp.data, 'D01004')
    })
  }

  /** 태그-포스트 계층형 구조 조회 */
  const listTagTreeAndPost = async (): Promise<void> => {
    http.get('/tag/list/tree')
    .then(resp => {
      createTree(resp.data, 'D01005')
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('카테고리/태그 관리')
  }, [])

  useEffect(() => {
    if (tabIndex === '0') setType('category')
    if (tabIndex === '1') setType('tag')
  }, [tabIndex])

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        listCategoryTreeAndPost(),
        listTagTreeAndPost()
      ])
    }
    fetchData()
  }, [])

  let categoryArr = []
  let tagArr = []
  
  /** 트리 배열에 node 넣기 */
  const pushNode = (node: TreeNode, type: string): void => {
    if (type === 'D01004') {
      categoryArr.push(node)
      setCategoryTree(categoryArr)
    } else if (type === 'D01005') {
      tagArr.push(node)
      setTagTree(tagArr)
    }
  }

  /** 트리 생성 */
  const createTree = (data: CategoryData[], type: string): void => {
    data.forEach(parent => {
      let childNodes = []

      if (type === 'D01004') childNodes = parent.postCategory
      if (type === 'D01005') childNodes = parent.postTag

      // 최상위(카테고리/태그) node
      let rootNode: TreeNode = {
        id: parent.id,
        label: parent.nm,
        nodes: childNodes.map((child, _, self) => {
          if (self.length === 0) return {}

          // 자식(포스트) node를 반환
          return {
            id: child.postId,
            label: child.post.title,
          }
        })
      }

      // node를 배열에 넣는다.
      pushNode(rootNode, type)
    })
  }

  /** 포스트 node인지 확인 */
  const isPostNode = (nodes: TreeNode[]): boolean => {
      
    // 자식 node들이 없으면 포스트 node이고, 있으면 카테고리/태그 node이다.
    return isEmpty(nodes)
  }

  /** node 클릭 시 */
  const onNodeClick = async (node: TreeNode): Promise<void> => {
    setIsSplitterActive(true)

    // 포스트 node를 클릭하면
    if (isPostNode(node.nodes)) {

      // 해당 포스트 뷰 페이지로 이동한다.
      window.open(`${BLOG_URL}/post/${node.id}`)
      return
    }

    // 똑같은 node를 여러번 클릭해서 API가 호출되는 것을 막기 위해, node.id와 category.id가 다를 때만 API를 호출한다.
    if (!isPostNode(node.nodes) && node.id !== categoryDetail?.id) {
      await getCategory(node)
    }
  }

  /** 카테고리/태그 조회 */
  const getCategory = async (node: TreeNode): Promise<void> => {
    if (tabIndex === '0') setType('category')
    if (tabIndex === '1') setType('tag')

    return http.get(`/${type}/${node.id}`)
    .then(resp => {
      const detail: CategoryData = deepCopy(resp.data)
      detail.regDate = datetimeUtil(detail.regDate).format('YYYY-MM-DD HH:mm:ss')
      setCategoryDetail({ ...detail })
    })
  }

  /** 카테고리/태그 추가 */
  const addCategory = (): void => {
    resetCategory()
    setIsSplitterActive(true)
  }

  /** 카테고리/태그 초기화 */
  const resetCategory = (): void => {
    setCategoryDetail({})

    if (categoryDetail !== null) {
      categoryDetail.id = null
    }
  }

  /** 트리 갱신 */
  const refreshTree = async (): Promise<void> => {
    resetCategory()
    setCategoryTree([])
    setTagTree([])

    await Promise.all([
      listCategoryTreeAndPost(),
      listTagTreeAndPost()
    ])
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'right', marginBottom: '0.75rem' }}>
        <Button variant='contained' onClick={() => addCategory()}>
          추가
        </Button>
      </Box>

      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label='카테고리' value='0' />
            <Tab label='태그' value='1' />
          </TabList>
        </Box>

        <TabPanel value='0'>
          <UI.Splitter>
            <UI.SplitterPane>
              <UI.Tree
                value={categoryTree}
                onNodeClick={onNodeClick}
              />
            </UI.SplitterPane>

            {isSplitterActive && (
              <UI.SplitterPane>
                <CategoryDetail
                  data={categoryDetail}
                  type={'D01004'}
                  close={setIsSplitterActive}
                  refreshTree={refreshTree}
                  key={`${type}${categoryDetail?.id}`}
                />
              </UI.SplitterPane>
            )}
          </UI.Splitter>
        </TabPanel>

        <TabPanel value='1'>
          <UI.Splitter>
            <UI.SplitterPane>
              <UI.Tree
                value={tagTree}
                onNodeClick={onNodeClick}
              />
            </UI.SplitterPane>

            {isSplitterActive && (
              <UI.SplitterPane>
                <CategoryDetail
                  data={categoryDetail}
                  type={'D01005'}
                  close={setIsSplitterActive}
                  refreshTree={refreshTree}
                  key={`${type}${categoryDetail?.id}`}
                />
              </UI.SplitterPane>
            )}
          </UI.Splitter>
        </TabPanel>
      </TabContext>
    </Box>
  )
}
