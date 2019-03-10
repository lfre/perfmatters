
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { description } = require('./package.json');

module.exports = (env = {}, options) => {
  return {
    mode: options.mode || 'development',
    devServer: {
      contentBase: './dist',
      compress: true,
      port: env.PORT || 3000
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: description,
        template: 'index.html'
      })
    ]
  };
}
