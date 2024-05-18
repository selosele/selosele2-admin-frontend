import { create } from 'zustand'
import { http } from '@/api'
import { Menu, MenuState, Value } from '@/models'

/** 메뉴 Store */
const useMenuStore = create<MenuState>(set => ({
  data: [],
  parentData: [],
  listData: (listMenuDto) => {
    return new Promise(async (resolve,_) => {
      const { data }: { data: Menu[] } = await http.get('/menu/list/tree', { params: listMenuDto })
      set({ data })
      resolve(data)
    })
  },
  listParentData: (data: Menu[]) => {
    return data.map(d => ({
      value: d.id,
      text: d.name
    }))
  },
  setParentData: (parentData: Value[]) => {
    set({ parentData })
  }
}))

export default useMenuStore
