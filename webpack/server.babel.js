/* eslint import/no-extraneous-dependencies: 0 */

import webpack from 'webpack'
import { join } from 'path'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const root = process.cwd()
const build = join(root, 'build')
const src = join(root, '/universal')
const publicPath = '/'
const outputPath = build

module.exports = {
  target: 'node',

  entry: {
    prerender: join(src, 'App.js'),
  },

  output: {
    path: outputPath,
    publicPath,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
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
    new ExtractTextPlugin('styles.css'),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
  ],
}
