import { create } from 'zustand'
import { http } from '@/api'
import { Code, CodeState } from '@/models'

/** 공통코드 Store */
const useCodeStore = create<CodeState>(set => ({
  data: [],
  listData: async () => {
    const { data }: { data: Code[] } = await http.get('/code')
    set({
      data: data.filter(d => d.useYn === 'Y')
    })
  }
}))

export default useCodeStore
