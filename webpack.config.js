const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');
const SlidePlugin = require('./plugins/slide');
const { description } = require('./package.json');

module.exports = (env = {}, options) => {
  const defaultMode = 'development';
  const mode = options.mode || defaultMode;
  const isDev = mode === defaultMode;
  return {
    entry: './index.js',
    mode,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader?cacheDirectory',
          },
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: './dist',
      compress: true,
      port: env.PORT || 3000,
    },
    optimization: {
      runtimeChunk: {
        name: entrypoint => `runtime~${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        name: true,
      },
    },
    resolve: {
      alias: {
        reveal: 'reveal.js',
      },
    },
    plugins: [
      new ProvidePlugin({
        Reveal: 'reveal/js/reveal',
      }),
      new MiniCssExtractPlugin(),
      new SlidePlugin(HtmlWebpackPlugin),
      new HtmlWebpackPlugin({
        title: description,
        template: 'index.html',
      }),
    ],
  };
};
