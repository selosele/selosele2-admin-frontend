import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { http } from '@/api'
import { deepCopy, messageUtil } from '@/utils'
import { UI } from '@/components/UI'
import useCodeStore from '@/store/code'
import moment from 'moment'

/** 검색 관리 페이지 컴포넌트 */
export default function Search() {
  const codeStore = useCodeStore()
  const [list, setList] = useState([])
  const [autoSaveDate, setAutoSaveDate] = useState(null)
  const columns: GridColDef<(typeof list)[number]>[] = [
    { headerName: 'No', field: 'rownum', flex: 1 },
    { headerName: '유형', field: 'typeCdNm', minWidth: 50, flex: 1 }, // width값 설정 시 minWidth 속성을 사용해야 함
    { headerName: '자동 색인 여부', field: 'autoYnNm', minWidth: 100, flex: 1 },
    { headerName: '색인 건수', field: 'cnt', minWidth: 150, flex: 1 },
    { headerName: '색인 시작일시', field: 'startDate', minWidth: 100, flex: 1 },
    { headerName: '색인 종료일시', field: 'endDate', minWidth: 100, flex: 1 },
  ]

  /** 자동 색인 여부 반환 */
  function getAutoYn(autoYn: 'Y' | 'N'): string {
    switch (autoYn) {
      case 'Y': return '자동'
      case 'N': return '수동'
    }
  }

  /** 검색 색인 로그 목록 조회 */
  const listIndexSearchLog = () => {
    http.get('/indexsearchlog')
    .then(resp => {
      setList(deepCopy(resp.data).map(d => {
        d.startDate = moment(d.startDate).format('YYYY-MM-DD HH:mm:ss')
        d.endDate = moment(d.endDate).format('YYYY-MM-DD HH:mm:ss')
        d.autoYnNm = getAutoYn(d.autoYn)
        d.typeCdNm = codeStore.data
          .filter(v => v.prefix === 'D03')
          .find(v => v.id === d.typeCd).nm

        return d
      }))
    })
  }

  /** 검색 색인 데이터 저장 */
  const saveIndexSearch = async () => {
    const confirm = await messageUtil.confirmSuccess('데이터를 색인하시겠습니까?')
    if (!confirm) return

    http.post('/indexsearch')
    .then(() => {
      messageUtil.toastSuccess('색인 작업이 완료되었습니다.')
      listIndexSearchLog()
    })
  }

  useEffect(() => {
    listIndexSearchLog()
  }, [])

  useEffect(() => {
    const autoY = list.filter(d => d.autoYn === 'Y')
    if (autoY.length > 0) {
      setAutoSaveDate(autoY[0].endDate)
    }
  }, [list])

  return (
    <Box sx={{ width: '100%', height: 500 }}>
      <UI.DataGridButtonBox>
        <p>
          최근 자동 색인 실행 일시: {autoSaveDate}
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

      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
      />
    </Box>
  )
}
