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
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    // 3.register
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    }
  ]
})

export default router