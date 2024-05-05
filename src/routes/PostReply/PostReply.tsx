import { useEffect, useState } from 'react'
import { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'
import { SelectChangeEvent } from '@mui/material'
import { UI } from '@/components/UI'
import { BLOG_URL, deepCopy, isNotBlank, messageUtil } from '@/utils'
import { http } from '@/api'
import { ListPostReplyDto } from '@/models'
import dayjs from 'dayjs'

/** 포스트 댓글 관리 페이지 컴포넌트 */
export default function PostReply() {
  const [option, setOption] = useState('')
  const [rowSelection, setRowSelection] = useState<GridRowSelectionModel>([])
  const [list, setList] = useState([])
  const columns: GridColDef<(typeof list)[number]>[] = [
    { headerName: '댓글 URL', field: 'link', flex: 1 },
    { headerName: '댓글 내용', field: 'cont', flex: 1 },
    { headerName: '댓글 등록일시', field: 'regDate', flex: 1 },
    { headerName: '댓글 수정일시', field: 'modDate', flex: 1 }
  ]

  /** 포스트 댓글 목록 조회 */
  const listPostReplyAll = () => {
    let listPostReplyDto: ListPostReplyDto = {}

    if (isNotBlank(option)) {
      listPostReplyDto[option] = 'Y'
    }

    http.get('/postreply', { params: listPostReplyDto })
    .then(resp => {
      setList(deepCopy(resp.data).map(d => {
        d.link = `/post/${d.parentId}`
        d.regDate = dayjs(d.regDate).format('YYYY-MM-DD HH:mm:ss')

        if (isNotBlank(d.modDate)) {
          d.modDate = dayjs(d.modDate).format('YYYY-MM-DD HH:mm:ss')
        }
        return d
      }))
    })
  }
  useEffect(listPostReplyAll, [])

  /** 삭제된 포스트 댓글 복구 */
  const restorePostReply = async () => {
    if (rowSelection.length === 0) {
      messageUtil.toastWarning('항목을 선택하세요.')
      return
    }

    const confirm = await messageUtil.confirmSuccess('복구하시겠습니까?')
    if (!confirm) return

    http.put('/postreply/restore', rowSelection)
    .then(() => {
      messageUtil.toastSuccess('복구되었습니다.')
    })
  }

  /** 조회조건 셀렉트박스 선택 시 실행 */
  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value)
    listPostReplyAll()
  }

  return (
    <UI.DataGridContainer>
      <UI.DataGridButtonBox>
        <UI.SelectBox
          label='조회조건'
          labelId='postReplyOption'
          value={option}
          list={[
            { value: '',        text: '전체' },  
            { value: 'adminYn', text: '관리자 작성 댓글' },
            { value: 'delYn',   text: '삭제된 댓글' }
          ]}
          onChange={handleOptionChange}
        />

        {option === 'delYn' && (
          <UI.DataGridButton
            text={'복구'}
            onClick={restorePostReply}
          />
        )}

        <UI.DataGridButton
          actionType={'REFRESH'}
          onClick={listPostReplyAll}
        />
      </UI.DataGridButtonBox>

      <UI.DataGrid
        rows={list}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20
            }
          }
        }}
        checkboxSelection
        // disableRowSelectionOnClick
        onRowSelectionModelChange={setRowSelection}
        onCellDoubleClick={(param,_) => {
          window.open(`${BLOG_URL}/content/${param.row.parentId}`)
        }}
      />
    </UI.DataGridContainer>
  )
}
