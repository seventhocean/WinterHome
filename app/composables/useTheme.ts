/**
 * 主题管理 Composable
 * 处理明暗主题切换
 */
export const useTheme = () => {
  // 默认暗色：契合「冬夜」主题；仅当用户显式选择亮色时才用亮色
  const isDark = useState<boolean>('theme-dark', () => true)

  /**
   * 同步主题状态
   * 优先级：用户保存的选择 > 默认暗色
   */
  const syncTheme = (): void => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      isDark.value = savedTheme !== 'light'
    }
  }

  /**
   * 应用主题到 DOM
   */
  const applyTheme = (): void => {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    }
  }

  /**
   * 切换主题
   */
  const toggleTheme = (): void => {
    isDark.value = !isDark.value

    if (import.meta.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      applyTheme()
    }
  }

  return {
    isDark: computed(() => isDark.value),
    syncTheme,
    toggleTheme
  }
}
