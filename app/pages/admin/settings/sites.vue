<template>
  <div class="settings-page">
    <h1 class="page-title">网站收藏</h1>
    <p class="page-desc">管理上线网站的展示卡片。</p>

    <div class="settings-form" v-if="sites">
      <div class="list-container">
        <div v-for="(site, i) in sites" :key="i" class="list-item site-item">
          <div class="form-group" style="flex:1;">
            <input v-model="site.name" placeholder="网站名称" style="margin-bottom:0.375rem;" />
            <input v-model="site.description" placeholder="描述" style="margin-bottom:0.375rem;" />
            <input v-model="site.url" placeholder="链接" style="margin-bottom:0.375rem;" />
            <input v-model="site.icon" placeholder="RemixIcon 图标名" style="margin-bottom:0.375rem;" />
            <input v-model="site.tag" placeholder="标签" />
          </div>
          <button type="button" class="remove-btn" @click="sites.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="sites.push({ name: '', description: '', url: '', icon: '', tag: '' })">
          <i class="ri-add-line"></i> 添加网站
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
import type { SiteItem } from '@@/types'
definePageMeta({ layout: 'admin' })

const sites = ref<SiteItem[]>([])
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  sites.value = await $fetch<SiteItem[]>('/api/admin/sites')
})

const error = ref('')

const handleSave = async () => {
  saving.value = true
  saved.value = false
  error.value = ''
  const filtered = sites.value.filter(s => s.name.trim())
  try {
    await $fetch('/api/admin/sites', { method: 'PUT', body: filtered })
    sites.value = filtered
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
.site-item .form-group input { font-size: 0.8125rem; }
</style>
