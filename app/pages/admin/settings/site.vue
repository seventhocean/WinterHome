<template>
  <div class="settings-page">
    <h1 class="page-title">站点信息</h1>
    <p class="page-desc">配置网站标题、描述、关键词等基本信息。</p>

    <form @submit.prevent="handleSave" class="settings-form" v-if="form">
      <div class="form-group">
        <label>网站标题</label>
        <input v-model="form.title" placeholder="Winter" />
      </div>
      <div class="form-group">
        <label>Favicon 路径</label>
        <input v-model="form.favicon" placeholder="/favicon.png" />
      </div>
      <div class="form-group">
        <label>SEO 描述</label>
        <textarea v-model="form.description" rows="3" />
      </div>
      <div class="form-group">
        <label>关键词（逗号分隔）</label>
        <input v-model="keywordsInput" placeholder="个人主页, 博客, 技术" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>作者</label>
          <input v-model="form.author" placeholder="Winter" />
        </div>
        <div class="form-group">
          <label>网站地址</label>
          <input v-model="form.url" placeholder="https://waitwinter.homes" />
        </div>
      </div>
      <button type="submit" :disabled="saving" class="save-btn">
        {{ saving ? '保存中...' : '保存' }}
      </button>
      <span v-if="saved" class="success-msg">保存成功</span>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { SiteMeta } from '@@/types'
definePageMeta({ layout: 'admin' })

const form = ref<SiteMeta | null>(null)
const keywordsInput = ref('')
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  const data = await $fetch<SiteMeta>('/api/admin/site')
  form.value = data
  keywordsInput.value = data.keywords.join(', ')
})

const handleSave = async () => {
  if (!form.value) return
  saving.value = true
  saved.value = false
  form.value.keywords = keywordsInput.value.split(',').map(s => s.trim()).filter(Boolean)
  await $fetch('/api/admin/site', { method: 'PUT', body: form.value })
  saving.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}
</script>

<style lang="scss" scoped>
@import './form-common.scss';
</style>
