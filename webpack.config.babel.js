import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import _debug from 'debug'
import config, { paths, globals } from './config'

const { __DEV__, __TEST__, __PROD__ } = globals

const debug = _debug('app:webpack')

debug('Create configuration.')
const appEntry = __DEV__ ? [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client',
  paths.src('index.jsx')
] : [paths.src('index.jsx')]
const webpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  target: 'web',
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.js', '.jsx', '.less', '.css', '.json'],
    alias: {}
  },
  entry: {
    app: appEntry,
    vendor: config.compiler_vendor
  },
  output: {
    path: paths.dist(),
    publicPath: config.compiler_public_path,
    filename: `[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `[id].[${config.compiler_hash_type}].js`
  },
  devtool: config.compiler_devtool,
  devServer: {
    host: config.server_host,
    port: config.server_port,
    compress: true,
    hot: true,
    noInfo: config.compiler_quiet,
    stats: config.compiler_stats,
    historyApiFallback: true
  },
  node: {
    fs: 'empty',
    net: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: __DEV__,
          formatter: require('eslint-friendly-formatter')
        },
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        use: __DEV__ ? [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              'sourceMap': true,
              'importLoaders': 1
            }
          },
          'postcss-loader'
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: __DEV__ ? [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              'sourceMap': true,
              'importLoaders': 1
            }
          },
          'postcss-loader',
          'less-loader'
        ] : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?|eot|ttf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src('index.ejs'),
      title: `${config.pkg.name} - ${config.pkg.description}`,
      hash: false,
      inject: true,
      minify: {
        collapseWhitespace: config.compiler_html_minify,
        minifyJS: config.compiler_html_minify
      }
    }),
    new CopyWebpackPlugin([{
      from: paths.src('static')
    }], {
      ignore: ['README.md']
    })
  ]
}

if (__PROD__) {
  debug('Enable plugins for production (Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: {
        context: __dirname
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      sourceMap: true
    })
  )
} else {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: __dirname
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new FaviconsWebpackPlugin({
      logo: paths.src('static/favicon.png'),
      prefix: __DEV__ ? 'icons/' : 'icons-[hash:7]/',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: false
      }
    })
  )
}

if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.')
  webpackConfig.plugins.push(
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    })
  )
}

export default webpackConfig
