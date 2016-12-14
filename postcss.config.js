module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['node_modules']
    }),
    require('postcss-url')(),
    require('postcss-cssnext')({
      browsers: 'last 2 versions',
      features: {}
    }),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')()
  ]
}
