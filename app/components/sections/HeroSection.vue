<template>
  <section id="home" class="hero-section">
    <div class="hero-bg">
      <div class="hero-grid"></div>
      <div class="hero-glow"></div>
      <div class="hero-dots"></div>
      <div class="hero-windows">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>

    <div class="hero-content">
      <div class="hero-badge">
        <span class="badge-dot"></span>
        <Transition name="badge-swap" mode="out-in">
          <span :key="badgeText" class="badge-text">{{ badgeText }}</span>
        </Transition>
      </div>

      <div class="hero-intro">
        <h1 class="hero-name">Hi，我是 {{ props.author }}</h1>
        <div v-if="props.hero.descriptions.length" class="hero-bio">
          <p v-for="(line, index) in props.hero.descriptions" :key="index">
            {{ line }}
          </p>
        </div>
      </div>

      <div v-if="props.hero.skills.length" class="hero-skills">
        <span class="skills-label">专注于</span>
        <div class="skills-grid">
          <span v-for="skill in props.hero.skills" :key="skill" class="skill-item">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="hero-stats">
        <div class="stat-item">
          <span class="stat-value">{{ props.projectsCount }}</span>
          <span class="stat-label">精选项目</span>
        </div>
        <span class="stat-divider"></span>
        <div class="stat-item">
          <span class="stat-value">{{ props.sitesCount }}</span>
          <span class="stat-label">上线网站</span>
        </div>
        <span class="stat-divider"></span>
        <div class="stat-item">
          <span class="stat-value">{{ props.articlesCount }}</span>
          <span class="stat-label">{{ props.articlesLabel }}</span>
        </div>
      </div>

      <div class="hero-actions">
        <a :href="props.hero.primaryAction.url" target="_blank" rel="noopener noreferrer" class="hero-btn">
          {{ props.hero.primaryAction.text }}
        </a>
        <a v-if="props.hero.secondaryAction?.url" :href="props.hero.secondaryAction.url" target="_blank"
          rel="noopener noreferrer" class="hero-btn hero-btn--ghost">
          {{ props.hero.secondaryAction.text }}
        </a>
        <div class="social-links">
          <a v-for="contact in props.hero.socialLinks" :key="contact.name" :href="contact.url" target="_blank"
            :aria-label="contact.name" rel="noopener noreferrer" class="social-link">
            <svg v-if="contact.svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path :d="contact.svg" />
            </svg>
            <i v-else :class="contact.icon" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>

    <div class="hero-visual">
      <div class="photo-container">
        <div class="window-unit">
          <div class="casing-inner">
            <div class="photo-frame window-frame">
              <img :src="props.hero.rightPhoto.image" alt="站长形象" loading="eager" class="photo-image" />
              <div class="window-cast" aria-hidden="true"></div>
              <div class="window-glow" aria-hidden="true"></div>
              <div class="window-lining" aria-hidden="true"></div>
              <div class="window-muntin window-muntin-v" aria-hidden="true"></div>
              <div class="window-muntin window-muntin-h" aria-hidden="true"></div>
              <div class="window-frost" aria-hidden="true"></div>
              <div class="window-reflection" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <div class="window-light-pool" aria-hidden="true"></div>
        <div class="window-sill" aria-hidden="true"></div>
        <div v-if="props.hero.rightPhoto.iconA" class="photo-float" :class="`photo-float-1`">
          <i :class="props.hero.rightPhoto.iconA"></i>
        </div>
        <div v-if="props.hero.rightPhoto.iconB" class="photo-float" :class="`photo-float-2`">
          <i :class="props.hero.rightPhoto.iconB"></i>
        </div>
        <div v-if="props.hero.rightPhoto.iconC" class="photo-float" :class="`photo-float-3`">
          <i :class="props.hero.rightPhoto.iconC"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroConfig } from '@@/types'

interface Props {
  projectsCount: number
  sitesCount: number
  articlesCount: number
  articlesLabel: '发布文章' | '置顶文章'
  author: string
  hero: HeroConfig
}

const props = withDefaults(defineProps<Props>(), {
  articlesLabel: '发布文章',
  author: '',
  hero: () => ({
    badgeText: '',
    descriptions: [],
    skills: [],
    primaryAction: {
      text: '进入我的博客',
      url: '#'
    },
    socialLinks: [],
    rightPhoto: {
      image: '/photo.jpg',
      iconA: '',
      iconB: '',
      iconC: ''
    }
  })
})

/* 时刻感知徽章：首屏先显示站点文案，挂载后淡入实时时间问候 */
const { timeText } = useTimeGreeting()
const timeReady = ref(false)

