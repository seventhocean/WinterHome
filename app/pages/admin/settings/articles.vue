<template>
  <div class="settings-page">
    <h1 class="page-title">文章管理</h1>
    <p class="page-desc">配置博客地址、文章 API、RSS 源和静态文章列表。</p>

    <div class="settings-form" v-if="config">
      <div class="form-group">
        <label>博客地址</label>
        <input v-model="config.blogUrl" placeholder="https://blog.example.com" />
      </div>
      <div class="form-group">
        <label>文章 API</label>
        <input v-model="config.postAPI" placeholder="https://api.example.com/articles" />
      </div>
      <div class="form-group">
        <label>RSS 地址</label>
        <input v-model="config.postRSS" placeholder="https://blog.example.com/rss.xml" />
      </div>

      <div class="list-container">
        <div v-for="(item, i) in config.postList" :key="i" class="list-item article-item">
          <div class="form-group" style="flex:1;">
            <input v-model="item.title" placeholder="文章标题" style="margin-bottom:0.375rem;" />
            <input v-model="item.cover" placeholder="封面图片路径" style="margin-bottom:0.375rem;" />
            <input v-model="item.description" placeholder="文章描述" style="margin-bottom:0.375rem;" />
            <input v-model="item.category" placeholder="分类" style="margin-bottom:0.375rem;" />
            <input v-model="item.time" placeholder="发布时间，如 2026-01-01" style="margin-bottom:0.375rem;" />
            <input v-model="item.url" placeholder="文章链接" />
          </div>
          <button type="button" class="remove-btn" @click="config.postList.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="config.postList.push({ title: '', cover: '', description: '', category: '', time: '', url: '' })">
          <i class="ri-add-line"></i> 添加文章
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
import type { ArticlesConfig } from '@@/types'
definePageMeta({ layout: 'admin' })

const config = ref<ArticlesConfig | null>(null)
const saving = ref(false)
const saved = ref(false)
const error = ref('')

onMounted(async () => {
  config.value = await $fetch<ArticlesConfig>('/api/admin/articles')
})

const handleSave = async () => {
  saving.value = true
  saved.value = false
  error.value = ''
  try {
    await $fetch('/api/admin/articles', { method: 'PUT', body: config.value })
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
.article-item .form-group input { font-size: 0.8125rem; }
</style>
