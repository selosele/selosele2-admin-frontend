import { useEffect, useState } from 'react'
import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import { UI } from '@/components/UI'
import { http } from '@/api'
import { deepCopy } from '@/utils'
import useBreadcrumbStore from '@/store/breadcrumb'
import CodeDetail from './CodeDetail'

/** 공통코드 관리 페이지 컴포넌트 */
export default function Code() {
  const breadcrumbStore = useBreadcrumbStore()
  const [isSplitterActive, setIsSplitterActive] = useState(false)
  const [codeDetail, setCodeDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState([])
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'rownum' },
    { headerName: '코드 ID', field: 'id', flex: 1 },
    { headerName: '코드 접두어', field: 'prefix', flex: 1 },
    { headerName: '코드 값', field: 'val', flex: 1 },
    { headerName: '코드 명', field: 'nm', flex: 1 },
    { headerName: '코드 설명', field: 'desc', flex: 1 },
    { headerName: '코드 사용 여부', field: 'useYn', flex: 1, align: 'center' },
  ]

   /** 코드 사용 여부 반환 */
   const getUseYn = (useYn: string): string => {
    switch (useYn) {
      case 'Y': return '사용'
      case 'N': return '미사용'
    }
  }

  /** 공통코드 목록 조회 */
  const listCode = (): void => {
    setLoading(true) // 새로고침 버튼 클릭 시, 로딩상태 초기화
    
    http.get('/code')
    .then(resp => {
      setLoading(false)
      setRows(deepCopy(resp.data).map(d => {
        d.useYn = getUseYn(d.useYn)
        return d
      }))
    })
  }

  /** 공통코드 상세 조회 */
  const getCode = (id: string): void => {
    http.get(`/code/${id}`)
    .then(resp => {
      setCodeDetail(resp.data)
      setIsSplitterActive(true)
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('공통코드 관리')
  }, [])

  useEffect(() => {
    listCode()
  }, [])
  
  return (
    <UI.Splitter>    
      <UI.SplitterPane>
        <UI.DataGridContainer>
          <UI.DataGridButtonBox>
            <UI.DataGridButton
              actionType={'REFRESH'}
              onClick={listCode}
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
            onCellClick={(param: GridCellParams) => getCode(param.row.id)}
          />
        </UI.DataGridContainer>
      </UI.SplitterPane>
       
      {isSplitterActive && (
        <UI.SplitterPane>
          <CodeDetail
            data={codeDetail}
            close={setIsSplitterActive}
            key={codeDetail.id}
          />
        </UI.SplitterPane>
      )}
    </UI.Splitter>
  )
}
