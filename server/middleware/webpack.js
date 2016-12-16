// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'
import _debug from 'debug'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

const debug = _debug('app:server')

const devMiddleware = (compiler, opts) => {
  const middleware = webpackDevMiddleware(compiler, opts)
  return async (ctx, next) => {
    const req = ctx.request
    const res = {}
    res.end = content => {
      ctx.body = content
    }
    res.setHeader = (name, value) => {
      ctx.set(name, value)
    }
    await middleware(req, res, next)
  }
}

const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHotMiddleware(compiler, opts)
  return async (ctx, next) => {
    const req = ctx.req
    const res = {}
    res.writeHead = (status, headers) => {
      ctx.status = status
      ctx.set(headers)
    }
    let stream = new PassThrough()
    res.write = data => {
      stream.write(data)
      ctx.body = stream
    }
    await middleware(req, res, next)
  }
}

export default (app, compiler, config) => {
  debug('Apply webpack-dev-middleware')
  app.use(devMiddleware(compiler, {
    noInfo: config.compiler_quiet,
    quiet: config.compiler_quiet,
    publicPath: config.compiler_public_path,
    stats: config.compiler_stats
  }))
  debug('Apply webpack-hot-middleware')
  app.use(hotMiddleware(compiler, {
    log: debug
  }))
}
