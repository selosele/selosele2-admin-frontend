import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { GridColDef } from '@mui/x-data-grid'
import { UI } from '@/components/UI'
import { http } from '@/api'
import { deepCopy } from '@/utils'
import { SearchSatisfactionDto } from '@/models'
import useCodeStore from '@/store/code'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 만족도조사 관리 페이지 컴포넌트 */
export default function Satisfaction() {
  const breadcrumbStore = useBreadcrumbStore()
  const codeStore = useCodeStore()
  const [rows, setRows] = useState([])
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'rownum' },
    { headerName: '페이지 URL', field: 'pagePath', flex: 1 },
    { headerName: '만족도 점수', field: 'score', flex: 1 },
    { headerName: '만족도 의견', field: 'comment', flex: 1 },
    { headerName: '참여일시', field: 'regDate', flex: 1 }
  ]

  /** 만족도조사 목록 조회 */
  const listSatisfaction = (searchSatisfactionDto: SearchSatisfactionDto) => {
    http.get('/satisfaction', { params: searchSatisfactionDto })
    .then(resp => {
      setRows(deepCopy(resp.data).map(d => {
        d.regDate = dayjs(d.regDate).format('YYYY-MM-DD HH:mm:ss')
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
            regDate: dayjs(regDate).format('YYYY-MM-DD')
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
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20
            }
          }
        }}
      />
    </UI.DataGridContainer>
  )
}
