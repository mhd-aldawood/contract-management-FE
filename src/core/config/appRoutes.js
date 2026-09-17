// src/core/config/appRoutes.js

export const ROUTE_NAMES = {
  home: 'home',
  about: 'about',
  login: 'login',
  signup: 'signup',
  profile: 'profile',
  settings: 'settings',
  agreements: 'agreements',
  planning:'planning',
  contracts: {
    educationalContent: 'educational-content',
    lifelongLearning: 'lifelong-learning',
    memorandum: 'memorandum',
    nafathCenters: 'nafath-centers',
    otherAgreements: 'other-agreements',
  },
}

export const ROUTE_PATHS = {
  home: '/home',
  about: '/about',
  login: '/login',
  signup: '/signup',
  profile: '/profile',
  settings: '/settings',
  agreements: '/agreements',
  planning:'/home/planning',
  contracts: {
    educationalContent: '/home/contracts/educational-content',
    lifelongLearning: '/home/contracts/lifelong-learning',
    memorandum: '/home/contracts/memorandum',
    nafathCenters: '/home/contracts/nafath-centers',
    otherAgreements: '/home/contracts/other-agreements',
  },
}