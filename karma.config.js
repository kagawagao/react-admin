import config from './config'
import webpackConfig from './webpack.config.babel'
import _debug from 'debug'

const debug = _debug('app:karma')

debug('Creating configuration.')

const karmaConfig = {
  basePath: './',
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    './node_modules/sinon/pkg/sinon.js',
    {
      pattern: `./${config.dir_test}/unit/index.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  proxies: {},
  singleRun: config.coverage_enabled,
  frameworks: ['mocha', 'es6-shim'],
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters
  },
  browsers: ['PhantomJS'],
  preprocessors: {
    [`${config.dir_test}/unit/index.js`]: ['webpack', 'sourcemap']
  },
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      rules: webpackConfig.module.rules
    },
    externals: Object.assign({}, webpackConfig.externals, {
      'react/addons': {},
      'react/lib/ExecutionEnvironment': {},
      'react/lib/ReactContext': 'window'
    }),
    node: webpackConfig.node
  },
  webpackMiddleware: {
    noInfo: true,
    stats: config.compiler_stats
  }
}

export default (cfg) => cfg.set(karmaConfig)
