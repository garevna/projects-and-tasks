import { createRouter, createWebHistory } from 'vue-router'
import ProjectTable from '../views/ProjectTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'projects',
      component: ProjectTable,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/TaskTable.vue'),
    },
  ],
})

export default router