const badgeText = computed(() => {
  if (timeReady.value && timeText.value) return timeText.value
  return props.hero.badgeText
})

onMounted(() => {
  window.setTimeout(() => {
    timeReady.value = true
  }, 1400)
})
</script>

<style lang="scss" scoped>
.hero-section {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  place-items: center;
  min-height: 100vh;
  padding: 3rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;

  /* 神秘靛紫光晕（右下），与全局夜空呼应 */
  &::after {
    content: "";
    position: absolute;
    right: 6%;
    bottom: 8%;
    width: 34%;
    height: 34%;
    background: radial-gradient(circle, var(--sky-glow-2) 0%, transparent 70%);
    filter: blur(70px);
  }
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--menu-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--menu-border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.3;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
}

.hero-glow {
  position: absolute;
  top: 12%;
  left: 8%;
  width: 38%;
  height: 38%;
  background: radial-gradient(circle, var(--sky-glow-1) 0%, transparent 68%);
  opacity: 1;
  filter: blur(70px);
}

.hero-dots {
  position: absolute;
  top: 60%;
  right: 5%;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(var(--sky-star-color) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.35;
  mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
}

/* 远处的窗：雪原对面零星亮着灯的暖色光点 */
.hero-windows {
  position: absolute;
  inset: 0;

  span {
    position: absolute;
    width: 3px;
    height: 4px;
    border-radius: 1px;
    background: var(--warm);
    box-shadow: 0 0 7px 1px rgba(245, 166, 35, 0.55);
  }

  span:nth-child(1) {
    left: 13%;
    top: 63%;
    opacity: 0.5;
  }

  span:nth-child(2) {
    left: 19%;
    top: 67%;
    width: 2px;
    height: 3px;
    opacity: 0.34;
  }

  span:nth-child(3) {
    left: 27%;
    top: 64.5%;
    width: 2px;
    height: 3px;
    opacity: 0.4;
  }

  span:nth-child(4) {
    left: 33%;
    top: 69%;
    opacity: 0.28;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  animation: hero-enter 0.8s ease-out both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.375rem 0.875rem;
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--nav-color);
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: var(--warm);
  border-radius: 50%;
  box-shadow: 0 0 8px 1px var(--warm-soft);
  animation: pulse 2s ease-in-out infinite, warm-arrive 1.1s ease-out 0.4s both;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.badge-text {
  letter-spacing: 0.02em;
}

/* 徽章文案切换：站点文案 ↔ 实时时间问候 */
.badge-swap-enter-active,
.badge-swap-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}

.badge-swap-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.badge-swap-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.hero-intro {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.hero-name {
  font-size: 4rem;
  font-weight: 700;
  color: var(--nav-hover);
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: linear-gradient(120deg, var(--toggle-border) 0%, var(--nav-hover) 52%, var(--accent-violet) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-bio {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;

  p {
    font-size: 1.125rem;
    color: var(--nav-color);
    line-height: 1.7;
    max-width: 32rem;
    margin: 0;
  }
}

.hero-skills {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skills-label {
  font-size: 0.75rem;
  color: var(--toggle-icon);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-item {
  padding: 0.5rem 0.875rem;
  font-size: 0.8125rem;
  color: var(--nav-hover);
  background: var(--header-bg);
  border: 1px solid var(--menu-border);
  border-radius: 0.375rem;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 200ms ease-out;

  &:hover {
    border-color: var(--accent-border);
    background: var(--accent-soft);
    transform: translateY(-2px);
  }
}

.hero-stats {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1.25rem 0;
  margin: 0.5rem 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--nav-hover);
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--nav-color);
}

.stat-divider {
  width: 1px;
  height: 2rem;
  background: var(--menu-border);
  align-self: center;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 9999px;
  border: 1px solid var(--warm-deep);
  background-color: var(--warm-deep);
  color: var(--warm-contrast);
  box-shadow: 0 0 12px -6px rgba(245, 166, 35, 0.32);
  transition: all 300ms ease-out;
  animation: warm-arrive 1.2s ease-out 0.35s both;

  &:hover {
    border-color: var(--warm);
    background-color: var(--warm);
    color: var(--warm-contrast);
    box-shadow: 0 0 26px -3px rgba(245, 166, 35, 0.6);
    transform: translateY(-1px);
  }
}

.hero-btn--ghost {
  border-color: var(--menu-border);
  background-color: transparent;
  color: var(--nav-hover);
  box-shadow: none;

  &:hover {
    border-color: var(--warm);
    background-color: var(--header-bg);
    color: var(--warm);
    box-shadow: 0 0 16px -5px rgba(245, 166, 35, 0.45);
    transform: translateY(-1px);
  }
}

.social-links {
  display: flex;
  gap: 0.25rem;
  margin-left: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--toggle-icon);
  border-radius: 0.5rem;
  transition: all 200ms ease-out;

  i {
    font-size: 1.5rem;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: var(--warm);
    background: var(--header-bg);
    box-shadow: 0 0 16px -5px rgba(245, 166, 35, 0.45);
  }
}

.hero-visual {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: hero-enter 0.8s ease-out 0.12s both;
}

.photo-container {
  position: relative;
  width: 100%;
  max-width: 28rem;
}

/* 实体窗第一层：窗套（外框），斜面渐变模拟木质模具的受光 */
.window-unit {
  position: relative;
  z-index: 5;
  padding: 14px;
  border-radius: 8px;
  background: linear-gradient(155deg, #2b3145 0%, #171c2c 38%, #0d1120 100%);
  box-shadow:
    0 0 0 1px rgba(148, 176, 216, 0.14),
    inset 0 1px 0 rgba(168, 196, 232, 0.22),
    inset 0 -2px 6px rgba(0, 0, 0, 0.55),
    inset 2px 0 4px rgba(0, 0, 0, 0.3),
    0 26px 54px -18px rgba(0, 0, 0, 0.68),
    0 0 90px -6px rgba(245, 166, 35, 0.26);
}

/* 实体窗第二层：线脚（窗套与玻璃之间的台阶），上缘受光、内圈被灯光染暖 */
.casing-inner {
  padding: 7px;
  border-radius: 4px;
  background: linear-gradient(155deg, #1b2133 0%, #0e1322 60%, #0a0e1a 100%);
  box-shadow:
    inset 0 2px 5px rgba(0, 0, 0, 0.65),
    inset 0 -1px 0 rgba(150, 180, 220, 0.1),
    inset 0 0 14px rgba(245, 166, 35, 0.1);
}

/* 实体窗第三层：玻璃（照片），尺寸/裁切不变 */
.photo-frame {
  position: relative;
  z-index: 5;
  border-radius: 2px;
  overflow: hidden;
}

/* 窗框叙事：照片是一扇深夜亮着灯的窗 */

/* 素描照片保持干净垫底 = 深夜亮着灯的窗；暗角收边 + 轻微暖罩，中心不受影响 */
.window-cast {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(10, 14, 26, 0.2) 100%),
    linear-gradient(180deg, rgba(245, 166, 35, 0.06) 0%, rgba(245, 166, 35, 0.03) 100%);
}

.window-glow {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(58% 46% at 50% 62%, rgba(245, 166, 35, 0.26) 0%, transparent 74%);
  animation: lamp-breathe 9s ease-in-out infinite;
}

/* 暖色内衬：独立 overlay，避免被 img 内容覆盖 */
.window-lining {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  border: 1px solid rgba(245, 166, 35, 0.42);
}

/* 窗棂：深色窗芯 + 暖色棱边，并在玻璃上投下影子 */
.window-muntin {
  position: absolute;
  z-index: 4;
  pointer-events: none;
  background: linear-gradient(135deg, #1e2436 0%, #0f1322 70%);
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(245, 166, 35, 0.2);
}

/* 三分线偏置：人脸完整落在右上大格玻璃内 */
.window-muntin-v {
  top: 0;
  bottom: 0;
  left: 30%;
  width: 6px;
  transform: translateX(-50%);
}

.window-muntin-h {
  left: 0;
  right: 0;
  top: 69%;
  height: 6px;
  transform: translateY(-50%);
}

/* 霜花：冷灰蓝调，在亮玻璃上可见 */
.window-frost {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background:
    radial-gradient(46% 34% at 0% 0%, rgba(168, 196, 230, 0.38) 0%, rgba(190, 214, 240, 0.12) 45%, transparent 100%),
    radial-gradient(40% 30% at 100% 0%, rgba(168, 196, 230, 0.3) 0%, transparent 100%),
    radial-gradient(48% 36% at 0% 100%, rgba(168, 196, 230, 0.32) 0%, transparent 100%),
    radial-gradient(42% 32% at 100% 100%, rgba(168, 196, 230, 0.36) 0%, transparent 100%);
}

/* 反光：暗+亮双色斜带，亮窗上的玻璃反光形态 */
.window-reflection {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  background: linear-gradient(115deg,
      transparent 30%,
      rgba(24, 36, 64, 0.1) 38%,
      rgba(255, 255, 255, 0.16) 43%,
      rgba(24, 36, 64, 0.06) 48%,
      transparent 56%);
}

/* 灯光呼吸：9s 周期内偶尔极轻微变暗再回，像屋里有人走动挡了下灯 */
@keyframes lamp-breathe {

  0%,
  81%,
  93%,
  100% {
    opacity: 1;
  }

  84% {
    opacity: 0.68;
  }

  87% {
    opacity: 0.92;
  }

  90% {
    opacity: 0.76;
  }
}

.photo-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
}

/* 窗台：承接窗内灯光的实体收尾，与窗套同族材质 */
.window-sill {
  position: absolute;
  left: -1.25rem;
  right: -1.25rem;
  bottom: -1.25rem;
  height: 1.125rem;
  border-radius: 0.25rem;
  background: linear-gradient(180deg, #31374c 0%, #171c2c 55%, #0d1120 100%);
  box-shadow:
    inset 0 1px 0 rgba(245, 166, 35, 0.35),
    inset 0 -2px 4px rgba(0, 0, 0, 0.5),
    0 10px 24px -10px rgba(0, 0, 0, 0.6);
  z-index: 4;
}

/* 墙面光晕：窗内灯光洒在墙上的一片暖光 */
.window-light-pool {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: -3.75rem;
  height: 3rem;
  background: radial-gradient(50% 100% at 50% 0%, rgba(245, 166, 35, 0.16) 0%, transparent 75%);
  filter: blur(8px);
  pointer-events: none;
  z-index: 0;
}

.photo-float {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: var(--menu-backdrop);
  border: 1px solid rgba(245, 166, 35, 0.38);
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 16px -3px rgba(245, 166, 35, 0.5);
  z-index: 10;
  animation: float 4s ease-in-out infinite;

  i {
    font-size: 1.25rem;
    color: var(--warm);
  }
}

.photo-float-1 {
  top: 10%;
  right: -0.5rem;
  animation-delay: 0s;
}

.photo-float-2 {
  bottom: 30%;
  left: -1rem;
  animation-delay: 1s;
}

.photo-float-3 {
  bottom: 10%;
  right: 5%;
  animation-delay: 2s;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* 开门入场：内容轻柔升起 */
@keyframes hero-enter {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 灯火点亮：从暗到暖（门 / 呼吸灯一次性） */
@keyframes warm-arrive {
  from {
    filter: brightness(0.4) saturate(0.5);
  }

  to {
    filter: brightness(1) saturate(1);
  }
}

@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 3rem 1rem;
  }

  .hero-bg {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
  }

  .hero-visual {
    margin-top: 0.5rem;
  }

  /* 移动端窗户：整体缩放，保持实体结构 */
  .photo-container {
    max-width: 19rem;
  }

  .window-unit {
    padding: 10px;
    border-radius: 6px;
    box-shadow:
      0 0 0 1px rgba(148, 176, 216, 0.14),
      inset 0 1px 0 rgba(168, 196, 232, 0.22),
      inset 0 -2px 6px rgba(0, 0, 0, 0.55),
      inset 2px 0 4px rgba(0, 0, 0, 0.3),
      0 20px 40px -16px rgba(0, 0, 0, 0.66),
      0 0 60px -8px rgba(245, 166, 35, 0.24);
  }

  .casing-inner {
    padding: 5px;
  }

  .window-sill {
    left: -0.75rem;
    right: -0.75rem;
    bottom: -0.9375rem;
    height: 0.875rem;
  }

  .window-light-pool {
    bottom: -2.5rem;
    height: 2.25rem;
  }

  .photo-float {
    width: 2.375rem;
    height: 2.375rem;

    i {
      font-size: 1rem;
    }
  }

  .photo-float-1 {
    right: -0.25rem;
  }

  .photo-float-2 {
    left: -0.25rem;
  }

  .hero-name {
    font-size: 2.75rem;
  }

  .hero-bio p {
    font-size: 1rem;
  }

  .hero-stats {
    gap: 1rem;
    padding: 1rem 0;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .social-links {
    justify-content: center;
    margin-left: 0;
    margin-top: 0.5rem;
  }
}

@media (max-width: 480px) {
  .photo-container {
    max-width: 16.5rem;
  }

  .hero-name {
    font-size: 2.25rem;
  }

  .hero-badge {
    font-size: 0.6875rem;
    padding: 0.25rem 0.625rem;
  }

  .skills-grid {
    gap: 0.375rem;
  }

  .skill-item {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
  }

  .hero-stats {
    gap: 0.75rem 1.25rem;
  }

  .stat-divider {
    display: none;
  }
}
</style>
