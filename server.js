const Vue = require('vue')
const express = require('express')
const server = express()
const renderer = require('vue-server-renderer').createRenderer()
const createApp = require('./dist/node.js')

server.get('*', (req, res) => {
  const context = { url: req.url }
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      console.log(err)
      if (err) {
        res.status(500).end('Internal Server Error')
        return
      }
      res.end(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
        </head>
        <body>
        <div id="root">${html}</div>
        <!--导入 Webpack 输出的用于浏览器端渲染的 JS 文件-->
        </body>
        </html>
      `)
    })
  }, err => {
    console.log(err)
  })
})

server.use(express.static('.'))

server.listen(8080)