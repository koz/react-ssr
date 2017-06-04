/* eslint import/no-extraneous-dependencies: 0 */

import webpack from 'webpack'
import { join } from 'path'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

const root = process.cwd()
const src = join(root, '/client')
const publicPath = '/static'
const outputPath = '/'

module.exports = {
  devtool: 'eval',

  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?noInfo=false',
      join(src, '/index.js'),
    ],
  },

  output: {
    path: outputPath,
    publicPath,
    filename: 'app.js',
    chunkFilename: '[name]_[chunkhash].js',
  },

  resolve: {
    extensions: ['.js', '.json', '.scss', '.css'],
    alias: {
      components: join(src, '/components'),
      fetcher: join(src, '/fetcher'),
      i18n: join(src, '/i18n'),
      images: join(src, '/images'),
      pages: join(src, '/pages'),
      styles: join(src, '/styles'),
      utils: join(src, '/utils'),
      actions: join(src, '/redux/actions.js'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|ttf|eot|svg|woff2)$/,
        use: ['url-loader?limit=100000'],
      },
      {
        test: /\.jpg$/,
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],

  watch: true,
}
