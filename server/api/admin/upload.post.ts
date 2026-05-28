import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (!requireAuth(event)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData.find(f => f.name === 'file')
  if (!file || !file.data) {
    throw createError({ statusCode: 400, message: 'No file field found' })
  }

  if (file.data.length > 5 * 1024 * 1024) {
    throw createError({ statusCode: 400, message: 'File too large, maximum 5MB' })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  if (!file.type || !allowedTypes.includes(file.type)) {
    throw createError({ statusCode: 400, message: 'Invalid file type, only images allowed' })
  }

  const uploadDir = join(process.cwd(), 'public', 'uploads')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }

  const originalName = file.filename || 'upload'
  const safeName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const filePath = join(uploadDir, safeName)

  writeFileSync(filePath, file.data)

  return { url: `/uploads/${safeName}` }
})
