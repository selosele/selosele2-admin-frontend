import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { http } from '@/api'

/** 콘텐츠 관리 페이지 컴포넌트 */
export default function Content() {
  const [list, setList] = useState([])
  const columns: GridColDef<(typeof list)[number]>[] = [
    { headerName: '콘텐츠 URL', field: 'link' },
    { headerName: '콘텐츠 제목', field: 'title' },
    { headerName: '콘텐츠 등록일시', field: 'regDate' },
    { headerName: '콘텐츠 수정일시', field: 'modDate'  },
  ]

  useEffect(() => {
    http.get('/content')
    .then(resp => {
      setList(resp.data[0])
    })
  }, [])

  console.log(list)

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <Button
          variant="contained"
          href="https://blog.selosele.com/add-content"
          target="_blank"
        >
          콘텐츠 생성
        </Button>
        <Button
          variant="outlined"
        >
          콘텐츠 삭제
        </Button>
      </Box>

      <DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}