import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref("dark")

  const setTheme = (t?: string) => {
    theme.value = t || 'dark';
  }

  return { theme, setTheme }
}, {
  persist: true
})
