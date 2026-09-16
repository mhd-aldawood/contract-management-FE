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
    {
  path: '/home/contracts/nafath-centers',
  name: 'nafath-centers',
  component: () => import('@/presentation/views/contracts/NafathCentersView.vue'),
  meta: { requiresAuth: true },
},
{
  path: '/home/contracts/memorandum',
  name: 'memorandum',
  component: () => import('@/presentation/views/contracts/MemorandumView.vue'),
  meta: { requiresAuth: true },
},
{
  path: '/home/contracts/lifelong-learning',
  name: 'lifelong-learning',
  component: () => import('@/presentation/views/contracts/LifelongLearningView.vue'),
  meta: { requiresAuth: true },
},
{
  path: '/home/contracts/other',
  name: 'other-agreements',
  component: () => import('@/presentation/views/contracts/OtherAgreementsView.vue'),
  meta: { requiresAuth: true },
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