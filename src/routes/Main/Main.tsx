import { useEffect, useState } from 'react'
import { http } from '@/api'
import { UI } from '@/components/UI'
import { messageUtil } from '@/utils'
import useBreadcrumbStore from '@/store/breadcrumb'

import './Main.css'

/** 메인 페이지 컴포넌트 */
export default function Main() {
  const breadcrumbStore = useBreadcrumbStore()

  const [total, setTotal] = useState(0)
  const [normal, setNormal] = useState(0)
  const [secret, setSecret] = useState(0)
  const [pin, setPin] = useState(0)
  const [tmp, setTmp] = useState(0)

  const [countPostStatLoading, setCountPostStatLoading] = useState(true)
  const [countIndexSearchStatLoading, setCountIndexSearchStatLoading] = useState(true)

  /** 유형별 포스트 개수 조회 */
  const countPostStat = (): void => {
    http.get('/post/stat')
    .then(resp => {
      setCountPostStatLoading(false)

      const { total, normal, secret, pin, tmp } = resp.data
      setTotal(total)
      setNormal(normal)
      setSecret(secret)
      setPin(pin)
      setTmp(tmp)
    })
  }

  /** 색인 포스트 개수 조회 */
  const countIndexSearchStat = (): void => {
    console.log(countIndexSearchStatLoading);
  }

  /** 검색 색인 데이터 저장 */
  const saveIndexSearch = async (): Promise<void> => {
    const confirm = await messageUtil.confirmSuccess('데이터를 색인하시겠습니까?')
    if (!confirm) return

    setCountIndexSearchStatLoading(true) // 색인 버튼 클릭 시, 로딩상태 초기화

    http.post('/indexsearch')
    .then(() => {
      messageUtil.toastSuccess('색인 작업이 완료되었습니다.')
      countIndexSearchStat()
    })
  }

  useEffect(() => {
    breadcrumbStore.setPageTitle('')
    countPostStat()
  }, [])

  return (
    <main>
      <div className={`stat-container`}>
        <div className={`stat-box stat-box1`}>
          <div className={`stat-top`}>
            <strong className={`stat-title`}>포스트 통계</strong>
          </div>
          {
            countPostStatLoading
              ? <div className={`stat-loading`}><UI.Loading /></div>
              : <>
                <ul className={`stat-list`}>
                  <li>
                    <span className={`stat-count`}>{total}</span>
                    <span className={`stat-name`}>TOTAL</span>
                  </li>
                  <li>
                    <span className={`stat-count`}>{normal}</span>
                    <span className={`stat-name`}>공개글</span>
                  </li>
                  <li>
                    <span className={`stat-count`}>{secret}</span>
                    <span className={`stat-name`}>비공개글</span>
                  </li>
                  <li>
                    <span className={`stat-count`}>{pin}</span>
                    <span className={`stat-name`}>고정글</span>
                  </li>
                  <li>
                    <span className={`stat-count`}>{tmp}</span>
                    <span className={`stat-name`}>임시저장글</span>
                  </li>
                </ul>
              </>
          }
        </div>
        
        <div className={`stat-box stat-box2`}>
          <div className={`stat-top`}>
            <strong className={`stat-title`}>색인 포스트 통계</strong>
            <UI.Button
              text={'색인'}
              height={'1.5rem'}
              fontSize={'0.8rem'}
              onClick={saveIndexSearch}
            />
          </div>

          <div className={`stat-loading`}><UI.Loading /></div>
        </div>

        <div className={`stat-box stat-box3`}>
          <div className={`stat-top`}>
            <strong className={`stat-title`}>색인소요시간 차트</strong>
          </div>
          
          <div className={`stat-loading`}><UI.Loading /></div>
        </div>
      </div>
    </main>
  )
}
