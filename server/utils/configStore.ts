import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'
import type { SiteConfig } from '../../types'

const DATA_DIR = join(process.cwd(), 'app', 'data')
const CONFIG_PATH = join(DATA_DIR, 'config.json')
const YAML_PATH = join(process.cwd(), 'config.yaml')

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

/**
 * Load config from JSON file, fallback to YAML
 */
export function loadConfig(): SiteConfig {
  if (existsSync(CONFIG_PATH)) {
    try {
      const raw = readFileSync(CONFIG_PATH, 'utf-8')
      return JSON.parse(raw) as SiteConfig
    } catch {
      // fallthrough to YAML
    }
  }

  if (existsSync(YAML_PATH)) {
    try {
      const raw = readFileSync(YAML_PATH, 'utf-8')
      return yaml.load(raw) as SiteConfig
    } catch {
      // fallthrough to default
    }
  }

  return DEFAULT_CONFIG
}

const DEFAULT_CONFIG: SiteConfig = {
  site: { title: '', favicon: '/favicon.png', description: '', keywords: [], author: '', url: '' },
  hero: {
    badgeText: '', descriptions: [], skills: [],
    primaryAction: { text: '', url: '' },
    socialLinks: [],
    rightPhoto: { image: '/photo.jpg', iconA: '', iconB: '', iconC: '' }
  },
  footer: { startYear: 2026, icp: [] },
  articles: { blogUrl: '', postAPI: '', postRSS: '', postList: [] },
  sites: [], projects: [], timeline: []
}

/**
 * Save full config to JSON
 */
export function saveConfig(config: SiteConfig) {
  ensureDataDir()
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8')
}

/**
 * Get a single section from config
 */
export function getSection<K extends keyof SiteConfig>(config: SiteConfig, key: K): SiteConfig[K] {
  return config[key]
}

/**
 * Update a single section and persist
 */
export function updateSection<K extends keyof SiteConfig>(key: K, value: SiteConfig[K]): SiteConfig[K] {
  const config = loadConfig()
  config[key] = value
  saveConfig(config)
  return value
}
