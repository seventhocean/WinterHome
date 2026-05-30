<template>
  <div class="layout-default">
    <div class="night-sky" aria-hidden="true">
      <div class="sky-stars"></div>
      <div class="sky-glow sky-glow-frost"></div>
      <div class="sky-glow sky-glow-violet"></div>
    </div>

    <LayoutsHeader />
    <slot />
    <LayoutsFooter />
  </div>
</template>

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
  filter: blur(90px);
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
</style>
