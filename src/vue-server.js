import Vue from 'vue'
import App from './App.vue'
import router from './router'

export default function createApp() {
  const apps = new Vue({
    router,
    render: h => h(App)
  }).$mount('#root')
  return { app: apps, router }
}