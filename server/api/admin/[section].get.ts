import { defineEventHandler, createError } from 'h3'
import { requireAuth } from '../../utils/auth'
import { loadConfig, getSection } from '../../utils/configStore'

export default defineEventHandler((event) => {
  if (!requireAuth(event)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const section = event.context.params?.section
  const config = loadConfig()

  if (!section) {
    return config
  }

  const validSections = ['site', 'hero', 'projects', 'sites', 'timeline', 'footer', 'articles'] as const
  if (!validSections.includes(section as typeof validSections[number])) {
    throw createError({ statusCode: 400, message: `Invalid section: ${section}` })
  }

  return getSection(config, section as typeof validSections[number])
})
