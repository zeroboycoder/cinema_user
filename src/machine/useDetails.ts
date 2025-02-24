import { create } from 'zustand'


export const useDetails = create<any>()((set) => ({
  details: {},
   handleDetails: (by:any) => set(() => ({ details: by })),
}))


