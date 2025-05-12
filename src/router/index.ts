import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import PlanesView from '@/views/PlanesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/actividades',
      name: 'Actividades',
      component: ActividadesView
    },
    {
      path: '/planes',
      name: 'Planes',
      component: PlanesView
    },
   
    
  ],
})

export default router