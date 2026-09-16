<template>
  <nav class="toolbar">
    <div class="brand" @click="goHome">🏠 MyApp</div>
    <ul class="nav-items">
      <li
        v-for="item in items"
        :key="item.name"
        :class="{ active: $route.name === item.name, 'has-dropdown': item.children }"
        @click="navigate(item)"
      >
        <span class="icon">{{ item.icon }}</span>
        {{ item.label }}

        <!-- القائمة المنسدلة -->
        <ul v-if="item.children" class="dropdown">
          <li
            v-for="child in item.children"
            :key="child.name"
            @click.stop="navigate(child)"
          >
            <span class="icon">{{ child.icon }}</span>
            {{ child.label }}
          </li>
        </ul>
      </li>
    </ul>
    <button class="logout" @click="handleLogout">Logout</button>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import container from '@/di/container'

const router = useRouter()
const route = useRoute()

const items = [
  { name: 'الحساب', label: 'Profile', icon: '👤', path: '/home/profile' },
  { name: 'الاعدادت', label: 'Settings', icon: '⚙️', path: '/home/settings' },
  { name: 'حول', label: 'About', icon: 'ℹ️', path: '/home/about' },
  { name: 'التخطيط', label: 'Planning', icon: '📋', path: '/home/planning' },
  {
    name: 'العقود',
    label: 'Contracts',
    icon: '📋',
    children: [
      {
        name: 'اتفاقية-محتوى-تعليمي',
        label: 'اتفاقية محتوى تعليمي',
        icon: '📘',
        path: '/home/contracts/educational-content',
      },
      {
        name: 'اتفاقية-مركز-نفاذ',
        label: 'اتفاقية مركز نفاذ',
        icon: '🏢',
        path: '/home/contracts/nafath-center',
      },
      {
        name: 'اتفاقية-أخرى',
        label: 'اتفاقية أخرى',
        icon: '📄',
        path: '/home/contracts/other',
      },
      {
        name: 'اتفاقية-مركز-التعلم-مدى-الحياة',
        label: 'اتفاقية مركز التعلم مدى الحياة',
        icon: '🎓',
        path: '/home/contracts/lifelong-learning',
      },
    ],
  },
]

function navigate(item) {
  if (item.children) return // لا ننتقل عند الضغط على العنصر الأب
  router.push(item.path)
}

function goHome() {
  router.push('/home')
}

async function handleLogout() {
  await container.authRepository.logout()
  router.push('/login')
}
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2d3748;
  color: #fff;
  padding: 0 1.5rem;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.brand {
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
}
.nav-items {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
.nav-items > li {
  position: relative; /* ضروري لعرض القائمة المنسدلة */
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.nav-items > li:hover { background: #4a5568; }
.nav-items > li.active { background: #667eea; }
.icon { font-size: 1rem; }

/* ===== القائمة المنسدلة ===== */
.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: #2d3748;
  list-style: none;
  margin: 0.25rem 0 0;
  padding: 0.5rem 0;
  border-radius: 8px;
  min-width: 240px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 0.2s ease;
  z-index: 1000;
}
.nav-items > li.has-dropdown:hover .dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.dropdown li {
  padding: 0.6rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.15s;
  white-space: nowrap;
}
.dropdown li:hover {
  background: #4a5568;
}

.logout {
  background: #e53e3e;
  border: none;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}
.logout:hover { background: #c53030; }
</style>