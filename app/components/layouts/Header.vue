<template>
  <header>
    <div class="container">
      <a href="#home" class="logo" @click.prevent="scrollTo('home')">{{ siteTitle }}</a>

      <nav class="menu" :class="{ open: mobileOpen }">
        <a
          v-for="menu in menuItems"
          :key="menu.id"
          :href="menu.href"
          :class="{ active: activeSection === menu.id }"
          @click.prevent="handleNav(menu.id)"
        >
          {{ menu.title }}
        </a>
      </nav>

      <div class="header-actions">
        <button class="icon-btn" @click="toggleTheme" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'">
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <button class="hamburger icon-btn" @click="mobileOpen = !mobileOpen" aria-label="菜单">
          <svg v-if="!mobileOpen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { SiteConfig } from '@@/types'

const { isDark, syncTheme, toggleTheme } = useTheme()
const config = useRuntimeConfig().public.appConfig as unknown as SiteConfig | undefined
const siteTitle = config?.site?.title

const mobileOpen = ref(false)
const activeSection = ref('')

const menuItems = [
  { id: 'projects', title: '项目', href: '#projects' },
  { id: 'sites', title: '网站', href: '#sites' },
  { id: 'articles', title: '文章', href: '#articles' },
  { id: 'timeline', title: '过往', href: '#timeline' }
] as const

const scrollTo = (id: string): void => {
  const el = document.getElementById(id)
  if (el) {
    window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' })
  }
}

const handleNav = (id: string): void => {
  scrollTo(id)
  mobileOpen.value = false
}

/** Scroll-spy: highlight current visible section */
const updateActiveSection = (): void => {
  const ids = ['articles', 'timeline', 'sites', 'projects', 'home']
  for (const id of ids) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        activeSection.value = id === 'home' ? '' : id
        return
      }
    }
  }
  activeSection.value = ''
}

onMounted(() => {
  syncTheme()
  window.addEventListener('scroll', updateActiveSection, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  max-width: 72rem;
  padding: 0 1.5rem;
  background: var(--header-bg);
  backdrop-filter: blur(40px);
  border: 1px solid var(--header-border);
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

.logo {
  font-weight: 600;
  color: var(--logo-color);
  cursor: pointer;
}

.menu {
  display: flex;
  gap: 2rem;
  font-size: 1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  a {
    color: var(--nav-color);
    cursor: pointer;
    padding: 0.25rem 0;
    border-bottom: 2px solid transparent;
    transition: color var(--transition-fast), border-color var(--transition-fast);

    &:hover {
      color: var(--nav-hover);
    }

    &.active {
      color: var(--accent);
      border-color: var(--accent);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--toggle-color);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.hamburger {
  display: none;
}

/* Mobile */
@media (max-width: 576px) {
  .menu {
    position: fixed;
    top: 3.75rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    flex-direction: column;
    gap: 0;
    padding: 0.5rem 0;
    background: var(--menu-bg);
    backdrop-filter: blur(40px);
    border: 1px solid var(--menu-border);
    border-radius: 0.75rem;
    box-shadow: var(--shadow-lg);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-8px);
    transition: opacity var(--transition-normal), transform var(--transition-normal);

    &.open {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    a {
      padding: 0.75rem 1.25rem;
      border-bottom: none;
      font-size: 0.9375rem;
    }
  }

  .hamburger {
    display: flex;
  }
}
</style>
