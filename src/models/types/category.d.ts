import { Post } from './post'

/** 카테고리/태그 인터페이스 */
export interface Category {

  /** 카테고리/태그 ID */
  id?: string

  /** 카테고리/태그 명 */
  nm?: string

  /** 카테고리/태그 설명 */
  desc?: string

  /** 카테고리/태그 등록일시 */
  regDate?: string

  /** 카테고리/태그 수정일시 */
  modDate?: string

  /** 포스트 카테고리 목록 */
  postCategory?: PostCategory[]

  /** 포스트 태그 목록 */
  postTag?: PostTag[]

}

/** 포스트 카테고리 인터페이스 */
export interface PostCategory {

  /** 카테고리 ID */
  categoryId?: number

  /** 포스트 */
  post?: Post

  /** 포스트 ID */
  postId?: number

}

/** 포스트 태그 인터페이스 */
export interface PostTag {

  /** 태그 ID */
  tagId?: number

  /** 포스트 */
  post?: Post

  /** 포스트 ID */
  postId?: number

}
