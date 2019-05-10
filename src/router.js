import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'
import Foo from './Foo.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/home',
  component: () => import('./Home.vue')
}, {
  path: '/foo',
  component: () => import('./Foo.vue')
}]

export default new VueRouter({
  mode: 'history',
  routes
})