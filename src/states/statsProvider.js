import {create} from 'zustand'

export const useTotalPac = create((set) => ({
    totalPacs: 10,
    setTotalPacs: (props) => set({totalPacs: props}),
  }))