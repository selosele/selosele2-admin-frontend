import { useEffect, useState } from 'react'
import { GridColDef } from '@mui/x-data-grid'
import { http } from '@/api'
import { datetimeUtil, deepCopy, messageUtil } from '@/utils'
import { UI } from '@/components/UI'
import useCodeStore from '@/store/code'
import useBreadcrumbStore from '@/store/breadcrumb'

/** 검색 관리 페이지 컴포넌트 */
export default function Search() {
  const breadcrumbStore = useBreadcrumbStore()
  const codeStore = useCodeStore()
  const [rows, setRows] = useState([])
  const [autoSaveDate, setAutoSaveDate] = useState([])
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'rownum' },
    { headerName: '유형', field: 'typeCdNm', flex: 1 }, // width값 설정 시 minWidth 속성을 사용해야 함
    { headerName: '자동 색인 여부', field: 'autoYnNm', flex: 1 },
    { headerName: '색인 건수', field: 'cnt', flex: 1 },
    { headerName: '색인 시작일시', field: 'startDate', flex: 1 },
    { headerName: '색인 종료일시', field: 'endDate', flex: 1 }
  ]

  /** 자동 색인 여부 반환 */
  function getAutoYn(autoYn: 'Y' | 'N'): string {
    switch (autoYn) {
      case 'Y': return '자동'
      case 'N': return '수동'
    }
  }

  /** 검색 색인 로그 목록 조회 */
  const listIndexSearchLog = (): void => {
    http.get('/indexsearchlog')
    .then(resp => {
      setRows(deepCopy(resp.data).map(d => {
        d.startDate = datetimeUtil(d.startDate).format('YYYY-MM-DD HH:mm:ss')
        d.endDate = datetimeUtil(d.endDate).format('YYYY-MM-DD HH:mm:ss')
        d.autoYnNm = getAutoYn(d.autoYn)
        d.typeCdNm = codeStore.data
          .filter(v => v.prefix === 'D03')
          .find(v => v.id === d.typeCd).nm

        return d
      }))
    })
  }

  /** 검색 색인 데이터 저장 */
  const saveIndexSearch = async (): Promise<void> => {
    const confirm = await messageUtil.confirmSuccess('데이터를 색인하시겠습니까?')
    if (!confirm) return

    http.post('/indexsearch')
    .then(() => {
      messageUtil.toastSuccess('색인 작업이 완료되었습니다.')
      listIndexSearchLog()
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('검색 관리')
  }, [])

  useEffect(() => {
    if (codeStore.data.length > 0) {
      listIndexSearchLog()
    }
  }, [codeStore.data])

  useEffect(() => {
    const autoY = rows.filter(d => d.autoYn === 'Y')
    if (autoY.length > 0) {
      setAutoSaveDate([
        autoY[0].startDate,
        autoY[0].endDate
      ])
    }
  }, [rows])

  return (
    <UI.DataGridContainer>
      <UI.DataGridButtonBox>
        <p>
          최근 자동색인 실행일시: {autoSaveDate[0]}(시작) - {autoSaveDate[1]}(종료)
        </p>

        <UI.DataGridButton
          text={'색인'}
          onClick={saveIndexSearch}
        />
        <UI.DataGridButton
          actionType={'REFRESH'}
          onClick={listIndexSearchLog}
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
