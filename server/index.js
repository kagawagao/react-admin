import Koa from 'koa'
import convert from 'koa-convert'
import serve from 'koa-static'
// import bodyParser from 'koa-bodyparser'
import webpack from 'webpack'
import historyApiFallback from 'koa-connect-history-api-fallback'
import webpackConfig from '../webpack.config.babel.js'
import config, { paths } from '../config'
import _debug from 'debug'
import webpackMiddleware from './middleware/webpack'

const debug = _debug('app:server')

debug('Start server')

const app = new Koa()

// history api fallback
app.use(convert(historyApiFallback({
  verbose: false
})))

// X-Response-Time
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// apply middleware

if (config.env === 'development') {
  const compiler = webpack(webpackConfig)
  // app.use(bodyParser())
  webpackMiddleware(app, compiler, config)
  app.use(serve(paths.src('static')))
  app.use(serve(paths.dist('icons')))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(serve(paths.base(config.dir_dist)))
}

const { server_host: host, server_port: port } = config

app.listen(port, host, () => {
  debug('Server is now running at ' + host + ':' + port + '.')
})
