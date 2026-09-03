<template>
  <section class="cta-section" ref="sectionEl">
    <div v-spotlight class="cta-card reveal spotlight">
      <div class="cta-glow"></div>
      <h2 class="cta-title">{{ title }}</h2>
      <p class="cta-desc">{{ description }}</p>
      <div class="cta-actions">
        <a v-if="primary?.url" :href="primary.url" target="_blank" rel="noopener noreferrer" class="cta-btn">
          {{ primary.text }}
          <i class="ri-arrow-right-line"></i>
        </a>
        <a v-if="secondary?.url" :href="secondary.url" target="_blank" rel="noopener noreferrer"
          class="cta-btn cta-btn--ghost">
          {{ secondary.text }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroAction } from '@@/types'

interface Props {
  primary?: HeroAction
  secondary?: HeroAction
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: '把 AI 变成你的生产力',
  description: '订阅服务 · 工作流 · 实战教程，都在冬天 AI 小店'
})

const sectionEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()

onMounted(() => nextTick(() => reveal(sectionEl.value)))
</script>

<style lang="scss" scoped>
.cta-section {
  padding: 3.5rem 0 4.5rem;
}

.cta-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
  padding: 3.5rem 2rem;
  text-align: center;
  border: 1px solid rgba(245, 166, 35, 0.35);
  border-radius: 1.25rem;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  box-shadow: 0 0 32px -12px rgba(245, 166, 35, 0.4), inset 0 1px 0 0 var(--card-top-light);
  overflow: hidden;
  transition: box-shadow 350ms ease-out, border-color 350ms ease-out;

  &:hover {
    border-color: rgba(245, 166, 35, 0.55);
    box-shadow: 0 0 44px -10px rgba(245, 166, 35, 0.5), inset 0 1px 0 0 var(--card-top-light);
  }
}

.cta-glow {
  position: absolute;
  top: -60%;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 120%;
  background: radial-gradient(ellipse, rgba(245, 166, 35, 0.14) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

.cta-title {
  position: relative;
  font-size: 1.625rem;
  font-weight: 700;
  color: var(--nav-hover);
  margin: 0;
}

.cta-desc {
  position: relative;
  font-size: 0.9375rem;
  color: var(--nav-color);
  margin: 0;
}

.cta-actions {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.625rem 1.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9999px;
  border: 1px solid var(--warm-deep);
  background-color: var(--warm-deep);
  color: var(--warm-contrast);
  box-shadow: 0 0 16px -6px rgba(245, 166, 35, 0.4);
  transition: all 300ms ease-out;

  &:hover {
    border-color: var(--warm);
    background-color: var(--warm);
    color: var(--warm-contrast);
    box-shadow: 0 0 28px -4px rgba(245, 166, 35, 0.6);
    transform: translateY(-1px);
  }

  i {
    transition: transform 250ms ease-out;
  }

  &:hover i {
    transform: translateX(3px);
  }
}

.cta-btn--ghost {
  border-color: var(--menu-border);
  background-color: transparent;
  color: var(--nav-hover);
  box-shadow: none;

  &:hover {
    border-color: var(--warm);
    background-color: var(--header-bg);
    color: var(--warm);
    box-shadow: 0 0 16px -5px rgba(245, 166, 35, 0.45);
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 3rem 0 3.5rem;
  }

  .cta-card {
    padding: 2.5rem 1.5rem;
  }

  .cta-title {
    font-size: 1.375rem;
  }
}
</style>
