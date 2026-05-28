import { defineEventHandler, readBody, createError } from 'h3'
import { loadConfig, updateSection } from '../../utils/configStore'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (!requireAuth(event)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const body = await readBody(event)
  const section = event.context.params?.section
  if (!section) {
    throw createError({ statusCode: 400, message: 'Missing section parameter' })
  }

  const validSections = ['site', 'hero', 'projects', 'sites', 'timeline', 'footer', 'articles'] as const
  if (!validSections.includes(section as typeof validSections[number])) {
    throw createError({ statusCode: 400, message: `Invalid section: ${section}` })
  }

  const result = updateSection(section as typeof validSections[number], body)
  return { ok: true, data: result }
})
