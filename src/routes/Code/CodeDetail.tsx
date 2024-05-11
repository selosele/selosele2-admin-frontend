import { TextField } from '@mui/material'
import { Code } from '@/models'
import { UI } from '@/components/UI'

import './Code.css'

/** 공통코드 상세 조회 props 인터페이스 */
interface Props {

  /** 공통코드 상세 데이터 */
  data: Code

}

/** 공통코드 상세 조회 컴포넌트 */
export default function CodeDetail(props: Props) {
  return (
    <div className={`code-detail__container`}>
      <TextField
        label='코드 ID'
        name='id'
        value={props.data?.id}
        variant='standard' fullWidth
      />

      <TextField
        label='코드 접두어'
        name='prefix'
        value={props.data?.prefix}
        variant='standard' fullWidth
      />

      <TextField
        label='코드 값'
        name='val'
        value={props.data?.val}
        variant='standard' fullWidth
      />

      <TextField
        label='코드 명'
        name='nm'
        value={props.data?.nm}
        variant='standard' fullWidth
      />

      <TextField
        multiline
        label='코드 설명'
        name='desc'
        value={props.data?.desc}
        variant='standard' fullWidth
      />

      <UI.RadioGroup
        row
        label='코드 사용 여부'
        labelid='codeUseYn'
        value={props.data?.useYn}
        list={[
          { value: 'Y', text: '사용' },
          { value: 'N', text: '미사용' }
        ]}
      />
    </div>
  )
}
