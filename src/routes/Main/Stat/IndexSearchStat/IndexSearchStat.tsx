import { useEffect, useState } from 'react'
import { http } from '@/api'
import { UI } from '@/components/UI'
import { CountPostStatDto } from '@/models'
import { messageUtil } from '@/utils'

/** 유형별 색인 포스트 통계 컴포넌트 */
export default function IndexSearchStat() {
  const [data, setData] = useState<CountPostStatDto>(null)
  const [loading, setLoading] = useState(true)

  /** 색인 포스트 개수 조회 */
  const countIndexSearchStat = (): void => {
    http.get('/indexsearch/stat')
    .then(resp => {
      setLoading(false)
      setData(resp.data)
    })
  }

  /** 검색 색인 데이터 저장 */
  const saveIndexSearch = async (): Promise<void> => {
    const confirm = await messageUtil.confirmSuccess('데이터를 색인하시겠습니까?')
    if (!confirm) return

    setLoading(true) // 색인 버튼 클릭 시, 로딩상태 초기화

    http.post('/indexsearch')
    .then(() => {
      messageUtil.toastSuccess('색인 작업이 완료되었습니다.')
      countIndexSearchStat()
    })
  }

  useEffect(() => {
    countIndexSearchStat()
  }, [])

  return (
    <>
      <div className={`stat-top`}>
        <strong className={`stat-title`}>색인 포스트 통계</strong>
        <div className={`stat-button-container`}>
          <UI.Button
            text={'색인'}
            height={'1.5rem'}
            fontSize={'0.8rem'}
            onClick={saveIndexSearch}
          />
          <UI.Button
            actionType={'REFRESH'}
            height={'1.5rem'}
            fontSize={'0.8rem'}
            onClick={countIndexSearchStat}
          />
        </div>
      </div>
      {
        loading
          ? <div className={`stat-loading`}><UI.Loading /></div>
          : <>
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
            </ul>
          </>
      }
    </>
  )
}
