export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin') || to.path === '/admin/login') return

  const { checkAuth } = useAdminAuth()
  const isAuth = await checkAuth()

  if (!isAuth) {
    return navigateTo('/admin/login')
  }
})
