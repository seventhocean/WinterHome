<template>
  <section id="articles" class="section" ref="sectionEl">
    <div class="section-header articles-header reveal">
      <div>
        <h2 class="section-title">{{ sectionTitle }}</h2>
        <p class="section-desc">思想的羽翼，心灵的絮语</p>
      </div>
      <a :href="blogUrl" target="_blank" rel="noopener noreferrer" class="header-link">
        前往博客
        <i class="ri-arrow-right-up-line"></i>
      </a>
    </div>

    <div v-if="articles.length > 0" class="articles-wrap reveal-stagger">
      <a :href="toArticleUrl(featuredArticle.url)" target="_blank" rel="noopener noreferrer" v-spotlight
        class="article-featured reveal spotlight">
        <div v-if="!hideCover" class="featured-cover">
          <img :src="featuredArticle.cover" :alt="featuredArticle.title" loading="lazy" />
        </div>
        <div class="featured-content">
          <span class="featured-label">最新</span>
          <h3 class="featured-title">{{ featuredArticle.title }}</h3>
          <p class="featured-summary">{{ featuredArticle.summary }}</p>
          <div class="article-meta">
            <span class="article-category">{{ featuredArticle.category.name }}</span>
            <span class="article-date">{{ formatDate(featuredArticle.publish_time) }}</span>
          </div>
        </div>
      </a>

      <div class="articles-list">
        <a v-for="article in restArticles" :key="article.id" :href="toArticleUrl(article.url)" target="_blank"
          rel="noopener noreferrer" v-spotlight class="article-row reveal spotlight">
          <div v-if="!hideCover && article.cover" class="row-thumb">
            <img :src="article.cover" :alt="article.title" loading="lazy" />
          </div>
          <div class="row-main">
            <h4 class="row-title">{{ article.title }}</h4>
            <p class="row-summary">{{ article.summary }}</p>
          </div>
          <div class="row-meta">
            <span class="article-category">{{ article.category.name }}</span>
            <span class="article-date">{{ formatDate(article.publish_time) }}</span>
          </div>
        </a>
      </div>
    </div>
    <div v-else class="articles-redirect">
      <p class="redirect-text">更多精彩内容尽在博客端</p>
      <p class="redirect-hint">文章加载失败，请检查网络连接</p>
      <a :href="blogUrl" target="_blank" rel="noopener noreferrer" class="view-all-btn">前往博客阅读更多</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Article } from '@@/types'

interface Props {
  articles: Article[]
  blogUrl: string
  sectionTitle: '近期文章' | '置顶文章'
  hideCover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  blogUrl: '#',
  sectionTitle: '近期文章',
  hideCover: false
})

const sectionEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()

const featuredArticle = computed(() => props.articles[0])
const restArticles = computed(() => props.articles.slice(1))

onMounted(() => nextTick(() => reveal(sectionEl.value)))
watch(() => props.articles, () => nextTick(() => reveal(sectionEl.value)))

const toArticleUrl = (articleUrl: string): string => {
  if (articleUrl.startsWith('http://') || articleUrl.startsWith('https://') || articleUrl.startsWith('mailto:')) {
    return articleUrl
  }

  if (!props.blogUrl || props.blogUrl === '#') {
    return articleUrl
  }

  return `${props.blogUrl}${articleUrl}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style lang="scss" scoped>
.section {
  padding: 3.5rem 0;
}

.section-header {
  margin-bottom: 2rem;
}

.articles-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
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

.header-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.875rem;
  font-size: 0.8125rem;
  font-weight: 500;
  text-decoration: none;
  color: var(--nav-color);
  border: 1px solid var(--menu-border);
  border-radius: 9999px;
  background: var(--header-bg);
  transition: all 200ms ease-out;

  &:hover {
    border-color: var(--warm-border);
    color: var(--warm);
    box-shadow: 0 0 18px -6px rgba(245, 166, 35, 0.42);
  }
}

/* 头条特写 */
.article-featured {
  display: grid;
  grid-template-columns: 7fr 5fr;
  margin-bottom: 1.5rem;
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  overflow: hidden;
  text-decoration: none;
  box-shadow: var(--shadow-sm), inset 0 1px 0 0 var(--card-top-light);
  transition: transform var(--transition-normal), box-shadow 350ms ease-out, border-color 350ms ease-out;

  &:hover {
    border-color: var(--warm-border);
    box-shadow: var(--card-hover-glow), inset 0 1px 0 0 var(--card-top-light);
    transform: translateY(-3px);

    .featured-cover img {
      transform: scale(1.04);
    }
  }
}

.featured-cover {
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    min-height: 240px;
    object-fit: cover;
    transition: transform 0.3s;
  }
}

.featured-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.75rem;
}

.featured-label {
  width: fit-content;
  padding: 0.2rem 0.6rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--warm);
  background: var(--header-bg);
  border: 1px solid var(--warm-border);
  border-radius: 9999px;
}

.featured-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--nav-hover);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.featured-summary {
  font-size: 0.875rem;
  color: var(--nav-color);
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: var(--toggle-icon);
  margin-top: 0.25rem;
}

.article-category {
  padding: 0.125rem 0.5rem;
  background: var(--header-bg);
  border-radius: 0.25rem;
}

/* 编辑式列表 */
.articles-list {
  border: 1px solid var(--card-border);
  border-radius: 0.75rem;
  background: var(--card-bg);
  backdrop-filter: var(--card-blur);
  -webkit-backdrop-filter: var(--card-blur);
  box-shadow: var(--shadow-sm), inset 0 1px 0 0 var(--card-top-light);
  overflow: hidden;
}

.article-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.25rem;
  text-decoration: none;
  border-bottom: 1px solid var(--menu-border);
  transition: background 250ms ease-out;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--header-bg);

    .row-title {
      color: var(--warm);
    }
  }
}

.row-thumb {
  width: 5.5rem;
  aspect-ratio: 16 / 10;
  flex-shrink: 0;
  border-radius: 0.375rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.row-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.row-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--nav-hover);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 250ms ease-out;
  margin: 0;
}

.row-summary {
  font-size: 0.8125rem;
  color: var(--nav-color);
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.row-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
  font-size: 0.75rem;
  color: var(--toggle-icon);
}

.articles-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.75rem;
}

.redirect-text {
  font-size: 1rem;
  color: var(--nav-hover);
}

.redirect-hint {
  font-size: 0.875rem;
  color: var(--nav-color);
}

@media (max-width: 1024px) {
  .article-featured {
    grid-template-columns: 1fr;

    .featured-cover img {
      min-height: 0;
      aspect-ratio: 16 / 9;
    }
  }
}

@media (max-width: 768px) {
  .section {
    padding: 3rem 0;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .articles-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .article-row {
    flex-wrap: wrap;
    padding: 0.75rem 1rem;
  }

  .row-thumb {
    width: 4.5rem;
  }

  .row-main {
    flex-basis: calc(100% - 6.5rem);
  }

  .row-meta {
    flex-basis: 100%;
    padding-left: 0;
  }
}
</style>
