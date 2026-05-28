<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <span class="sidebar-logo">Winter</span>
        <span class="sidebar-subtitle">管理后台</span>
      </div>
      <nav class="sidebar-nav">
        <NuxtLink to="/admin" class="nav-item" active-class="active" :exact="true">
          <i class="ri-dashboard-line"></i>
          <span>仪表盘</span>
        </NuxtLink>
        <div class="nav-group">
          <div class="nav-group-label">配置管理</div>
          <NuxtLink to="/admin/settings/site" class="nav-item" active-class="active">
            <i class="ri-global-line"></i>
            <span>站点信息</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings/hero" class="nav-item" active-class="active">
            <i class="ri-home-smile-line"></i>
            <span>首页首屏</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings/projects" class="nav-item" active-class="active">
            <i class="ri-folder-line"></i>
            <span>项目列表</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings/sites" class="nav-item" active-class="active">
            <i class="ri-links-line"></i>
            <span>网站收藏</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings/timeline" class="nav-item" active-class="active">
            <i class="ri-time-line"></i>
            <span>时间线</span>
          </NuxtLink>
          <NuxtLink to="/admin/settings/footer" class="nav-item" active-class="active">
            <i class="ri-layout-bottom-line"></i>
            <span>页脚</span>
          </NuxtLink>
        </div>
        <div class="nav-group">
          <div class="nav-group-label">系统</div>
          <NuxtLink to="/admin/settings/password" class="nav-item" active-class="active">
            <i class="ri-lock-line"></i>
            <span>修改密码</span>
          </NuxtLink>
        </div>
      </nav>
      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <i class="ri-logout-box-line"></i>
          <span>退出登录</span>
        </button>
      </div>
    </aside>
    <main class="admin-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAdminAuth()
const handleLogout = () => logout()
</script>

<style lang="scss">
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.admin-sidebar {
  width: 260px;
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
}

.sidebar-header {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}

.sidebar-subtitle {
  display: block;
  font-size: 0.75rem;
  color: #888;
  margin-top: 0.25rem;
}

.sidebar-nav {
  flex: 1;
  padding: 0.75rem 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1.25rem;
  color: #bbb;
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.15s;

  &:hover {
    color: #fff;
    background: rgba(255,255,255,0.05);
  }

  &.active {
    color: #fff;
    background: rgba(99, 102, 241, 0.2);
    border-right: 3px solid #6366f1;
  }

  i {
    font-size: 1.125rem;
    width: 1.25rem;
    text-align: center;
  }
}

.nav-group {
  margin-top: 0.5rem;
}

.nav-group-label {
  padding: 0.5rem 1.25rem 0.375rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
}

.sidebar-footer {
  padding: 1rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.08);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.15s;

  &:hover {
    color: #e0e0e0;
    background: rgba(255,255,255,0.05);
  }
}

.admin-main {
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
  max-width: calc(100vw - 260px);
}

@media (max-width: 768px) {
  .admin-sidebar {
    width: 220px;
  }
  .admin-main {
    margin-left: 220px;
    padding: 1.25rem;
  }
}
</style>
