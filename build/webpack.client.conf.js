const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(base, {
  entry: './src/entry-client.js',
  plugins: [
    new VueSSRClientPlugin() // 用来告诉服务端资源预加载以及首屏所需要的chunk
  ]
})