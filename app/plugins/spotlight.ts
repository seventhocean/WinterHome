/**
 * v-spotlight 指令
 * 在元素上随鼠标移动写入 --spot-x / --spot-y 坐标，
 * 配合全局 .spotlight::after 的暖色径向渐变，实现「灯光在霜玻璃上游走」的迎光效果。
 * 使用 requestAnimationFrame 节流；触屏无 mousemove，自动不触发。
 */
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    // SSR 端注册 no-op 指令，避免预渲染时报 getSSRProps 未定义
    nuxtApp.vueApp.directive('spotlight', {
      getSSRProps: () => ({})
    })
    return
  }

  nuxtApp.vueApp.directive('spotlight', {
    mounted(el: HTMLElement) {
      let raf = 0
      const handler = (e: MouseEvent) => {
        if (raf) return
        raf = requestAnimationFrame(() => {
          raf = 0
          const rect = el.getBoundingClientRect()
          el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
          el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
        })
      }
      ;(el as unknown as { __spot?: (e: MouseEvent) => void }).__spot = handler
      el.addEventListener('mousemove', handler, { passive: true })
    },
    unmounted(el: HTMLElement) {
      const handler = (el as unknown as { __spot?: (e: MouseEvent) => void }).__spot
      if (handler) el.removeEventListener('mousemove', handler)
    }
  })
})
