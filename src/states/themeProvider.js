import { create } from "zustand";

export const useDarkStore = create((set) => ({
    isDark: false,
    setIsDark: (props) => set({isDark: props}),
  }))