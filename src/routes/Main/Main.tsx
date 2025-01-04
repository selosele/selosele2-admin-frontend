import { useEffect, useState } from 'react'
import { http } from '@/api'
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

  /** 유형별 포스트 개수 조회 */
  const countPostStat = (): void => {
    http.get('/post/stat')
    .then(resp => {
      const { total, normal, secret, pin, tmp } = resp.data
      setTotal(total)
      setNormal(normal)
      setSecret(secret)
      setPin(pin)
      setTmp(tmp)
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
          {/* 유형별 포스트 개수 통계 */}
          <ul className={`stat-list`}>
            <li>
              <span className={`stat-count`}>{total}</span>
              <span className={`stat-title`}>TOTAL</span>
            </li>
            <li>
              <span className={`stat-count`}>{normal}</span>
              <span className={`stat-title`}>공개글</span>
            </li>
            <li>
              <span className={`stat-count`}>{secret}</span>
              <span className={`stat-title`}>비공개글</span>
            </li>
            <li>
              <span className={`stat-count`}>{pin}</span>
              <span className={`stat-title`}>고정글</span>
            </li>
            <li>
              <span className={`stat-count`}>{tmp}</span>
              <span className={`stat-title`}>임시저장글</span>
            </li>
          </ul>
        </div>
        
        <div className={`stat-box stat-box2`}>
          색인 포스트 개수 통계
        </div>

        <div className={`stat-box stat-box3`}>
          색인소요시간 차트
        </div>
      </div>
    </main>
  )
}
