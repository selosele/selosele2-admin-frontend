import { create } from 'zustand'
import { BreadcrumbState } from '@/models'

/** Breadcrumb Store */
const useBreadcrumbStore = create<BreadcrumbState>(set => ({
  pageTitle: '',
  setPageTitle: (pageTitle: string) => {
    set({ pageTitle })
  }
}))

export default useBreadcrumbStore
