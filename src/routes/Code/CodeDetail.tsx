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
  const formik = useFormik({
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
    },
  })

  return (
    <UI.SplitForm
      form={formik}
      btnSave={false}
      onClose={() => props.close(false)}
    >
      <div className={`detail-container`}>
        <TextField
          label='코드 ID'
          name='id'
          value={formik.values.id}
          onChange={formik.handleChange}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 접두어'
          name='prefix'
          value={formik.values.prefix}
          onChange={formik.handleChange}
          error={formik.touched.prefix && Boolean(formik.errors.prefix)}
          helperText={formik.touched.prefix && formik.errors.prefix}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 값'
          name='val'
          value={formik.values.val}
          onChange={formik.handleChange}
          error={formik.touched.val && Boolean(formik.errors.val)}
          helperText={formik.touched.val && formik.errors.val}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          label='코드 명'
          name='nm'
          value={formik.values.nm}
          onChange={formik.handleChange}
          error={formik.touched.nm && Boolean(formik.errors.nm)}
          helperText={formik.touched.nm && formik.errors.nm}
          variant='standard' fullWidth
          inputProps={
            { disabled: true }
          }
        />
  
        <TextField
          multiline
          label='코드 설명'
          name='desc'
          value={formik.values.desc}
          onChange={formik.handleChange}
          error={formik.touched.desc && Boolean(formik.errors.desc)}
          helperText={formik.touched.desc && formik.errors.desc}
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
          value={formik.values.useYn}
          onChange={formik.handleChange}
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
