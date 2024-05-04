import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { http } from '@/api'
import { UI } from '@/components/UI'
import { BLOG_URL, deepCopy, isNotEmpty, messageUtil } from '@/utils'
import moment from 'moment'

/** 콘텐츠 관리 페이지 컴포넌트 */
export default function Content() {
  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([])
  const [list, setList] = useState([])
  const columns: GridColDef<(typeof list)[number]>[] = [
    { headerName: '콘텐츠 URL', field: 'link', flex: 1 }, // width값 설정 시 minWidth 속성을 사용해야 함
    { headerName: '콘텐츠 제목', field: 'title', flex: 1 },
    { headerName: '콘텐츠 등록일시', field: 'regDate', flex: 1 },
    { headerName: '콘텐츠 수정일시', field: 'modDate' , flex: 1 },
  ]

  /** 콘텐츠 목록 조회 */
  const listContent = () => {
    http.get('/content')
    .then(resp => {
      setList(deepCopy(resp.data[0]).map(d => {
        d.regDate = moment(d.regDate).format('YYYY-MM-DD HH:mm:ss')

        if (isNotEmpty(d.modDate)) {
          d.modDate = moment(d.modDate).format('YYYY-MM-DD HH:mm:ss')
        }
        return d
      }))
    })
  }
  useEffect(listContent, [])

  /** 콘텐츠 삭제 */
  const removeContents = async () => {
    if (rowSelection.length === 0) {
      messageUtil.toastWarning('삭제할 콘텐츠를 선택하세요.')
      return
    }

    const confirm = await messageUtil.confirmQuestion('삭제하시겠습니까?')
    if (!confirm) return

    let removeContentDto = []

    rowSelection.forEach(id => {
      removeContentDto.push({ id })
    })

    http.post('/content/remove', removeContentDto)
    .then(() => {
      listContent()
      messageUtil.toastSuccess('삭제되었습니다.')
    })
  }
  
  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <UI.DataGridButtonBox>
        <UI.DataGridButton
          actionType={'ADD'}
          text={'콘텐츠 생성'}
          href={`${BLOG_URL}/add-content`}
          target="_blank"
        />
        <UI.DataGridButton
          actionType={'REMOVE'}
          text={'콘텐츠 삭제'}
          onClick={removeContents}
        />
        <UI.DataGridButton
          actionType={'REFRESH'}
          onClick={listContent}
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
        checkboxSelection
        // disableRowSelectionOnClick
        onRowSelectionModelChange={setRowSelection}
        onCellDoubleClick={(param, _) => {
          window.open(`${BLOG_URL}/content${param.row.link}`)
        }}
      />
    </Box>
  )
}