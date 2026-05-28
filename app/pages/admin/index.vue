<template>
  <div class="dashboard">
    <h1 class="page-title">仪表盘</h1>
    <p class="page-desc">欢迎回来，这里是 Winter 管理后台。</p>

    <div class="card-grid">
      <NuxtLink to="/admin/settings/site" class="dash-card">
        <i class="ri-global-line"></i>
        <h3>站点信息</h3>
        <p>标题、描述、关键词、作者、URL</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/hero" class="dash-card">
        <i class="ri-home-smile-line"></i>
        <h3>首页首屏</h3>
        <p>徽章、简介、技能、社交链接、照片</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/projects" class="dash-card">
        <i class="ri-folder-line"></i>
        <h3>项目列表</h3>
        <p>管理 GitHub 仓库展示</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/sites" class="dash-card">
        <i class="ri-links-line"></i>
        <h3>网站收藏</h3>
        <p>管理上线网站展示</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/timeline" class="dash-card">
        <i class="ri-time-line"></i>
        <h3>时间线</h3>
        <p>管理过往经历</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/articles" class="dash-card">
        <i class="ri-article-line"></i>
        <h3>文章管理</h3>
        <p>博客地址、文章 API、RSS、文章列表</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/footer" class="dash-card">
        <i class="ri-layout-bottom-line"></i>
        <h3>页脚</h3>
        <p>版权年份、备案信息</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/password" class="dash-card">
        <i class="ri-lock-line"></i>
        <h3>修改密码</h3>
        <p>更改管理密码</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 0.375rem;
}

.page-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0 0 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.dash-card {
  background: #fff;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-decoration: none;
  border: 1px solid #e5e7eb;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: #6366f1;
    box-shadow: 0 2px 12px rgba(99,102,241,0.1);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.75rem;
    color: #6366f1;
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
  }

  p {
    font-size: 0.8125rem;
    color: #888;
    margin: 0;
  }
}
</style>
