const express = require('express')
const serveBundle = require('./dist/vue-ssr-server-bundle.json')
const LRU = require('lru-cache') // 缓存, 减少服务器压力
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const fs = require('fs')
const microcache = require('route-cache')
const { createBundleRenderer } = require('vue-server-renderer')

const useMicroCache = process.env.MICRO_CACHE !== 'false'
const template = fs.readFileSync('./src/index.html', 'utf-8')

const renderer = createBundleRenderer(serveBundle, {
  template,
  clientManifest,
  cache: new LRU({
    max: 100,
    maxAge: 1000 // 重要提示：条目在 1 秒后过期。
  })
})

const app = express()

app.use(express.static('./dist'))

app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl))

app.get('*', (req, res) => {
  const context = {
    title: 'VueSSR',
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      res.status(500).send('404 | Page Not Found')
    }
    res.send(html)
  })
})

app.set('port', 8080)

app.listen(app.get('port'), () => {
  console.log('Server start at localhost:' + app.get('port'))
})