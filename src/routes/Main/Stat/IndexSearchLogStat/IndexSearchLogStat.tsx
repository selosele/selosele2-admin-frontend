import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart'
import { http } from '@/api'
import { UI } from '@/components/UI'

/** 유형별 색인 로그 통계 컴포넌트 */
export default function IndexSearchLogStat() {
  const [loading, setLoading] = useState(true)
  const [dataset, setDataset] = useState([])

  /** 검색 색인 로그 목록 조회 */
  const listIndexSearchLog = (): void => {
    setLoading(true) // 새로고침 버튼 클릭 시, 로딩상태 초기화
    setDataset([])   // 새로고침 버튼 클릭 시, 데이터 초기화

    http.get('/indexsearchlog')
    .then(resp => {
      setLoading(false)
      setDataset(resp.data)
    })
  }

  useEffect(() => {
    listIndexSearchLog()
  }, [])

  return (
    <>
      <div className={`stat-top`}>
        <strong className={`stat-title`}>
          <Link to='/system/search'>색인건수 통계</Link>
        </strong>
        <div className={`stat-button-container`}>
          <UI.Button
            actionType={'REFRESH'}
            height={'1.5rem'}
            fontSize={'0.8rem'}
            onClick={listIndexSearchLog}
          />
        </div>
      </div>
      {loading ? (
        <div className={`stat-loading`}>
          <UI.Loading />
        </div>
      ) : (
        <LineChart
          xAxis={[
            {
              id: 'REG_DATE',
              dataKey: 'regDate',
              scaleType: 'time',
              // valueFormatter: (value) => datetimeUtil(value).format('YYYY년 MM월 DD일')
            },
          ]}
          series={[
            {
              id: 'CNT',
              dataKey: 'cnt',
            },
          ]}
          dataset={dataset
            .sort((a,b) => a.id - b.id)
            .map(d => ({
              regDate: new Date(d.regDate),
              cnt: d.cnt
            }))
          }
          height={400}
          grid={{ vertical: true, horizontal: true }}
        />
      )}
    </>
  )
}
