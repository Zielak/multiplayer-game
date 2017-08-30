const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'static')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.ejs'
    })
  ]
}
