/**
 * 滚动渐入 Composable
 * 基于 IntersectionObserver，为区块/卡片提供入场动效
 * 使用：在组件 onMounted 中调用 reveal(containerEl) 即可
 */
export const useScrollReveal = () => {
  const observer = ref<IntersectionObserver | null>(null)

  /**
   * 初始化观察器，自动为容器内所有 .reveal 子元素添加入场动效
   * @param container 观察的根容器，或直接传单个元素
   */
  const reveal = (container: HTMLElement | null): void => {
    if (!container || !import.meta.client) return

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

    const targets = container.querySelectorAll('.reveal')
    targets.forEach((el) => observer.value?.observe(el))
  }

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return { reveal }
}
