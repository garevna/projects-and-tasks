import { getCurrentInstance } from 'vue'

export function getBackAPI() {
  const root = getCurrentInstance()
  return root?.appContext.config.globalProperties.$backendAPI
}
