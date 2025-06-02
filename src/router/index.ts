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
import AdminView from '@/views/AdminViews/AdminView.vue'
import { useJWTStore } from '@/stores/JwtStore'
import { useUserStore } from '@/stores/UserStore'
import AdminUserView from '@/views/AdminViews/AdminUserView.vue'
import AdminCategoryView from '@/views/AdminViews/AdminCategoryView.vue'
import SobreNosotrosView from '@/views/SobreNosotrosView.vue'
import PreguntasFrecuentesView from '@/views/PreguntasFrecuentesView.vue'

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
      component: Login,
      meta: { isLogin: true }
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Register,
      meta: { isLogin: true }
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
      component: DetallesPlanView
    },
    {
      path: '/planificador',
      name: 'Planificador',
      component: PlanificadorGastosView
    },
    {
      path: '/admin',
      name: 'Administracion',
      component: AdminView,
      meta: { isAdmin: true },
      children: [
        {path: 'users', component: AdminUserView},
        {path: 'categorys', component: AdminCategoryView}
      ]
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
    }





  ],
})

router.beforeEach((to, from, next) => {
  const jwtStore = useJWTStore()
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth
  const isLogin = to.meta.isLogin
  const isAdmin = to.meta.isAdmin

  if (requiresAuth && (!jwtStore.jwt || !userStore.user )) {
    next('/login')
    alert("HAY QUE ESTAR REGISTRADO PARA ACCEDER")
  }/*
  else if (isLogin && userStore.user != null)
  {
    next('/')
  }*/
  else if(isAdmin && !userStore.user.rolAdmin)
  {
    next('/')
    alert('NO TIENE PERMISOS PARA ACCEDER AQUI')
  }
  else {
    next()
  }
})


export default router