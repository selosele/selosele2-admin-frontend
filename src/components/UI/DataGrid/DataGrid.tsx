import { DataGrid as DataGridComponent, DataGridProps } from '@mui/x-data-grid'

/** 데이터그리드 컴포넌트 */
export default function DataGrid(props: DataGridProps) {
  props.columns.forEach(c => {
    if (c.field === 'rownum') {
      c.headerName = 'No'
    }
    props.rows.forEach((r,j) => r.rownum = j+1)
  })

  return (
    <DataGridComponent
      {...props}
    />
  )
}
