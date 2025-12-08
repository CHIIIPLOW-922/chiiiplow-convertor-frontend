import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

export function useTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)

  watch(isDark, (val) => {
    document.documentElement.classList.toggle('dark', val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  }, { immediate: true })

  return {
    isDark
  }
}
