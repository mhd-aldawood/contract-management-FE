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
  },
  {
     path: '/home/planning', 
     name: 'agreements', 
     component: () => import('@/presentation/views/AgreementsView.vue'),  
    },
     {
    path: '/home/contracts/educational-content',
    name: 'اتفاقية-محتوى-تعليمي',
    component:  () => import('@/presentation/views/contracts/EducationalContentAgreementView.vue'),
  },
  {
    path: '/home/contracts/nafath-center',
    name: 'اتفاقية-مركز-نفاذ',
    component:  () => import('@/presentation/views/contracts/NafathCenterAgreementView.vue'),
  },
  {
    path: '/home/contracts/other',
    name: 'اتفاقية-أخرى',
    component: () => import('@/presentation/views/contracts/OtherAgreementView.vue'),
  },
  {
    path: '/home/contracts/lifelong-learning',
    name: 'اتفاقية-مركز-التعلم-مدى-الحياة',
    component: () => import('@/presentation/views/contracts/LifelongLearningAgreementView.vue'),
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