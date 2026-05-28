<template>
  <div class="settings-page">
    <h1 class="page-title">时间线</h1>
    <p class="page-desc">管理过往经历的展示。</p>

    <div class="settings-form" v-if="timeline">
      <div class="list-container">
        <div v-for="(item, i) in timeline" :key="i" class="list-item timeline-item">
          <div class="form-group" style="flex:1;">
            <input v-model="item.date" placeholder="日期（如 2026年3月）" style="margin-bottom:0.375rem;" />
            <input v-model="item.title" placeholder="标题" style="margin-bottom:0.375rem;" />
            <input v-model="item.description" placeholder="描述" style="margin-bottom:0.375rem;" />
            <input v-model="item.icon" placeholder="RemixIcon 图标名" />
          </div>
          <button type="button" class="remove-btn" @click="timeline.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="timeline.push({ date: '', title: '', description: '', icon: 'ri-window-line' })">
          <i class="ri-add-line"></i> 添加事件
        </button>
      </div>

      <button type="button" @click="handleSave" :disabled="saving" class="save-btn" style="margin-top:1rem;">
        {{ saving ? '保存中...' : '保存' }}
      </button>
      <span v-if="saved" class="success-msg">保存成功</span>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimelineEvent } from '@@/types'
definePageMeta({ layout: 'admin' })

const timeline = ref<TimelineEvent[]>([])
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  timeline.value = await $fetch<TimelineEvent[]>('/api/admin/timeline')
})

const error = ref('')

const handleSave = async () => {
  saving.value = true
  saved.value = false
  error.value = ''
  const filtered = timeline.value.filter(t => t.title.trim())
  try {
    await $fetch('/api/admin/timeline', { method: 'PUT', body: filtered })
    timeline.value = filtered
    saved.value = true
    setTimeout(() => { saved.value = false }, 2000)
  } catch (e: any) {
    error.value = e?.data?.message || '保存失败'
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
@import './form-common.scss';
.settings-form { max-width: 720px; }
.timeline-item .form-group input { font-size: 0.8125rem; }
</style>
