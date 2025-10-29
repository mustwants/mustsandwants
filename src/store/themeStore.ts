import { create } from 'zustand'

interface ThemeState {
  isDark: boolean
  setDark: (value: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  setDark: (value) => set({ isDark: value }),
}))
