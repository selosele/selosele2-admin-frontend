import { DataGrid as DataGridComponent, DataGridProps, GridColDef } from '@mui/x-data-grid'

/** 데이터그리드 컴포넌트 */
export default function DataGrid({ columns, rows, ...otherProps }: DataGridProps) {
  
  // 컬럼 수정
  const modifiedColumns: GridColDef[] = columns.map(column => {
    if (column.field === 'rownum') {
      return { ...column, headerName: 'No' }
    }
    return column
  })

  // rownum 추가
  const modifiedRows = rows.map((row, index) => ({
    ...row,
    rownum: index + 1
  }))

  return (
    <DataGridComponent
      columns={modifiedColumns}
      rows={modifiedRows}
      {...otherProps}
    />
  )
}
