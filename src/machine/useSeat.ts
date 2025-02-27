import { create } from 'zustand'


export const useSeat = create<any>()((set) => ({
   seating: [],
   handleSeat: (by: any) => set((state: any) => ({ seating: [...state.seating, by] })),
   handleSeatFilter: (by: any) => set((state: any) => ({ seating: [...state.seating.filter((item: any) => item.seat !== by.seat)] })),
   handleClearSeat: () => set({ seating: [] })
}))


