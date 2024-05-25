import { Value } from './input'
import { ListMenuDto } from '../dto/list-menu'

/** 메뉴 인터페이스 */
export interface Menu {

  /** 메뉴 ID */
  id?: number

  /** 상위 메뉴 ID */
  parentId?: number

  /** 메뉴명 */
  name?: string

  /** 메뉴 링크 */
  link?: string

  /** 메뉴 정렬 순서 */
  sort?: number

  /** 메뉴 계층 */
  depth?: number

  /** 메뉴 외부 링크 여부 */
  externalYn?: string

  /** 메뉴 사용 여부 */
  useYn?: 'Y' | 'N'

  /** 메뉴 등록일시 */
  regDate?: string

  /** 메뉴 수정일시 */
  modDate?: string
  
  /** 상위 메뉴 */
  parent?: Menu

  /** 하위 메뉴 */
  children?: Menu[]

  /** 메뉴 권한 */
  menuRole?: MenuRole[]

}

/** 메뉴 권한 인터페이스 */
export class MenuRole {

  /** 메뉴 ID */
  menuId?: number

  /** 권한 ID */
  roleId?: string

  /** 메뉴 */
  menu?: Menu
  
}

/** 메뉴 상태 인터페이스 */
export interface MenuState {

  /** 메뉴 목록 */
  data: Menu[]

  /** 상위 메뉴 목록 */
  parentData: Value[]

  /** 메뉴 목록 조회 */
  listData: (listMenuDto?: ListMenuDto) => Promise<Menu[]>

  /** 상위 메뉴 목록 조회 */
  listParentData: (data: Menu[]) => Value[]

  /** 상위 메뉴 목록 설정 */
  setParentData: (data: Value[]) => void
  
}
