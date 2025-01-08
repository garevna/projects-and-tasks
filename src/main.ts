import './assets/main.css'

import { createApp } from 'vue'
// import type { InjectionKey } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { resizeDirectiveCallback, tooltipDirective } from './utils'

import { testDBVersion } from './db/initDB'

const app = createApp(App)
app.directive('tooltip', tooltipDirective)

app.directive('columns-resizable', {
  mounted(el) {
    setTimeout(() => resizeDirectiveCallback(el), 200)
  },
})

// const injectionKey = Symbol.for('app-data-access-mode') as InjectionKey<string>

app.config.globalProperties.$backendAPI = 'http://localhost:3000/'
// app.provide(injectionKey, 'local')

testDBVersion()

app.use(createPinia())

app.mount('#app')
