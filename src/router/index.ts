import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ActividadesView from '@/views/ActividadesView.vue'
import PlanesView from '@/views/PlanesView.vue'
import Login from '@/views/LoginView.vue'
import Register from '@/views/RegistroView.vue'
import ChatAI from '@/views/AIView.vue'
import Booking from '@/views/BookingView.vue'
import { useJWTStore } from '@/stores/JwtStore'
import { useUserStore } from '@/stores/UserStore'

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
    }


  ],
})

router.beforeEach((to, from, next) => {
  const jwtStore = useJWTStore()
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && (!jwtStore.jwt || !userStore.user )) {
    next('/login')
    alert("NO ESTÁ AUTORIZADO PARA ESTA VISTA")
  }
  else {
    next()
  }
})

export default router