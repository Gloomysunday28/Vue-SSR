import createApp from './index.js'

const {app, router} = createApp()

router.onReady(() => {
  app.$mount('#app')
})