import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import PlanesView from '@/views/PlanesView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegistroView.vue'
import ChatAI from '@/views/AIView.vue'
import Booking from '@/views/BookingView.vue'
import PlanificadorGastosView from '@/views/PlanificadorGastosView.vue'
import DetallesPlanView from '@/views/DetallesPlanView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import PreguntasFrecuentesView from '@/views/PreguntasFrecuentesView.vue'
import SoporteView from '@/views/SoporteView.vue'
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
      name: 'ChatAI',
      component: ChatAI,
      meta: { requiresAuth: true }
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
    },
    {
      path: '/planificador',
      name: 'Planificador',
      component: PlanificadorGastosView
    },
    {
      path: '/sobre-nosotros',
      name: 'sobreNosotros',
      component: SobreNosotrosView
    },

    {
      path: '/preguntas-frecuentes',
      name: 'preguntasFrecuentes',
      component: PreguntasFrecuentesView
    },
    {
      path: '/soporte',
      name: 'soporte',
      component: SoporteView,
    }






  ],
})

export default router