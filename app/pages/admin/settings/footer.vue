<template>
  <div class="settings-page">
    <h1 class="page-title">页脚</h1>
    <p class="page-desc">配置版权年份和备案信息。</p>

    <div class="settings-form" v-if="form">
      <div class="form-group">
        <label>起始年份</label>
        <input v-model.number="form.startYear" type="number" placeholder="2026" />
      </div>

      <h3 class="section-label">备案信息</h3>
      <div class="list-container">
        <div v-for="(item, i) in form.icp" :key="i" class="list-item">
          <div class="form-group" style="flex:1;">
            <input v-model="item.label" placeholder="备案号" style="margin-bottom:0.375rem;" />
            <input v-model="item.url" placeholder="链接" />
          </div>
          <button type="button" class="remove-btn" @click="form.icp.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="form.icp.push({ label: '', url: '' })">
          <i class="ri-add-line"></i> 添加备案
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
import type { FooterConfig } from '@@/types'
definePageMeta({ layout: 'admin' })

const form = ref<FooterConfig | null>(null)
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  form.value = await $fetch<FooterConfig>('/api/admin/footer')
})

const error = ref('')

const handleSave = async () => {
  if (!form.value) return
  saving.value = true
  saved.value = false
  error.value = ''
  const filtered = { ...form.value, icp: form.value.icp.filter(i => i.label.trim()) }
  try {
    await $fetch('/api/admin/footer', { method: 'PUT', body: filtered })
    form.value = filtered
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
.section-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  margin: 1rem 0 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}
.list-container { display: flex; flex-direction: column; gap: 0.5rem; }
.settings-form { max-width: 640px; }
</style>
