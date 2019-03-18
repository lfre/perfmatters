const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  ProvidePlugin,
  HashedModuleIdsPlugin,
  NamedChunksPlugin,
} = require('webpack');
const { description } = require('./package.json');
require('./loaders/slide-loader');

module.exports = (env = {}, options) => {
  const defaultMode = 'development';
  const mode = options.mode || defaultMode;
  const isDev = mode === defaultMode;
  const template = 'index.html';
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
        {
          test: /index\.html$/,
          use: [
            {
              loader: 'slide-loader',
              options: {
                force: true,
                isDev,
                template,
              },
            },
          ],
        },
      ],
    },
    devServer: {
      contentBase: './static',
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
    resolveLoader: {
      modules: ['node_modules', './loaders'],
    },
    plugins: [
      new HashedModuleIdsPlugin(),
      new NamedChunksPlugin(),
      new ProvidePlugin({
        Reveal: 'reveal/js/reveal',
      }),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        title: description,
        template,
      }),
    ],
    watchOptions: {
      ignored: /slides\/\d\/.*\.html/,
    },
  };
};
