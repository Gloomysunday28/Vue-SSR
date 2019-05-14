const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.conf')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = merge(base, {
  entry: './src/entry-server.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/ // css还是由webpack来打包
  }),
  target: 'node',
  plugins: [
    new VueSSRServerPlugin() // 用来告诉服务端资源预加载以及首屏所需要的chunk
  ]
})