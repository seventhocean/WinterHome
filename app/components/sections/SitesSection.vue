<template>
  <section id="sites" class="section" ref="sectionEl">
    <div class="section-header reveal">
      <h2 class="section-title">上线网站</h2>
      <p class="section-desc">精心雕琢的数字空间</p>
    </div>

    <a v-if="featuredSite" :href="featuredSite.url" target="_blank" v-spotlight class="site-banner reveal spotlight">
      <div class="banner-body">
        <div class="banner-header">
          <i v-if="featuredSite.icon" :class="`ri-${featuredSite.icon}`" class="banner-icon"></i>
          <span class="banner-title">{{ featuredSite.name }}</span>
          <span v-if="featuredSite.tag" class="banner-tag">{{ featuredSite.tag }}</span>
          <span class="banner-badge">主营</span>
        </div>
        <p class="banner-desc">{{ featuredSite.description }}</p>
        <span class="banner-cta">
          进店逛逛
          <i class="ri-arrow-right-line"></i>
        </span>
      </div>
      <div v-if="featuredSite.screenshot" class="banner-screenshot">
        <img :src="featuredSite.screenshot" :alt="featuredSite.name" loading="lazy" />
      </div>
    </a>

    <div class="sites-grid reveal-stagger">
      <a v-for="(site, index) in regularSites" :key="index" :href="site.url" target="_blank" v-spotlight
        class="site-card reveal spotlight">
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

const props = defineProps<Props>()

const sectionEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()

const featuredSite = computed(() => props.sites.find((site) => site.featured))
const regularSites = computed(() => props.sites.filter((site) => !site.featured))

onMounted(() => nextTick(() => reveal(sectionEl.value)))
watch(() => props.sites, () => nextTick(() => reveal(sectionEl.value)))
</script>

<style lang="scss" scoped>
.section {
  padding: 3.5rem 0;
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

/* 主营站点：全宽展示 banner */
.site-banner {
  position: relative;
  display: grid;
  grid-template-columns: 5fr 7fr;
  align-items: stretch;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(245, 166, 35, 0.45);
  border-radius: 1rem;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 0 28px -10px rgba(245, 166, 35, 0.4), inset 0 1px 0 0 var(--card-top-light);
  transition: transform var(--transition-normal), box-shadow 350ms ease-out, border-color 350ms ease-out;

  &:hover {
    border-color: var(--warm);
    box-shadow: 0 0 40px -8px rgba(245, 166, 35, 0.55), inset 0 1px 0 0 var(--card-top-light);
    transform: translateY(-3px);

    .banner-screenshot img {
      transform: scale(1.03);
    }

    .banner-cta i {
      transform: translateX(4px);
    }
  }
}

.banner-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.875rem;
  padding: 2rem;
}

.banner-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.banner-icon {
  font-size: 1.25rem;
  color: var(--warm);
}

.banner-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--nav-hover);
}

.banner-tag {
  font-size: 0.625rem;
  font-weight: 500;
  color: var(--nav-color);
  padding: 0.125rem 0.375rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.25rem;
}

.banner-badge {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--warm-contrast);
  padding: 0.2rem 0.55rem;
  background: var(--warm-deep);
  border-radius: 9999px;
  box-shadow: 0 0 12px -2px rgba(245, 166, 35, 0.55);
}

.banner-desc {
  font-size: 0.9375rem;
  color: var(--nav-color);
  line-height: 1.7;
  margin: 0;
}

.banner-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  width: fit-content;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--warm);

  i {
    transition: transform 250ms ease-out;
  }
}

.banner-screenshot {
  min-height: 240px;
  overflow: hidden;
  border-left: 1px solid rgba(245, 166, 35, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: transform 0.3s;
  }
}

/* 其余站点：卡片网格 */
.sites-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.site-card {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 280px;
  max-width: calc((100% - 3rem) / 3);
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  text-decoration: none;
  box-shadow: var(--shadow-sm), inset 0 1px 0 0 var(--card-top-light);
  transition: transform var(--transition-normal), box-shadow 350ms ease-out, border-color 350ms ease-out;
  overflow: hidden;

  &:hover {
    border-color: var(--warm-border);
    box-shadow: var(--card-hover-glow), inset 0 1px 0 0 var(--card-top-light);
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

@media (max-width: 1024px) {
  .site-banner {
    grid-template-columns: 1fr;
  }

  .banner-screenshot {
    min-height: 200px;
    border-left: none;
    border-top: 1px solid rgba(245, 166, 35, 0.25);
    order: -1;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .sites-grid {
    gap: 1rem;
  }

  .site-card {
    flex-basis: 100%;
    max-width: 100%;
  }

  .banner-body {
    padding: 1.5rem;
  }
}
</style>
