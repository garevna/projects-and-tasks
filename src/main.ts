import './assets/main.css'

import { createApp } from 'vue'
// import type { InjectionKey } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// const key = Symbol('api') as InjectionKey<string>

const app = createApp(App)
app.config.globalProperties.$backendAPI = 'http://localhost:3000/'
// app.provide(key, 'http://localhost:3000/')

app.use(createPinia())
app.use(router)

app.mount('#app')
