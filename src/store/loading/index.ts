import { create } from 'zustand'
import { LoadingState } from '@/models/types/loading'

/** 로딩 Store */
const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))

// Zustand 상태를 외부에서 접근 가능하도록 export
export const getState = useLoadingStore.getState
export default useLoadingStore
