# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WinterHome** — a personal homepage / portfolio site built with **Nuxt 4** (Vue 3 + TypeScript) in **Node Server** mode. Site content is driven by `config.yaml` (build-time default) and `app/data/config.json` (runtime overrides via admin panel).

## Common Commands

```bash
npm run dev        # Start dev server at http://localhost:3001
npm run build      # Production build (output: .output/server)
npm run preview    # Preview the built site
```

Dev server runs on port **3001** (not the default 3000). No test framework is configured.

## Architecture

### Configuration-Driven Content

Build-time config comes from `config.yaml` → `runtimeConfig.public.appConfig`. Runtime config is stored in `app/data/config.json` and served via `/api/config`. The admin panel (`/admin/*`) reads/writes config through `/api/admin/*` endpoints.

```
config.yaml → nuxt.config.ts (runtimeConfig) → components (useRuntimeConfig)   [build-time fallback]
app/data/config.json → /api/config → homepage (client fetch)                   [runtime]
```

### Admin Panel

Located at `/admin/*`, requires password authentication (default: `admin123`). Auth uses HTTP-only cookie tokens. API routes under `server/api/admin/` handle CRUD operations on config sections.

### Directory Layout

- `app/` — Nuxt source directory (non-standard root; configured in `nuxt.config.ts`)
  - `app.vue` — Root component (SEO meta, head config)
  - `pages/index.vue` — Single-page homepage orchestrating all sections
  - `pages/admin/` — Admin panel pages (login, dashboard, settings)
  - `layouts/default.vue` — Header + slot + Footer wrapper
  - `layouts/admin.vue` — Admin layout (sidebar nav, no site header/footer)
  - `components/sections/` — HeroSection, ProjectsSection, SitesSection, TimelineSection, ArticlesSection
  - `components/layouts/` — Header.vue (nav + theme toggle), Footer.vue (copyright + ICP links)
  - `composables/` — `useTheme.ts` (dark/light theme), `useApi.ts` (GitHub API, blog API, RSS proxy), `useAdminAuth.ts` (admin auth)
  - `middleware/admin-auth.global.ts` — Route guard for admin pages
  - `plugins/theme.client.ts` — Client-side theme initialization
  - `assets/css/main.scss` — Global CSS vars (light/dark), reset, font-face
  - `assets/font/` — LXGW WenKai Lite font
  - `data/` — Runtime config (`config.json`) and auth data (`auth.json`) — **not committed**
- `server/` — API routes (h3)
  - `api/config.get.ts` — Returns full runtime config
  - `api/admin/` — Admin API (login, logout, section CRUD, upload, password)
  - `utils/configStore.ts` — Config read/write utilities
  - `utils/auth.ts` — Authentication utilities (pbkdf2 password hashing, token management)
- `types/index.ts` — TypeScript interfaces + `DEFAULT_SITE_CONFIG` fallback
- `public/` — Static assets (favicon, photo, robots.txt, uploads/)
- `app/composables/cfw-rss2json.js` — Standalone Cloudflare Worker for RSS-to-JSON (deployed separately, not part of Nuxt build)

### Data Flow

- **Hero / Sites / Timeline / Static Articles** — sourced from `config.yaml` (build) or `config.json` (runtime)
- **Projects** — fetched live from the GitHub API at runtime via `useApi.ts`
- **Articles** — three sources with priority: blog API > RSS feed > static config list

### Theme System

Dark/light toggle persisted in `localStorage`, respects `prefers-color-scheme`. All colors defined via CSS custom properties on `:root` and `[data-theme="dark"]`.

## Key Conventions

- Chinese language site (`lang: "zh-CN"`), uses LXGW WenKai Lite custom font
- Responsive breakpoints: 1024px, 768px, 576px, 480px
- `@@/types` alias resolves to the `types/` directory
- Nitro preset is `node-server` — runs as a Node.js process
