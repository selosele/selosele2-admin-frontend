import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'
import { Menu, Value } from '@/models'
import { UI } from '@/components/UI'
import { isEmpty, messageUtil } from '@/utils'
import { http } from '@/api'

/** 메뉴 상세 조회 props 인터페이스 */
interface Props {

  /** 메뉴 상세 데이터 */
  data?: Menu

  /** 상위 메뉴 목록 */
  parentMenuList?: Value[]

  /** splitter 닫기 */
  close?: Function

  /** 트리 갱신 */
  refreshTree?: Function

}

/** 메뉴 상세 조회 컴포넌트 */
export default function MenuDetail(props: Props) {
  const [role, setRole] = useState('')
  const [roleList, setRoleList] = useState([] as Value[])

  /** 메뉴 저장 폼 */
  const saveMenuForm = useFormik({
    initialValues: {
      /** 메뉴 ID */
      id: props.data?.id,
      /** 상위 메뉴 ID */
      parentId: props.data?.parentId || undefined,
      /** 메뉴 계층 */
      depth: props.data?.depth || 1,
      /** 메뉴 명 */
      name: props.data?.name || '',
      /** 메뉴 링크 */
      link: props.data?.link || '',
      /** 메뉴 등록일시 */
      regDate: props.data?.regDate || '',
      /** 메뉴 정렬 순서 */
      sort: props.data?.sort || 1,
      /** 메뉴 권한 */
      role: role,
      /** 메뉴 외부 링크 여부 */
      externalYn: props.data?.externalYn || 'N',
      /** 메뉴 사용 여부 */
      useYn: props.data?.useYn || 'Y',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required('필수 입력 항목입니다')
        .max(50, '최대 50글자 이하여야 합니다'),
      link: Yup.string()
        .required('필수 입력 항목입니다')
        .max(255, '최대 255글자 이하여야 합니다'),
      sort: Yup.number()
        .required('필수 입력 항목입니다'),
      externalYn: Yup.string()
        .required('필수 입력 항목입니다'),
      useYn: Yup.string()
        .required('필수 입력 항목입니다')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?')
      if (!confirm) return

      // 메뉴 ID 값이 없으면 등록 API를 타고
      if (isEmpty(values.id)) {
        await addMenu(values)
      } else {
        // 있으면 수정 API를 탄다.
        await updateMenu(values)
      }
      await listMenu()
    }
  })

  useEffect(() => {
    async function fetchData() {
      await listRole()
    }
    fetchData()
  }, [])

  useEffect(() => {
    setRole(getMenuRoleModel())
  }, [roleList])

  /** 메뉴 목록 조회 */
  const listMenu = async (): Promise<void> => {
    return http.get('/menu/list/tree', { params: { useYn: 'Y' } })
    .then(resp => {
      props.refreshTree()
    })
  }

  /** 권한 목록 조회 */
  const listRole = async (): Promise<void> => {
    return http.get('/auth/role')
    .then(resp => {
      setRoleList([
        ...resp.data.map(d => ({
          value: d.roleId,
          text: d.roleNm
        }))
      ])
    })
  }

  /** 메뉴 등록 */
  const addMenu = async (values): Promise<void> => {
    return http.post('/menu', values)
    .then(resp => {
      messageUtil.toastSuccess('저장되었습니다.')

      saveMenuForm.setFieldValue('menuId', resp.data.id)
      props.refreshTree()
    })
  }

  /** 메뉴 수정 */
  const updateMenu = async (values): Promise<void> => {
    return http.put('/menu', values)
    .then(resp => {
      messageUtil.toastSuccess('저장되었습니다.')

      saveMenuForm.setFieldValue('menuId', resp.data.id)
      props.refreshTree()
    })
  }

  /** 메뉴 삭제 */
  const onRemove = async (values): Promise<void> => {
    if (isEmpty(values.id)) return

    const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?')
    if (!confirm) return

    http.delete(`/menu/${values.id}`)
    .then(async () => {
      messageUtil.toastSuccess('삭제되었습니다.')
      await listMenu()
    })
  }

  /** 메뉴 권한 model 얻기 */
  const getMenuRoleModel = (): string => {
    if (props.data?.menuRole.length > 0) {
      const list = props.data.menuRole.filter(m => {
        return roleList.filter(r => r.value === m.roleId).length > 0
      })
      return list.length > 1 ? '' : list[0]?.roleId
    }
    return ''
  }

  /** 상위메뉴선택 셀렉트박스 선택 시 실행 */
  const handleParentIdChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    updateDepth(event.target.value as string)
  }

  /** 권한선택 셀렉트박스 선택 시 실행 */
  const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setRole(event.target.value as string)
  }

  /** 메뉴 계층 갱신 */
  const updateDepth = (value: string): void => {
    if (isEmpty(value)) {
      saveMenuForm.setFieldValue('depth', 1)
      return
    }
    saveMenuForm.setFieldValue('depth', 2)
  }

  return (
    <UI.SplitForm
      form={saveMenuForm}
      btnRemove={true}
      onRemove={() => onRemove(saveMenuForm.values)}
      onClose={() => props.close(false)}
    >
      <div className={`detail-container`}>
        <input type='hidden' name='id' value={saveMenuForm.values.id} />
        <input type='hidden' name='depth' value={saveMenuForm.values.depth} />

        <UI.SelectBox
          // label='상위 메뉴'
          labelId='menuParentId'
          name='parentId'
          defaultValue={{ value: '', text: '상위 메뉴 선택' }}
          value={saveMenuForm.values.parentId}
          options={props.parentMenuList}
          onChange={handleParentIdChange}
        />

        <TextField
          label='메뉴 명'
          name='name'
          value={saveMenuForm.values.name}
          onChange={saveMenuForm.handleChange}
          error={saveMenuForm.touched.name && Boolean(saveMenuForm.errors.name)}
          helperText={saveMenuForm.touched.name && saveMenuForm.errors.name}
          variant='standard' fullWidth
        />

        <TextField
          label='메뉴 링크'
          name='link'
          value={saveMenuForm.values.link}
          onChange={saveMenuForm.handleChange}
          error={saveMenuForm.touched.link && Boolean(saveMenuForm.errors.link)}
          helperText={saveMenuForm.touched.link && saveMenuForm.errors.link}
          variant='standard' fullWidth
        />

        <TextField
          label='메뉴 등록일시'
          name='regDate'
          value={saveMenuForm.values.regDate}
          onChange={saveMenuForm.handleChange}
          error={saveMenuForm.touched.regDate && Boolean(saveMenuForm.errors.regDate)}
          helperText={saveMenuForm.touched.regDate && saveMenuForm.errors.regDate}
          variant='standard' fullWidth
          inputProps={
            { readOnly: true }
          }
        />

        <TextField
          type='number'
          label='메뉴 정렬 순서'
          name='sort'
          value={saveMenuForm.values.sort}
          onChange={saveMenuForm.handleChange}
          error={saveMenuForm.touched.sort && Boolean(saveMenuForm.errors.sort)}
          helperText={saveMenuForm.touched.sort && saveMenuForm.errors.sort}
          variant='standard' fullWidth
          sx={{ input: { textAlign: 'right' } }}
        />

        <UI.SelectBox
          // label='메뉴 권한'
          labelId='menuRoles'
          name='role'
          defaultValue={{ value: '', text: '모든 권한 허용' }}
          value={role}
          options={roleList}
          onChange={handleRoleChange}
        />

        <UI.RadioGroup
          row
          label='메뉴 외부 링크 여부'
          labelid='menuExternalYn'
          name='externalYn'
          value={saveMenuForm.values.externalYn}
          onChange={saveMenuForm.handleChange}
          list={[
            { value: 'Y', text: '예' },
            { value: 'N', text: '아니오' }
          ]}
        />

        <UI.RadioGroup
          row
          label='메뉴 사용 여부'
          labelid='menuUseYn'
          name='useYn'
          value={saveMenuForm.values.useYn}
          onChange={saveMenuForm.handleChange}
          list={[
            { value: 'Y', text: '사용' },
            { value: 'N', text: '미사용' }
          ]}
        />
      </div>
    </UI.SplitForm>
  )
}
