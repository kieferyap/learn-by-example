import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { abilitiesPlugin } from '@casl/vue'

import './style.css'
import App from './App.vue'

import router from './plugins/router'
import initialAbility from './plugins/casl/initialAbility'

const app = createApp(App)
const store = createPinia()

app.use(router)
app.use(store)

// Register casl and initial ability
app.use(abilitiesPlugin, initialAbility, {
  useGlobalProperties: true
})

app.mount('#app')
