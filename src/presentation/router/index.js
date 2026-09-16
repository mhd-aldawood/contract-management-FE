import { createRouter, createWebHistory } from 'vue-router'
import container from '@/di/container'

const routes = [
  { path: '/', redirect: '/signup' },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/presentation/views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/presentation/views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/presentation/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home/profile',
    name: 'profile',
    component: () => import('@/presentation/views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home/settings',
    name: 'settings',
    component: () => import('@/presentation/views/SettingsView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/home/about',
    name: 'about',
    component: () => import('@/presentation/views/AboutView.vue'),
    meta: { requiresAuth: true }
  },
  {
     path: '/home/planning', 
     name: 'agreements', 
     component: () => import('@/presentation/views/AgreementsView.vue'),  
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = container.authRepository.getCurrentUser()
  if (to.meta.requiresAuth && !user) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router