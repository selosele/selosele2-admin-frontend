/** 포스트 인터페이스 */
export interface Post {

  /** 포스트 ID */
  id?: number

  /** 포스트 제목 */
  title?: string

  /** 포스트 등록일시 */
  regDate?: Date

  /** 포스트 수정일시 */
  modDate?: Date

  /** 포스트 댓글 수 */
  replyCnt?: number
  
  /** 포스트 내용 */
  cont?: string
  
  /** 포스트 내용의 순수 텍스트 */
  rawText?: string
  
  /** 포스트 대표 이미지 */
  ogImg?: string
  
  /** 포스트 대표 이미지 URL */
  ogImgUrl?: string
  
  /** 포스트 대표 이미지 용량 */
  ogImgSize?: number
  
  /** 포스트 내용 요약 */
  ogDesc?: string
  
  /** 포스트 비공개 여부 */
  secretYn?: 'Y' | 'N'
  
  /** 포스트 상단고정 여부 */
  pinYn?: 'Y' | 'N'

  /** 포스트 임시저장 여부 */
  tmpYn?: 'Y' | 'N'

}

