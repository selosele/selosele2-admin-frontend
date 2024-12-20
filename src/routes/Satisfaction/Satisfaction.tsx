import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { UI } from '@/components/UI'
import { http } from '@/api'
import { BLOG_URL, datetimeUtil, deepCopy } from '@/utils'
import { SearchSatisfactionDto } from '@/models'
import useCodeStore from '@/store/code'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 만족도조사 관리 페이지 컴포넌트 */
export default function Satisfaction() {
  const breadcrumbStore = useBreadcrumbStore()
  const codeStore = useCodeStore()
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'rownum' },
    { headerName: '페이지 URL', field: 'pagePath', flex: 1 },
    { headerName: '만족도 점수', field: 'score', flex: 1 },
    { headerName: '만족도 의견', field: 'comment', flex: 1 },
    { headerName: '참여일시', field: 'regDate', flex: 1 }
  ]

  /** 만족도조사 목록 조회 */
  const listSatisfaction = (searchSatisfactionDto: SearchSatisfactionDto): void => {
    setLoading(true) // 새로고침 버튼 클릭 시, 로딩상태 초기화
    
    http.get('/satisfaction', { params: searchSatisfactionDto })
    .then(resp => {
      setLoading(false)
      setRows(deepCopy(resp.data).map(d => {
        d.regDate = datetimeUtil(d.regDate).format('YYYY-MM-DD HH:mm:ss')
        d.score = codeStore.data
          .filter(v => v.prefix === 'B01' && (v.val === d.score))
          .map(v => v.nm)

        return d
      }))
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('만족도조사 관리')
  }, [])

  useEffect(() => {
    if (codeStore.data.length > 0) {
      listSatisfaction({ isToday: 'N' })
    }
  }, [codeStore.data])

  return (
    <UI.DataGridContainer>
      <UI.DataGridButtonBox>
        <UI.DatePicker
          onChange={(regDate: string) => listSatisfaction({
            isToday: 'N',
            regDate: datetimeUtil(regDate).format('YYYY-MM-DD')
          })}
        />

        <UI.DataGridButton
          text={'전체'}
          actionType={''}
          onClick={() => listSatisfaction({ isToday: 'N' })}
        />
        <UI.DataGridButton
          text={'Today'}
          actionType={''}
          onClick={() => listSatisfaction({ isToday: 'Y' })}
        />
        <UI.DataGridButton
          actionType={'REFRESH'}
          onClick={() => listSatisfaction({ isToday: 'N' })}
        />
      </UI.DataGridButtonBox>

      <UI.DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20
            }
          }
        }}
        onCellDoubleClick={(param,_) => {
          window.open(`${BLOG_URL}${param.row.pagePath}`)
        }}
      />
    </UI.DataGridContainer>
  )
}
