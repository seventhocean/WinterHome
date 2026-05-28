import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createHash, randomBytes, pbkdf2Sync } from 'node:crypto'
import type { H3Event } from 'h3'

const DATA_DIR = join(process.cwd(), 'app', 'data')
const AUTH_PATH = join(DATA_DIR, 'auth.json')

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
  return { method: 'pbkdf2', salt: '', hash: '' }
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

// In-memory token store: hashed token -> expiry timestamp
const TOKENS = new Map<string, number>()
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export function registerToken(token: string) {
  const hashed = hashToken(token)
  TOKENS.set(hashed, Date.now() + TOKEN_EXPIRY)
}

export function validateToken(token: string): boolean {
  if (!token) return false
  const hashed = hashToken(token)
  const expiry = TOKENS.get(hashed)
  if (!expiry || Date.now() > expiry) {
    TOKENS.delete(hashed)
    return false
  }
  return true
}

export function revokeToken(token: string) {
  if (token) {
    TOKENS.delete(hashToken(token))
  }
}

export function requireAuth(event: H3Event): boolean {
  const cookies = parseCookies(event)
  const token = cookies['wh-admin-token']
  return validateToken(token)
}

function parseCookies(event: H3Event): Record<string, string> {
  const cookieHeader = getHeader(event, 'cookie') || ''
  const cookies: Record<string, string> = {}
  cookieHeader.split(';').forEach(c => {
    const [name, ...rest] = c.trim().split('=')
    if (name) cookies[name.trim()] = rest.join('=').trim()
  })
  return cookies
}

function getHeader(event: H3Event, name: string): string | undefined {
  return event.headers.get(name)
}
