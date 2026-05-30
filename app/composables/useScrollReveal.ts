/**
 * 滚动渐入 Composable
 * 基于 IntersectionObserver，为区块/卡片提供入场动效
 *
 * 使用方式：
 *   const { reveal } = useScrollReveal()
 *   在模板上 ref="sectionEl"
 *   watch 数据变化后调用 reveal(sectionEl.value) 或直接在 onMounted + nextTick 中调用
 */
export const useScrollReveal = () => {
  const observer = ref<IntersectionObserver | null>(null)
  const observed = new WeakSet<Element>()

  const initObserver = (): IntersectionObserver => {
    if (!observer.value) {
      observer.value = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed')
              observer.value?.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
    }
    return observer.value
  }

  /**
   * 扫描容器内所有 .reveal 子元素并观察
   * 可多次调用（数据变化后），已观察的元素不会重复注册
   */
  const reveal = (container: HTMLElement | null): void => {
    if (!container || !import.meta.client) return

    const obs = initObserver()
    const targets = container.querySelectorAll('.reveal:not(.revealed)')
    targets.forEach((el) => {
      if (!observed.has(el)) {
        observed.add(el)
        obs.observe(el)
      }
    })
  }

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return { reveal }
}
