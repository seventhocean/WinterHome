<template>
  <div class="layout-default">
    <div class="night-sky" aria-hidden="true">
      <div class="sky-stars"></div>
      <div class="sky-glow sky-glow-frost"></div>
      <div class="sky-glow sky-glow-violet"></div>

      <div class="snow">
        <span
          v-for="(f, i) in snowflakes"
          :key="i"
          class="snowflake"
          :style="{
            left: f.left + '%',
            '--s': f.size + 'px',
            '--op': f.op,
            '--drift': f.drift + 'px',
            animationDuration: f.dur + 's',
            animationDelay: f.delay + 's'
          }"
        ></span>
      </div>
    </div>

    <LayoutsHeader />
    <slot />
    <LayoutsFooter />
  </div>
</template>

<script setup lang="ts">
/**
 * 中雪：同屏 ~32 粒，大小 1~3px，opacity 0.08~0.28，速度很慢。
 * 参数固定（非随机），避免 SSR / 客户端水合不一致。
 * 负的 animationDelay 让雪粒一开始就分散在页面各处，而非同时从顶部落下。
 */
const snowflakes = [
  { left: 2,  size: 1.5, dur: 20, delay: 0,   op: 0.14, drift: 10 },
  { left: 5,  size: 2,   dur: 17, delay: -6,  op: 0.22, drift: 14 },
  { left: 8,  size: 1,   dur: 26, delay: -21, op: 0.09, drift: -8 },
  { left: 11, size: 2.5, dur: 18, delay: -28, op: 0.24, drift: 12 },
  { left: 14, size: 1.5, dur: 22, delay: -3,  op: 0.16, drift: -10 },
  { left: 17, size: 1,   dur: 28, delay: -15, op: 0.10, drift: 7 },
  { left: 20, size: 3,   dur: 14, delay: -24, op: 0.28, drift: 18 },
  { left: 23, size: 2,   dur: 16, delay: -9,  op: 0.20, drift: -15 },
  { left: 26, size: 1.5, dur: 24, delay: -31, op: 0.13, drift: -6 },
  { left: 29, size: 1,   dur: 27, delay: -18, op: 0.11, drift: 9 },
  { left: 32, size: 2,   dur: 19, delay: -5,  op: 0.21, drift: 13 },
  { left: 35, size: 2.5, dur: 15, delay: -26, op: 0.25, drift: -11 },
  { left: 38, size: 1,   dur: 25, delay: -12, op: 0.10, drift: -9 },
  { left: 41, size: 1.5, dur: 21, delay: -29, op: 0.15, drift: 16 },
  { left: 44, size: 2,   dur: 17, delay: -8,  op: 0.19, drift: 8 },
  { left: 47, size: 3,   dur: 13, delay: -22, op: 0.27, drift: -17 },
  { left: 50, size: 1,   dur: 26, delay: -2,  op: 0.11, drift: -14 },
  { left: 53, size: 1.5, dur: 23, delay: -16, op: 0.16, drift: 12 },
  { left: 56, size: 2,   dur: 18, delay: -30, op: 0.22, drift: -7 },
  { left: 59, size: 1,   dur: 28, delay: -10, op: 0.08, drift: 15 },
  { left: 62, size: 2.5, dur: 16, delay: -25, op: 0.23, drift: -13 },
  { left: 65, size: 1.5, dur: 20, delay: -7,  op: 0.14, drift: 11 },
  { left: 68, size: 1,   dur: 27, delay: -19, op: 0.10, drift: -8 },
  { left: 71, size: 2,   dur: 15, delay: -32, op: 0.21, drift: 17 },
  { left: 74, size: 3,   dur: 14, delay: -14, op: 0.26, drift: -10 },
  { left: 77, size: 1,   dur: 24, delay: -4,  op: 0.12, drift: 9 },
  { left: 80, size: 1.5, dur: 22, delay: -27, op: 0.15, drift: -16 },
  { left: 83, size: 2,   dur: 19, delay: -11, op: 0.18, drift: 14 },
  { left: 86, size: 1,   dur: 26, delay: -23, op: 0.09, drift: -12 },
  { left: 89, size: 2.5, dur: 17, delay: -20, op: 0.24, drift: 8 },
  { left: 92, size: 1.5, dur: 25, delay: -1,  op: 0.13, drift: -9 },
  { left: 95, size: 1,   dur: 28, delay: -17, op: 0.10, drift: 10 },
  { left: 97, size: 2,   dur: 21, delay: -13, op: 0.20, drift: -15 }
] as const
</script>

<style lang="scss" scoped>
.layout-default {
  position: relative;
  z-index: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 固定夜空层：铺满整个视口，所有内容沉浸其上 */
.night-sky {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: var(--sky-gradient);
  transition: background 600ms ease;

  /* 暗角：让夜空有纵深、四周收暗 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(125% 120% at 50% 38%, transparent 55%, var(--sky-vignette) 100%);
  }
}

/* 月光霜蓝光晕（右上） */
.sky-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  will-change: transform;
}

.sky-glow-frost {
  top: -12%;
  right: -8%;
  width: 52vw;
  height: 52vw;
  background: radial-gradient(circle, var(--sky-glow-1) 0%, transparent 70%);
  animation: drift 24s ease-in-out infinite;
}

/* 神秘靛紫光晕（左下） */
.sky-glow-violet {
  bottom: -18%;
  left: -10%;
  width: 56vw;
  height: 56vw;
  background: radial-gradient(circle, var(--sky-glow-2) 0%, transparent 70%);
  animation: drift-reverse 30s ease-in-out infinite;
}

/* 星点：稀疏、极慢闪烁，营造静谧夜空 */
.sky-stars {
  position: absolute;
  inset: 0;
  opacity: var(--sky-star-opacity);
  background-image:
    radial-gradient(1px 1px at 18% 24%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 74% 16%, var(--sky-star-color), transparent),
    radial-gradient(1.5px 1.5px at 44% 62%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 88% 48%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 11% 72%, var(--sky-star-color), transparent),
    radial-gradient(1.5px 1.5px at 63% 84%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 32% 10%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 92% 78%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 54% 34%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 26% 50%, var(--sky-star-color), transparent),
    radial-gradient(1.5px 1.5px at 82% 30%, var(--sky-star-color), transparent),
    radial-gradient(1px 1px at 6% 40%, var(--sky-star-color), transparent);
  background-repeat: no-repeat;
  animation: twinkle 7s ease-in-out infinite;
}

/* 极简飘雪 */
.snow {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -10px;
  width: var(--s);
  height: var(--s);
  border-radius: 50%;
  background: var(--snow-color);
  opacity: 0;
  will-change: transform;
  animation-name: snowfall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes snowfall {
  0% {
    transform: translate3d(0, -10px, 0);
    opacity: 0;
  }
  12% {
    opacity: var(--op);
  }
  88% {
    opacity: var(--op);
  }
  100% {
    transform: translate3d(var(--drift), 100vh, 0);
    opacity: 0;
  }
}
</style>
