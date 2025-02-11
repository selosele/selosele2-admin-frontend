import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { http } from '@/api'

import './Login.css'

/** 로그인 페이지 컴포넌트 */
export default function Login() {
  const navigate = useNavigate()
  
  /** 로그인 폼 */
  const loginForm = useFormik({
    initialValues: {
      /** 사용자 아이디 */
      userId: '',
      /** 사용자 비밀번호 */
      userPw: '',
    },
    validationSchema: Yup.object().shape({
      userId: Yup.string()
        .required('필수 입력 항목입니다')
        .max(10, '최대 10글자 이하여야 합니다'),
      userPw: Yup.string()
        .required('필수 입력 항목입니다')
        .min(8, '최소 8글자 이상이어야 합니다')
        .max(15, '최대 15글자 이하여야 합니다')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      const { data } = await http.post('/auth/signin', values)
      const accessToken = data?.accessToken
      
      if (accessToken) {
        http.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        window.localStorage.setItem('accessToken', accessToken)
        navigate('/system')
      }
    }
  })

  return (
    <div className={`login-container`}>
      <div className={`login-form`}>
        <h1 className={`login-title`}>블로그 ADMIN 시스템</h1>

        <form onSubmit={loginForm.handleSubmit}>
          <div className={`login-input-item`}>
            <TextField
              name='userId'
              placeholder='아이디'
              value={loginForm.values.userId}
              onChange={loginForm.handleChange}
              error={loginForm.touched.userId && Boolean(loginForm.errors.userId)}
              helperText={loginForm.touched.userId && loginForm.errors.userId}
              variant='standard' fullWidth
            />
          </div> 

          <div className={`login-input-item`}>
            <TextField
              type='password'
              name='userPw'
              placeholder='비밀번호'
              value={loginForm.values.userPw}
              onChange={loginForm.handleChange}
              error={loginForm.touched.userPw && Boolean(loginForm.errors.userPw)}
              helperText={loginForm.touched.userPw && loginForm.errors.userPw}
              variant='standard' fullWidth
            />
          </div>

          <Button
            type='submit'
            variant='contained' fullWidth
          >
            로그인
          </Button>
        </form>
      </div>
    </div>
  )
}
