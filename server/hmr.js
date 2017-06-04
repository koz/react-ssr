import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack/development.babel'

const HMR = (app) => {
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(webpackHotMiddleware(compiler, {
    reload: true,
  }))

  return app
}

export default HMR
