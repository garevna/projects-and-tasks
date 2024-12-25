import './assets/main.css'

import { createApp } from 'vue'
// import type { InjectionKey } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { resizeDirectiveCallback } from './utils/resize-directive-callback'
import { tooltipDirective } from './utils/tooltip-directive'

// const key = Symbol('api') as InjectionKey<string>

const app = createApp(App)
app.directive('tooltip', tooltipDirective)

app.directive('columns-resizable', {
  mounted(el) {
    setTimeout(() => resizeDirectiveCallback(el), 200)
  },
})

app.config.globalProperties.$backendAPI = 'http://localhost:3000/'
// app.provide(key, 'http://localhost:3000/')

app.use(createPinia())

app.mount('#app')
