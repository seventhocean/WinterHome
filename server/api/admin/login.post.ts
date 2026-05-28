import { defineEventHandler, readBody, createError, setCookie } from 'h3'
import { verifyPassword, loadAuth, generateToken, registerToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { password } = body as { password: string }

  if (!password) {
    throw createError({ statusCode: 400, message: 'Password is required' })
  }

  const auth = loadAuth()

  if (!verifyPassword(password, auth)) {
    throw createError({ statusCode: 401, message: 'Incorrect password' })
  }

  const token = generateToken()
  registerToken(token)

  setCookie(event, 'wh-admin-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 // 24 hours
  })

  return { ok: true }
})
