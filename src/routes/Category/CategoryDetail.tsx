import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField } from '@mui/material'
import { Category } from '@/models'
import { UI } from '@/components/UI'
import { isEmpty, messageUtil } from '@/utils'
import { http } from '@/api'

/** 카테고리/태그 상세 조회 props 인터페이스 */
interface Props {

  /** 카테고리/태그 상세 데이터 */
  data?: Category

  /** 카테고리/태그 타입: D01004(카테고리), D01005(태그) */
  type?: string

  /** splitter 닫기 */
  close?: Function

  /** 트리 갱신 */
  refreshTree?: Function

}

/** 카테고리/태그 상세 조회 컴포넌트 */
export default function CategoryDetail(props: Props) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (props.type === 'D01004') setText('카테고리')
    if (props.type === 'D01005') setText('태그')
  }, [])

  /** 카테고리 저장 폼 */
  const saveCategoryForm = useFormik({
    initialValues: {
      /** 카테고리/태그 ID */
      id: props.data?.id,
      /** 카테고리/태그 타입 */
      type: props.type,
      /** 카테고리/태그 명 */
      nm: props.data?.nm || '',
      /** 카테고리/태그 설명 */
      desc: props.data?.desc || '',
      /** 카테고리/태그 등록일시 */
      regDate: props.data?.regDate || ''
    },
    validationSchema: Yup.object().shape({
      nm: Yup.string()
        .required('필수 입력 항목입니다')
        .max(50, '최대 50글자 이하여야 합니다'),
      desc: Yup.string()
        .max(100, '최대 100글자 이하여야 합니다')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      
      const confirm = await messageUtil.confirmSuccess('저장하시겠습니까?')
      if (!confirm) return

      // 카테고리 ID 값이 없으면 등록 API를 타고
      if (isEmpty(values.id)) {
        await addCategory(values)
      } else {
        // 있으면 수정 API를 탄다.
        await updateCategory(values)
      }
    }
  })

  /** 카테고리 등록 */
  const addCategory = async (values): Promise<void> => {
    return http.post(getApiUri(), values)
    .then(() => {
      messageUtil.toastSuccess('저장되었습니다.')
      props.refreshTree()
    })
  }

  /** 카테고리 수정 */
  const updateCategory = async (values): Promise<void> => {
    return http.put(getApiUri(), values)
    .then(() => {
      messageUtil.toastSuccess('저장되었습니다.')
      props.refreshTree()
    })
  }

  /** 카테고리/태그 삭제 */
  const onRemove = async (values): Promise<void> => {
    if (isEmpty(values.id)) return

    const confirm = await messageUtil.confirmSuccess('삭제하시겠습니까?')
    if (!confirm) return

    http.delete(`${getApiUri()}/${values.id}`)
    .then(() => {
      messageUtil.toastSuccess('삭제되었습니다.')
      props.refreshTree()
    })
  }

  /** 페이지 유형에 따른 API 호출 URI 반환 */
  const getApiUri = (): string => {
    if (props.type === 'D01004') return '/category'
    if (props.type === 'D01005') return '/tag'
    return ''
  }

  return (
    <UI.SplitForm
      form={saveCategoryForm}
      btnRemove={true}
      onRemove={() => onRemove(saveCategoryForm.values)}
      onClose={() => props.close(false)}
    >
      <div className={`detail-container`}>
        <input type='hidden' name='id' value={saveCategoryForm.values.id} />
        <input type='hidden' name='type' value={saveCategoryForm.values.type} />

        <TextField
          label={`${text} 명`}
          name='nm'
          value={saveCategoryForm.values.nm}
          onChange={saveCategoryForm.handleChange}
          error={saveCategoryForm.touched.nm && Boolean(saveCategoryForm.errors.nm)}
          helperText={saveCategoryForm.touched.nm && saveCategoryForm.errors.nm}
          variant='standard' fullWidth
        />

        <TextField
          label={`${text} 설명`}
          name='desc'
          value={saveCategoryForm.values.desc}
          onChange={saveCategoryForm.handleChange}
          error={saveCategoryForm.touched.desc && Boolean(saveCategoryForm.errors.desc)}
          helperText={saveCategoryForm.touched.desc && saveCategoryForm.errors.desc}
          variant='standard' fullWidth
        />

        <TextField
          label={`${text} 등록일시`}
          name='regDate'
          value={saveCategoryForm.values.regDate}
          onChange={saveCategoryForm.handleChange}
          error={saveCategoryForm.touched.regDate && Boolean(saveCategoryForm.errors.regDate)}
          helperText={saveCategoryForm.touched.regDate && saveCategoryForm.errors.regDate}
          variant='standard' fullWidth
          inputProps={
            { readOnly: true }
          }
        />
      </div>
    </UI.SplitForm>
  )
}
