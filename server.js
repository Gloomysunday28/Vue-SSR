const express = require('express')
const serveBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync('./src/index.html', 'utf-8')

const renderer = createBundleRenderer(serveBundle, {
  template,
  clientManifest
})

const app = express()

app.use(express.static('./dist'))

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