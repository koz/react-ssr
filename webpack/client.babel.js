/* eslint import/no-extraneous-dependencies: 0 */
import webpack from 'webpack'
import { join } from 'path'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import AssetsPlugin from 'assets-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const root = process.cwd()
const build = join(root, 'build')
const src = join(root, '/client')
const publicPath = '/'
const outputPath = build

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'react-redux',
  'redux',
]

module.exports = {
  devtool: 'source-map',

  entry: {
    app: [join(src, '/index.js')],
    vendor,
  },

  output: {
    path: outputPath,
    publicPath,
    filename: '[name]_[chunkhash].js',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 50000 }),
    new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false }, comments: /(?:)/ }),
    new webpack.NoEmitOnErrorsPlugin(),
    new AssetsPlugin({ path: outputPath, filename: 'assets.json' }),
    new CopyWebpackPlugin([
      { from: join(root, 'package.json') },
    ]),
  ],
}
