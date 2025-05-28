import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import PlanesView from '@/views/PlanesView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegistroView.vue'
import ChatIA from '@/components/ChatIA.vue'
import Booking from '@/views/BookingView.vue'
import DetallesPlanView from '@/views/DetallesPlanView.vue'

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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Register
    },
    {
      path: '/chat',
      name: 'ChatIA',
      component: ChatIA
    },
    {
      path: '/booking',
      name: 'Booking',
      component: Booking 
    },
    {
      path: '/planes/:id',
      name: 'DetallesPlan',
      component: () => import('@/views/DetallesPlanView.vue')
    }
    
    

    
  ],
})

export default router