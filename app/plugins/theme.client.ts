/**
 * 主题初始化插件
 * 在客户端初始化时检测并应用保存的主题设置
 * 默认采用暗色（冬夜主题），仅当用户显式选择亮色时使用亮色
 */
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const savedTheme = localStorage.getItem('theme')
    const isDark = savedTheme !== 'light'

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

    return {
      provide: {
        theme: {
          isDark
        }
      }
    }
  }
})
