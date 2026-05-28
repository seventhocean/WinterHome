import { defineEventHandler, readBody, createError } from 'h3'
import { requireAuth, verifyPassword, loadAuth, hashPassword, saveAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (!requireAuth(event)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const { oldPassword, newPassword } = body as { oldPassword: string; newPassword: string }

  if (!oldPassword || !newPassword) {
    throw createError({ statusCode: 400, message: 'Both old and new password are required' })
  }

  if (newPassword.length < 4) {
    throw createError({ statusCode: 400, message: 'Password must be at least 4 characters' })
  }

  const auth = loadAuth()
  if (!verifyPassword(oldPassword, auth)) {
    throw createError({ statusCode: 401, message: 'Current password is incorrect' })
  }

  const newAuth = hashPassword(newPassword)
  saveAuth(newAuth)

  return { ok: true }
})
