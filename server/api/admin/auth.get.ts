import { defineEventHandler } from 'h3'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler((event) => {
  return { authenticated: requireAuth(event) }
})
