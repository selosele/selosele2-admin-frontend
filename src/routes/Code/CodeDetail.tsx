import * as Yup from 'yup'
import { useFormik } from 'formik'
import { TextField } from '@mui/material'
import { Code } from '@/models'
import { UI } from '@/components/UI'

/** 공통코드 상세 조회 props 인터페이스 */
interface Props {

  /** 공통코드 상세 데이터 */
  data: Code

  /** splitter 닫기 */
  close?: Function

}

/** 공통코드 상세 조회 컴포넌트 */
export default function CodeDetail(props: Props) {

  /** 공통코드 저장 폼 */
  const saveCodeForm = useFormik({
    initialValues: {
      /** 코드 ID */
      id: props.data?.id || '',
      /** 코드 접두어 */
      prefix: props.data?.prefix || '',
      /** 코드 값 */
      val: props.data?.val || '',
      /** 코드 명 */
      nm: props.data?.nm || '',
      /** 코드 설명 */
      desc: props.data?.desc || '',
      /** 코드 사용 여부 */
      useYn: props.data?.useYn,
    },
    validationSchema: Yup.object().shape({
      id: Yup.string()
        .required('필수 입력 항목입니다')
        .max(6, '최대 6글자 이하여야 합니다'),
      prefix: Yup.string()
        .required('필수 입력 항목입니다')
        .max(3, '최대 3글자 이하여야 합니다'),
      val: Yup.string()
        .required('필수 입력 항목입니다')
        .max(3, '최대 3글자 이하여야 합니다'),
      nm: Yup.string()
        .required('필수 입력 항목입니다')
        .max(30, '최대 30글자 이하여야 합니다'),
      desc: Yup.string()
        .required('필수 입력 항목입니다')
        .max(30, '최대 30글자 이하여야 합니다'),
      useYn: Yup.string()
        .required('필수 입력 항목입니다')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      console.log(values)
    }
  })

  return (
    <UI.SplitForm
      form={saveCodeForm}
      btnSave={false}
      onClose={() => props.close(false)}
    >
      <div className={`detail-container`}>
        <TextField
          label='코드 ID'
          name='id'
          value={saveCodeForm.values.id}
          onChange={saveCodeForm.handleChange}
          error={saveCodeForm.touched.id && Boolean(saveCodeForm.errors.id)}
          helperText={saveCodeForm.touched.id && saveCodeForm.errors.id}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 접두어'
          name='prefix'
          value={saveCodeForm.values.prefix}
          onChange={saveCodeForm.handleChange}
          error={saveCodeForm.touched.prefix && Boolean(saveCodeForm.errors.prefix)}
          helperText={saveCodeForm.touched.prefix && saveCodeForm.errors.prefix}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 값'
          name='val'
          value={saveCodeForm.values.val}
          onChange={saveCodeForm.handleChange}
          error={saveCodeForm.touched.val && Boolean(saveCodeForm.errors.val)}
          helperText={saveCodeForm.touched.val && saveCodeForm.errors.val}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 명'
          name='nm'
          value={saveCodeForm.values.nm}
          onChange={saveCodeForm.handleChange}
          error={saveCodeForm.touched.nm && Boolean(saveCodeForm.errors.nm)}
          helperText={saveCodeForm.touched.nm && saveCodeForm.errors.nm}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          multiline
          label='코드 설명'
          name='desc'
          value={saveCodeForm.values.desc}
          onChange={saveCodeForm.handleChange}
          error={saveCodeForm.touched.desc && Boolean(saveCodeForm.errors.desc)}
          helperText={saveCodeForm.touched.desc && saveCodeForm.errors.desc}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <UI.RadioGroup
          row
          label='코드 사용 여부'
          labelid='codeUseYn'
          name='useYn'
          value={saveCodeForm.values.useYn}
          onChange={saveCodeForm.handleChange}
          disabled={true}
          list={[
            { value: 'Y', text: '사용' },
            { value: 'N', text: '미사용' }
          ]}
        />
      </div>
    </UI.SplitForm>
  )
}
