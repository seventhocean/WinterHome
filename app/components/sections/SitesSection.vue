<template>
  <section id="sites" class="section" ref="sectionEl">
    <div class="section-header reveal">
      <h2 class="section-title">上线网站</h2>
      <p class="section-desc">精心雕琢的数字空间</p>
    </div>
    <div class="sites-grid reveal-stagger">
      <a v-for="(site, index) in sites" :key="index" :href="site.url" target="_blank" class="site-card reveal">
        <div v-if="site.screenshot" class="site-screenshot">
          <img :src="site.screenshot" :alt="site.name" loading="lazy" />
        </div>
        <div class="site-header">
          <i v-if="site.icon" :class="`ri-${site.icon}`" class="site-icon"></i>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" class="site-icon">
            <path
              d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v2h-4V7zm0 4h4v2h-4v-2zm-6 2h10v2H7v-2zm0 4h10v2H7v-2z" />
          </svg>
          <span class="site-title">{{ site.name }}</span>
          <span v-if="site.tag" class="site-tag">{{ site.tag }}</span>
        </div>
        <p class="site-description">{{ site.description }}</p>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SiteItem } from '@@/types'

interface Props {
  sites: SiteItem[]
}

defineProps<Props>()

const sectionEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()
onMounted(() => reveal(sectionEl.value))
</script>

<style lang="scss" scoped>
.section {
  padding: 5rem 0;
}

.section-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--nav-hover);
  margin-bottom: 0.5rem;
}

.section-desc {
  font-size: 0.9375rem;
  color: var(--nav-color);
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1.5rem;
}

.site-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
  background: var(--menu-backdrop);
  text-decoration: none;
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
  overflow: hidden;

  &:hover {
    border-color: var(--accent-border);
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);

    .site-screenshot img {
      transform: scale(1.03);
    }
  }
}

.site-screenshot {
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.3s;
  }
}

.site-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 0;
}

.site-icon {
  width: 1rem;
  height: 1rem;
  color: var(--nav-color);
}

.site-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--nav-hover);
}

.site-tag {
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--nav-color);
  padding: 0.125rem 0.375rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.25rem;
}

.site-description {
  font-size: 0.8125rem;
  color: var(--nav-color);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0 1rem 1rem;
  margin-top: -0.5rem;
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .sites-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
