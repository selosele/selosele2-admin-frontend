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
  useYn?: string

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
