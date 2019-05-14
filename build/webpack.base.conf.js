const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(jpg|JPG)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}