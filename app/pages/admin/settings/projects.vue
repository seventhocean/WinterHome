<template>
  <div class="settings-page">
    <h1 class="page-title">项目列表</h1>
    <p class="page-desc">管理 GitHub 仓库展示，格式为 "用户名/仓库名"。</p>

    <div class="settings-form" v-if="projects">
      <div class="list-container">
        <div v-for="(repo, i) in projects" :key="i" class="list-item">
          <input v-model="projects[i]" placeholder="username/repo" />
          <button type="button" class="remove-btn" @click="projects.splice(i, 1)">
            <i class="ri-close-line"></i>
          </button>
        </div>
        <button type="button" class="add-btn" @click="projects.push('')">
          <i class="ri-add-line"></i> 添加仓库
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
definePageMeta({ layout: 'admin' })

const projects = ref<string[]>([])
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  projects.value = await $fetch<string[]>('/api/admin/projects')
})

const error = ref('')

const handleSave = async () => {
  saving.value = true
  saved.value = false
  error.value = ''
  const filtered = projects.value.filter(r => r.trim())
  try {
    await $fetch('/api/admin/projects', { method: 'PUT', body: filtered })
    projects.value = filtered
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
.settings-form { max-width: 640px; }
</style>
