import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  mode: 'hash',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      redirect: '/auth',
      children: [
        {
          path: '/home', // Home page
          component: () => import('@/views/Home.vue')
        }
      ],
    },
    // 2. login
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/views/Auth.vue')
    }
  ]
})

export default router