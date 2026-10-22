/**
 * 时刻感知问候
 * 返回「HH:MM · 时段短语」，每 30 秒自检刷新。
 * 时段分档：5-9 晨光刚好 / 9-12 灵感进行时 / 12-14 午后小憩 /
 * 14-18 专注模式 / 18-23 华灯初上 / 其余（23-5）夜还长（专属后缀）
 */
export const useTimeGreeting = () => {
  const timeText = ref('')
  let timer: ReturnType<typeof setInterval> | null = null

  const update = () => {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, '0')
    const mm = String(now.getMinutes()).padStart(2, '0')
    const h = now.getHours()

    let phrase: string
    if (h >= 5 && h < 9) phrase = '晨光刚好'
    else if (h >= 9 && h < 12) phrase = '灵感进行时'
    else if (h >= 12 && h < 14) phrase = '午后小憩'
    else if (h >= 14 && h < 18) phrase = '专注模式'
    else if (h >= 18 && h < 23) phrase = '华灯初上'
    else phrase = '夜还长，我还在写'

    timeText.value = `${hh}:${mm} · ${phrase}`
  }

  onMounted(() => {
    update()
    timer = setInterval(update, 30000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { timeText }
}
