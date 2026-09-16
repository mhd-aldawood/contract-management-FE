// src/presentation/config/navigation.js
export const NAV_ITEMS = [
  {
    name: 'profile',
    label: 'الحساب',
    icon: '👤',
    path: '/home/profile',
  },
  {
    name: 'settings',
    label: 'الاعدادات',
    icon: '⚙️',
    path: '/home/settings',
  },
  {
    name: 'about',
    label: 'حول',
    icon: 'ℹ️',
    path: '/home/about',
  },
  {
    name: 'planning',
    label: 'التخطيط',
    icon: '📋',
    path: '/home/planning',
  },
  {
    name: 'contracts',
    label: 'العقود',
    icon: '📑',
    children: [
      {
        name: 'nafath-centers',
        label: 'مراكز النفاذ',
        icon: '🏢',
        path: '/home/contracts/nafath-centers',
      },
      {
        name: 'memorandum',
        label: 'اتفاقية مذكرة تفاهم',
        icon: '📝',
        path: '/home/contracts/memorandum',
      },
      {
        name: 'lifelong-learning',
        label: 'اتفاقية مركز التعلم مدى الحياة',
        icon: '🎓',
        path: '/home/contracts/lifelong-learning',
      },
      {
        name: 'other-agreements',
        label: 'اتفاقيات أخرى',
        icon: '📄',
        path: '/home/contracts/other',
      },
    ],
  },
]