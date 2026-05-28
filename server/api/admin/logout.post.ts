import { defineEventHandler, deleteCookie, getCookie } from 'h3'
import { revokeToken } from '../../utils/auth'

export default defineEventHandler((event) => {
  const token = getCookie(event, 'wh-admin-token')
  if (token) {
    revokeToken(token)
  }
  deleteCookie(event, 'wh-admin-token', { path: '/' })
  return { ok: true }
})
