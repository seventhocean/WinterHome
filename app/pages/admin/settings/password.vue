<template>
  <div class="settings-page">
    <h1 class="page-title">修改密码</h1>
    <p class="page-desc">更改管理后台的登录密码。</p>

    <form @submit.prevent="handleSave" class="settings-form">
      <div class="form-group">
        <label>当前密码</label>
        <input v-model="oldPassword" type="password" autocomplete="current-password" />
      </div>
      <div class="form-group">
        <label>新密码</label>
        <input v-model="newPassword" type="password" autocomplete="new-password" placeholder="至少4个字符" />
      </div>
      <div class="form-group">
        <label>确认新密码</label>
        <input v-model="confirmPassword" type="password" autocomplete="new-password" />
      </div>
      <p v-if="error" class="error-msg">{{ error }}</p>
      <p v-if="success" class="success-msg">{{ success }}</p>
      <button type="submit" :disabled="saving" class="save-btn">
        {{ saving ? '保存中...' : '保存' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { logout } = useAdminAuth()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const saving = ref(false)
const error = ref('')
const success = ref('')

const handleSave = async () => {
  error.value = ''
  success.value = ''

  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    error.value = '请填写所有字段'
    return
  }

  if (newPassword.value.length < 4) {
    error.value = '密码至少4个字符'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = '两次输入的新密码不一致'
    return
  }

  saving.value = true
  try {
    await $fetch('/api/admin/password', {
      method: 'PUT',
      body: { oldPassword: oldPassword.value, newPassword: newPassword.value }
    })
    success.value = '密码修改成功，请使用新密码重新登录'
    oldPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
    setTimeout(() => {
      logout()
    }, 2000)
  } catch (e: any) {
    error.value = e?.data?.message || '修改失败'
  } finally {
    saving.value = false
  }
}
</script>

<style lang="scss" scoped>
@import './form-common.scss';
.settings-form { max-width: 480px; }
</style>
