import { useEffect, useState } from 'react'
import { http } from '@/api'
import { UI } from '@/components/UI'
import { CountPostStatDto } from '@/models'

/** 유형별 포스트 통계 컴포넌트 */
export default function PostStat() {
  const [data, setData] = useState<CountPostStatDto>(null)
  const [loading, setLoading] = useState(true)

  /** 유형별 포스트 개수 조회 */
  const countPostStat = (): void => {
    setLoading(true) // 새로고침 버튼 클릭 시, 로딩상태 초기화
    
    http.get('/post/stat')
    .then(resp => {
      setLoading(false)
      setData(resp.data)
    })
  }

  useEffect(() => {
    countPostStat()
  }, [])

  return (
    <>
      <div className={`stat-top`}>
        <strong className={`stat-title`}>포스트 통계</strong>
        <div className={`stat-button-container`}>
          <UI.Button
            actionType={'REFRESH'}
            height={'1.5rem'}
            fontSize={'0.8rem'}
            onClick={countPostStat}
          />
        </div>
      </div>
      {loading ? (
        <div className={`stat-loading`}><UI.Loading /></div>
      ) : (
        <ul className={`stat-list`}>
          <li>
            <span className={`stat-count`}>{data.total}</span>
            <span className={`stat-name`}>TOTAL</span>
          </li>
          <li>
            <span className={`stat-count`}>{data.normal}</span>
            <span className={`stat-name`}>공개글</span>
          </li>
          <li>
            <span className={`stat-count`}>{data.secret}</span>
            <span className={`stat-name`}>비공개글</span>
          </li>
          <li>
            <span className={`stat-count`}>{data.pin}</span>
            <span className={`stat-name`}>고정글</span>
          </li>
          <li>
            <span className={`stat-count`}>{data.tmp}</span>
            <span className={`stat-name`}>임시저장글</span>
          </li>
        </ul>
      )}
    </>
  )
}
