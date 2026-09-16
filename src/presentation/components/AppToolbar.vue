<template>
  <nav class="toolbar">
    <div class="brand" @click="goHome">🏠 MyApp</div>
    <ul class="nav-items">
      <li
        v-for="item in items"
        :key="item.name"
        :class="{ active: $route.name === item.name }"
        @click="navigate(item)"
      >
        <span class="icon">{{ item.icon }}</span>
        {{ item.label }}
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
  { name: 'profile', label: 'Profile', icon: '👤', path: '/home/profile' },
  { name: 'settings', label: 'Settings', icon: '⚙️', path: '/home/settings' },
  { name: 'about', label: 'About', icon: 'ℹ️', path: '/home/about' },
  { name: 'planning', label: 'Planning', icon: '📋', path: '/home/planning' },
]

function navigate(item) {
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
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
.nav-items li {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.nav-items li:hover { background: #4a5568; }
.nav-items li.active { background: #667eea; }
.icon { font-size: 1rem; }
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