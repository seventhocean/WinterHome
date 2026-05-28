import { loadConfig } from '../utils/configStore'

export default defineEventHandler(() => {
  return loadConfig()
})
