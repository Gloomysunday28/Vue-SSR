import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false // 取消production提示

export default function createApp() {
  const router = createRouter()

  const app = new Vue({
    router,
    render: h => h(App)
  })
  
  return {app, router}
}