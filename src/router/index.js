import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/MainLayout.vue'), // 下一步创建
      children: [
        {
          path: '', // 首页
          component: () => import('@/views/Home.vue') // 下一步创建
        }
      ]
    },
    // 2. 登录页 (独立布局)
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    // 3. 注册页 (独立布局)
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    }
  ]
})

export default router