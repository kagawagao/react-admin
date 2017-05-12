var variables = require('./theme/default')
var mixins = require('./mixins')

module.exports = {
  plugins: [
    require('stylelint')(),
    require('postcss-at-rules-variables')(),
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-for')(),
    require('postcss-cssnext')({
      browsers: 'last 4 versions',
      features: {
        customProperties: {
          variables: variables
        },
        applyRule: {
          sets: mixins
        }
      }
    }),
    require('cssnano')({
      autoprefixer: false,
      sourcemap: true
    }),
    require('postcss-reporter')()
  ]
}
