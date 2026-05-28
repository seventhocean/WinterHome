<template>
  <div class="settings-page">
    <h1 class="page-title">首页首屏</h1>
    <p class="page-desc">配置顶部徽章、个人简介、技能、社交链接等。</p>

    <div class="settings-form" v-if="form">
      <h3 class="section-label">徽章</h3>
      <div class="form-group">
        <label>徽章文字</label>
        <input v-model="form.badgeText" placeholder="深度学习中" />
      </div>

      <h3 class="section-label">个人简介（每行一条）</h3>
      <div class="list-container">
        <div v-for="(desc, i) in form.descriptions" :key="i" class="list-item">
          <input v-model="form.descriptions[i]" />
          <button type="button" class="remove-btn" @click="form.descriptions.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="form.descriptions.push('')">
          <i class="ri-add-line"></i> 添加简介
        </button>
      </div>

      <h3 class="section-label">技能标签</h3>
      <div class="tag-list">
        <span v-for="(skill, i) in form.skills" :key="i" class="tag">
          {{ skill }}
          <button type="button" @click="form.skills.splice(i, 1)">×</button>
        </span>
      </div>
      <div class="form-group">
        <label>添加技能</label>
        <div style="display:flex;gap:0.5rem;">
          <input v-model="newSkill" @keyup.enter="addSkill" placeholder="输入技能名称后回车" />
          <button type="button" class="save-btn" style="padding:0.5rem 1rem;" @click="addSkill">添加</button>
        </div>
      </div>

      <h3 class="section-label">主按钮</h3>
      <div class="form-row">
        <div class="form-group">
          <label>按钮文字</label>
          <input v-model="form.primaryAction.text" />
        </div>
        <div class="form-group">
          <label>跳转链接</label>
          <input v-model="form.primaryAction.url" />
        </div>
      </div>

      <h3 class="section-label">社交链接</h3>
      <div class="list-container">
        <div v-for="(link, i) in form.socialLinks" :key="i" class="list-item social-item">
          <div class="form-group" style="flex:1;">
            <input v-model="link.name" placeholder="名称" style="margin-bottom:0.375rem;" />
            <input v-model="link.url" placeholder="链接" style="margin-bottom:0.375rem;" />
            <input v-model="link.icon" placeholder="RemixIcon 类名（如 ri-github-fill）" />
          </div>
          <button type="button" class="remove-btn" @click="form.socialLinks.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="form.socialLinks.push({ name: '', url: '', icon: '' })">
          <i class="ri-add-line"></i> 添加社交链接
        </button>
      </div>

      <h3 class="section-label">右侧照片</h3>
      <div class="form-group">
        <label>照片路径</label>
        <div class="image-upload">
          <img v-if="form.rightPhoto.image && !form.rightPhoto.image.startsWith('http')" :src="form.rightPhoto.image" class="upload-preview" />
          <img v-else-if="form.rightPhoto.image && form.rightPhoto.image.startsWith('http')" :src="form.rightPhoto.image" class="upload-preview" />
          <div class="upload-actions">
            <input v-model="form.rightPhoto.image" placeholder="/photo.jpg 或上传后的路径" />
            <input type="file" accept="image/*" @change="handleUpload" class="upload-input" />
          </div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>装饰图标 A</label>
          <input v-model="form.rightPhoto.iconA" placeholder="ri-code-s-slash-line" />
        </div>
        <div class="form-group">
          <label>装饰图标 B</label>
          <input v-model="form.rightPhoto.iconB" placeholder="ri-palette-line" />
        </div>
      </div>
      <div class="form-group">
        <label>装饰图标 C</label>
        <input v-model="form.rightPhoto.iconC" placeholder="ri-rocket-2-line" />
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
import type { HeroConfig } from '@@/types'
definePageMeta({ layout: 'admin' })

const form = ref<HeroConfig | null>(null)
const newSkill = ref('')
const saving = ref(false)
const saved = ref(false)
const uploading = ref(false)

onMounted(async () => {
  form.value = await $fetch<HeroConfig>('/api/admin/hero')
})

const addSkill = () => {
  if (newSkill.value.trim() && form.value) {
    form.value.skills.push(newSkill.value.trim())
    newSkill.value = ''
  }
}

const handleUpload = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const res = await $fetch<{ url: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    if (form.value) form.value.rightPhoto.image = res.url
  } catch (err) {
    console.error('Upload failed:', err)
  } finally {
    uploading.value = false
    target.value = ''
  }
}

const error = ref('')

const handleSave = async () => {
  if (!form.value) return
  saving.value = true
  saved.value = false
  error.value = ''
  try {
    await $fetch('/api/admin/hero', { method: 'PUT', body: form.value })
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

  &:first-child {
    border-top: none;
    padding-top: 0;
  }
}

.list-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-item .form-group input {
  font-size: 0.8125rem;
}

.upload-input {
  font-size: 0.75rem;
  padding: 0.25rem 0;
}

.settings-form {
  max-width: 720px;
}
</style>
