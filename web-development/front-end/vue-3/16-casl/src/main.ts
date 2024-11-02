import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './plugins/router'

const app = createApp(App)
const store = createPinia()

app.use(router)
app.use(store)

app.mount('#app')
