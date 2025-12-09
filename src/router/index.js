import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        {
          path: '', // Home page
          component: () => import('@/views/Home.vue')
        }
      ]
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