import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate"
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//icons Vuetify

import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@fortawesome/fontawesome-free/css/all.css';

import App from './App.vue'
import router from './router'

// Mapas
import 'leaflet/dist/leaflet.css'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'


const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(vuetify)
app.use(pinia)
app.use(router)
export default createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
app.mount('#app')
