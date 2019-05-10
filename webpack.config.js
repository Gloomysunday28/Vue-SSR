const path = require('path')
const nodeExternals = require('webpack-node-externals');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (env, arg) => {
  const webpackConfig = {
    mode: env,
    // devtool: 'cheap-module-source-map',
    entry: arg.target === 'node' ? `./src/vue-server-enter-router.js` : `./src/index.js`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: arg.filename,
      sourceMapFilename: '[name].[hash:8].map',
      chunkFilename: './chunk/[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: ['*', '.vue', '.js'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            extractCSS: true
          }
        },
        {
          // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        },
        {
          // CSS 代码不能被打包进用于服务端的代码中去，忽略掉 CSS 文件
          test: /\.JPG$/,
          use: [{
            loader: 'file-loader',
          }],
        },
      ]
    },
    performance: false,
    plugins: [
      new VueLoaderPlugin()
    ]
  }

  if (arg.target === 'node') {
    webpackConfig.externals = [nodeExternals()] // 服务端不打包第三方依赖
    webpackConfig.target = 'node' // 不打包node原生方法
    webpackConfig.output.libraryTarget = 'commonjs2' // node环境执行使用commonJs规范
    webpackConfig.output.libraryExport = 'default' // node环境执行使用commonJs规范
  }

  return webpackConfig
}