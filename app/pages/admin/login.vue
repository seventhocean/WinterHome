<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Winter Admin</h1>
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="password">密码</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="请输入管理密码"
            autocomplete="current-password"
            autofocus
          />
        </div>
        <p v-if="error" class="error-msg">{{ error }}</p>
        <button type="submit" :disabled="submitting" class="login-btn">
          {{ submitting ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const password = ref('')
const error = ref('')
const submitting = ref(false)
const { login } = useAdminAuth()

const handleSubmit = async () => {
  if (!password.value) return
  submitting.value = true
  error.value = ''
  const ok = await login(password.value)
  submitting.value = false
  if (ok) {
    navigateTo('/admin')
  } else {
    error.value = '密码错误'
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a2e;
}

.login-card {
  background: #16213e;
  border-radius: 0.75rem;
  padding: 2.5rem;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
}

.login-title {
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-size: 0.875rem;
    color: #aaa;
  }

  input {
    padding: 0.625rem 0.875rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.375rem;
    background: rgba(255,255,255,0.05);
    color: #fff;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.15s;

    &:focus {
      border-color: #6366f1;
    }
  }
}

.error-msg {
  color: #ef4444;
  font-size: 0.8125rem;
  margin: 0;
}

.login-btn {
  padding: 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: #6366f1;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #4f46e5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
