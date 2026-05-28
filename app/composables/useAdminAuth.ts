export const useAdminAuth = () => {
  const authenticated = useState('admin-authenticated', () => false)
  const loading = useState('admin-loading', () => true)

  const checkAuth = async (): Promise<boolean> => {
    try {
      const res = await $fetch<{ authenticated: boolean }>('/api/admin/auth')
      authenticated.value = res.authenticated
      return res.authenticated
    } catch {
      authenticated.value = false
      return false
    } finally {
      loading.value = false
    }
  }

  const login = async (password: string): Promise<boolean> => {
    try {
      await $fetch('/api/admin/login', {
        method: 'POST',
        body: { password }
      })
      authenticated.value = true
      return true
    } catch {
      return false
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      authenticated.value = false
      navigateTo('/admin/login')
    }
  }

  return { authenticated, loading, checkAuth, login, logout }
}
