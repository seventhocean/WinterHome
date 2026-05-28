import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createHash, randomBytes, pbkdf2Sync } from 'node:crypto'
import { getCookie } from 'h3'
import type { H3Event } from 'h3'

const DATA_DIR = join(process.cwd(), 'app', 'data')
const AUTH_PATH = join(DATA_DIR, 'auth.json')
const TOKENS_PATH = join(DATA_DIR, 'tokens.json')

interface AuthData {
  method: string
  salt: string
  hash: string
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function loadAuth(): AuthData {
  if (existsSync(AUTH_PATH)) {
    return JSON.parse(readFileSync(AUTH_PATH, 'utf-8')) as AuthData
  }
  const auth = hashPassword('admin123')
  saveAuth(auth)
  return auth
}

export function saveAuth(auth: AuthData) {
  ensureDataDir()
  writeFileSync(AUTH_PATH, JSON.stringify(auth, null, 2), 'utf-8')
}

export function verifyPassword(password: string, auth: AuthData): boolean {
  const derived = pbkdf2Sync(password, auth.salt, 100000, 64, 'sha512').toString('hex')
  return derived === auth.hash
}

export function hashPassword(password: string): AuthData {
  const salt = randomBytes(16).toString('hex')
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex')
  return { method: 'pbkdf2', salt, hash }
}

export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

// Token store persisted to file: hashed token -> expiry timestamp
let _tokens: Map<string, number> | null = null
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

function loadTokens(): Map<string, number> {
  if (!existsSync(TOKENS_PATH)) {
    return new Map()
  }
  try {
    const data = JSON.parse(readFileSync(TOKENS_PATH, 'utf-8')) as Record<string, number>
    const now = Date.now()
    const map = new Map<string, number>()
    for (const [key, expiry] of Object.entries(data)) {
      if (expiry > now) {
        map.set(key, expiry)
      }
    }
    return map
  } catch {
    return new Map()
  }
}

function saveTokens() {
  ensureDataDir()
  const tokens = getTokens()
  const obj: Record<string, number> = {}
  for (const [key, value] of tokens.entries()) {
    obj[key] = value
  }
  writeFileSync(TOKENS_PATH, JSON.stringify(obj, null, 2), 'utf-8')
}

function getTokens(): Map<string, number> {
  if (_tokens === null) {
    _tokens = loadTokens()
  }
  return _tokens
}

export function registerToken(token: string) {
  const hashed = hashToken(token)
  getTokens().set(hashed, Date.now() + TOKEN_EXPIRY)
  saveTokens()
}

export function validateToken(token: string): boolean {
  if (!token) return false
  const hashed = hashToken(token)
  const expiry = getTokens().get(hashed)
  if (!expiry || Date.now() > expiry) {
    getTokens().delete(hashed)
    saveTokens()
    return false
  }
  return true
}

export function revokeToken(token: string) {
  if (token) {
    getTokens().delete(hashToken(token))
    saveTokens()
  }
}

export function requireAuth(event: H3Event): boolean {
  const token = getCookie(event, 'wh-admin-token')
  return validateToken(token || '')
}
